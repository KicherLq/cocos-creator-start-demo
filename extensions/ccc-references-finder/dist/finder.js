"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_1 = __importDefault(require("fs"));
const editor_api_1 = __importDefault(require("./editor-api"));
const parser_1 = __importDefault(require("./parser"));
const object_util_1 = __importDefault(require("./object-util"));
const file_util_1 = __importDefault(require("./file-util"));
/** 扩展名对应文件类型 */
const ASSET_TYPE_MAP = {
    // 场景
    '.scene': 'scene',
    // 预制体
    '.prefab': 'prefab',
    // 动画
    '.anim': 'animation',
    // 材质
    '.mtl': 'material',
    // 字体
    '.fnt.meta': 'font',
};
/**
 * 查找器
 */
class Finder {
    /**
     * 使用 uuid 进行查找
     * @param {string} uuid
     */
    static async findByUUID(uuid) {
        // 是否为有效 uuid
        if (!Editor.Utils.UUID.isUUID(uuid)) {
            return [];
        }
        // 获取资源信息
        let assetInfo = await editor_api_1.default.assetInfoByUUID(uuid);
        if (assetInfo) {
            // 资源类型检查
            if (assetInfo.type === 'cc.ImageAsset') {
                // 纹理子资源
                uuid = assetInfo.redirect ? assetInfo.redirect.uuid : '';
            }
            else if (assetInfo.type === 'cc.Script') {
                // 脚本资源
                uuid = editor_api_1.default.compressUuid(uuid);
            }
            // 查找资源引用
            let results = [];
            let selfResults = await Finder.findRefs(uuid);
            for (let i = 0, l = selfResults.length; i < l; i++) {
                results.push(selfResults[i]);
            }
            return results;
        }
        else {
            // 不存在的资源，直接查找 uuid
            return (await Finder.findRefs(uuid));
        }
    }
    /**
     * 查找引用
     * @param {string} uuid
     * @returns {Promise<{ type: string, url: string, refs?: object[]}[]>}
     */
    static async findRefs(uuid) {
        let result = [];
        // 文件处理函数
        let handler = async (path, stats) => {
            let ext = (0, path_1.extname)(path);
            if (ext === '.scene' || ext === '.prefab') {
                // 场景和预制体资源（转为节点树）
                let tree = await parser_1.default.getNodeTree(path, uuid);
                if (!tree) {
                    return;
                }
                // 遍历第一层节点查找引用
                let refs = [];
                for (let children = tree.children, i = 0, l = children.length; i < l; i++) {
                    await Finder.findRefsInNode(tree, children[i], uuid, refs);
                }
                // 保存当前文件引用结果
                if (refs.length > 0) {
                    result.push({
                        type: ASSET_TYPE_MAP[ext],
                        url: await editor_api_1.default.fspathToUrl(path),
                        refs: refs,
                    });
                }
            }
            else if (ext === '.anim') {
                // 动画资源
                let data = JSON.parse(await fs_1.default.readFileSync(path, 'utf-8'));
                // let curveData = data['curveData'];
                let contains = object_util_1.default.containsValue(data, uuid);
                if (contains) {
                    result.push({
                        type: ASSET_TYPE_MAP[ext],
                        url: await editor_api_1.default.fspathToUrl(path),
                        refs: [],
                    });
                }
            }
            else if (ext === '.mtl' || ext === '.fnt.meta') {
                // 材质和字体资源
                let data = JSON.parse(fs_1.default.readFileSync(path, 'utf-8'));
                // 需排除自己
                if ((data['uuid'] === uuid)) {
                    return;
                }
                // 是否引用
                let contains = object_util_1.default.containsValue(data, uuid);
                if (contains) {
                    const _ext = (ext === '.mtl') ? '.mtl' : '.fnt.meta';
                    result.push({
                        type: ASSET_TYPE_MAP[_ext],
                        url: await editor_api_1.default.fspathToUrl(path),
                        refs: [],
                    });
                }
            }
        };
        // 遍历asset资源目录下的文件
        const assetsPath = await editor_api_1.default.urlToFspath('db://assets');
        await file_util_1.default.map(assetsPath, handler);
        // 遍历asset-plugins资源目录下的文件
        const assetsPluginPath = await editor_api_1.default.urlToFspath('db://asset-plugins');
        await file_util_1.default.map(assetsPluginPath, handler);
        return result;
    }
    /**
     * 查找节点中的引用
     * @param {object} tree 节点树
     * @param {object} node 目标节点
     * @param {string} uuid 查找的 uuid
     * @param {object[]} result 结果
     */
    static async findRefsInNode(tree, node, uuid, result) {
        // 检查节点上的组件是否有引用
        let components = node.components;
        if (components && components.length > 0) {
            for (let i = 0, l = components.length; i < l; i++) {
                let properties = Finder.getContainsUuidProperties(components[i], uuid);
                if (properties.length === 0) {
                    continue;
                }
                // 资源类型
                let type = components[i]['__type__'];
                // 是否为脚本资源
                if (editor_api_1.default.isUUID(type)) {
                    let scriptUuid = editor_api_1.default.decompressUUID(type);
                    let assetInfo = await editor_api_1.default.assetInfoByUUID(scriptUuid);
                    type = (0, path_1.basename)(assetInfo.url);
                }
                // 遍历相关属性名
                for (let i = 0; i < properties.length; i++) {
                    let property = properties[i];
                    if (property === '__type__') {
                        property = '';
                    }
                    else {
                        // 处理属性名称（Label 组件需要特殊处理）
                        if (type === 'cc.Label' && property === '_N$file') {
                            property = 'font';
                        }
                        // 去除属性名的前缀
                        if (property.startsWith('_N$')) {
                            property = property.replace('_N$', '');
                        }
                        else if (property[0] === '_') {
                            property = property.substring(1);
                        }
                    }
                    // 保存结果
                    result.push({
                        node: node.path,
                        component: type,
                        property: property
                    });
                }
            }
        }
        // 检查预制体是否有引用
        let prefab = node.prefab;
        if (prefab) {
            // 排除预制体自己
            if (uuid !== tree.uuid) {
                let contains = object_util_1.default.containsValue(prefab, uuid);
                if (contains) {
                    result.push({
                        node: node.path,
                    });
                }
            }
        }
        // 遍历子节点
        let children = node.children;
        if (children && children.length > 0) {
            for (let i = 0, l = children.length; i < l; i++) {
                await Finder.findRefsInNode(tree, children[i], uuid, result);
            }
        }
    }
    /**
     * 获取对象包含指定 uuid 的属性
     * @param {object} object 对象
     * @param {string} uuid 值
     * @returns {string[]}
     */
    static getContainsUuidProperties(object, uuid) {
        let properties = [];
        let search = (target, path) => {
            if (Object.prototype.toString.call(target) === '[object Object]') {
                for (let key in target) {
                    let curPath = (path != '') ? `${path}.${key}` : key;
                    if (target[key] === uuid) {
                        properties.push(path || key);
                    }
                    search(target[key], curPath);
                }
            }
            else if (Array.isArray(target)) {
                for (let i = 0, l = target.length; i < l; i++) {
                    let curPath = (path != '') ? `${path}[${i}]` : `[${i}]`;
                    if (target[i] === uuid) {
                        properties.push(path || `[${i}]`);
                    }
                    search(target[i], curPath);
                }
            }
        };
        search(object, '');
        return properties;
    }
}
exports.default = Finder;
;
