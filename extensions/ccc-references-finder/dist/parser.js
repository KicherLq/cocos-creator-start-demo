"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const object_util_1 = __importDefault(require("./object-util"));
class Parser {
    /**
     * 获取节点树
     * @param {string} path 路径
     * @returns {Promise<object>}
     */
    static async getNodeTree(path, uuid) {
        if (!Parser.caches[path]) {
            const file = fs_1.default.readFileSync(path, 'utf-8');
            let data = null;
            try {
                data = JSON.parse(file);
            }
            catch (error) {
                console.warn('文件解析失败', path);
                console.warn(error);
            }
            if (!data) {
                return null;
            }
            Parser.caches[path] = Parser.convert(data);
            Parser.caches[path].uuid = uuid;
        }
        return Parser.caches[path];
    }
    /**
     * 更新缓存
     * @param {string} path 路径
     */
    static async updateCache(path, uuid) {
        Parser.caches[path] = null;
        await Parser.getNodeTree(path, uuid);
    }
    /**
     * 将资源解析为节点树
     * @param {object} source 源数据
     * @returns {object}
     */
    static convert(source) {
        const tree = Object.create(null);
        const type = source[0]['__type__'];
        if (type === 'cc.SceneAsset') {
            // 场景资源
            const sceneId = source[0]['scene']['__id__'];
            const children = source[sceneId]['_children'];
            tree.type = 'cc.Scene'; // 类型
            tree.id = sceneId; // ID
            // 场景下可以有多个一级节点
            tree.children = [];
            for (let i = 0, l = children.length; i < l; i++) {
                const nodeId = children[i]['__id__'];
                Parser.convertNode(source, nodeId, tree);
            }
        }
        else if (type === 'cc.Prefab') {
            // 预制体资源 
            const uuid = (source[source.length - 1]['asset']) ? source[source.length - 1]['asset']['__uuid__'] : '';
            tree.type = 'cc.Prefab'; // 类型
            tree.uuid = uuid; // uuid
            // 预制体本身就是一个节点
            tree.children = [];
            const nodeId = source[0]['data']['__id__'];
            Parser.convertNode(source, nodeId, tree);
        }
        return tree;
    }
    /**
     * 解析节点
     * @param {object} source 源数据
     * @param {number} nodeId 节点 ID
     * @param {object} parent 父节点
     */
    static convertNode(source, nodeId, parent) {
        const srcNode = source[nodeId];
        const node = Object.create(null);
        // 预制体引用
        const srcPrefab = srcNode['_prefab'];
        if (srcPrefab) {
            const id = srcPrefab['__id__'];
            node.prefab = object_util_1.default.extractValidInfo(source[id]);
            const instance = source[id]['instance'];
            if (instance) {
                const id = instance['__id__'];
                const prefabInfo = source[id];
                if (prefabInfo) {
                    const propertyOverrides = prefabInfo['propertyOverrides'];
                    if (propertyOverrides && propertyOverrides.length > 0) {
                        for (let index = 0; index < propertyOverrides.length; index++) {
                            const propertyOverride = propertyOverrides[index];
                            if (propertyOverride) {
                                const id = propertyOverride['__id__'];
                                const propertyOverrideInfo = source[id];
                                if (propertyOverrideInfo) {
                                    const propertyPath = propertyOverrideInfo['propertyPath'][0];
                                    if (propertyPath) {
                                        srcNode[propertyPath] = propertyOverrideInfo['value'];
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        // 基本信息
        node.name = srcNode['_name'];
        node.id = nodeId;
        node.type = srcNode['__type__'];
        // 路径
        const parentPath = parent.path || null;
        node.path = parentPath ? `${parentPath}/${node.name}` : node.name;
        // 组件
        node.components = [];
        const srcComponents = srcNode['_components'];
        if (srcComponents && srcComponents.length > 0) {
            for (let i = 0, l = srcComponents.length; i < l; i++) {
                const compId = srcComponents[i]['__id__'];
                const component = object_util_1.default.extractValidInfo(source[compId]);
                node.components.push(component);
            }
        }
        // 子节点
        node.children = [];
        const srcChildren = srcNode['_children'];
        if (srcChildren && srcChildren.length > 0) {
            for (let i = 0, l = srcChildren.length; i < l; i++) {
                const nodeId = srcChildren[i]['__id__'];
                Parser.convertNode(source, nodeId, node);
            }
        }
        // 保存到父节点
        parent.children.push(node);
    }
}
exports.default = Parser;
/**
 * 节点树缓存
 * @type {{ [key: string]: object }}
 */
Parser.caches = {};
