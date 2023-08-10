"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unload = exports.load = exports.methods = void 0;
const assets_menu_1 = require("./assets-menu");
const editor_api_1 = __importDefault(require("./editor-api"));
const finder_1 = __importDefault(require("./finder"));
const parser_1 = __importDefault(require("./parser"));
const printer_1 = __importStar(require("./printer"));
const replaceuuid_1 = __importDefault(require("./replaceuuid"));
/**
 * @en Registration method for the main process of Extension
 * @zh 为扩展的主进程的注册方法
 */
exports.methods = {
    async find_references(uuid) {
        if (!uuid || uuid == '') {
            uuid = Editor.Selection.getLastSelected('asset');
        }
        if (uuid) {
            let assetInfo = await editor_api_1.default.assetInfoByUUID(uuid);
            if (!assetInfo.isDirectory && (0, assets_menu_1.isAssetFile)(assetInfo.type)) {
                printer_1.default.print('log', `🔍 ${(0, printer_1.translate)('find-asset-refs')} {asset(${assetInfo.url})}`);
                let refs = await finder_1.default.findByUUID(uuid);
                if (refs) {
                    printer_1.default.printResult({
                        type: assetInfo.type,
                        uuid: uuid,
                        refs: refs,
                    });
                }
            }
        }
    },
    async find_references_in_node() {
        let uuid = Editor.Selection.getLastSelected('node');
        console.log(uuid);
    },
    async assetdb_assetchange(uuid) {
        const { type, url, file } = await editor_api_1.default.assetInfoByUUID(uuid);
        if (type == 'cc.SceneAsset' || type == 'cc.Prefab') {
            if (url.indexOf('db://internal') !== -1) {
                return;
            }
            await parser_1.default.updateCache(file, uuid);
        }
    },
    async replaceuuids(path) {
        console.log("replaceuuids", path);
        await replaceuuid_1.default.replaceDir(path);
    }
};
/**
 * @en Hooks triggered after extension loading is complete
 * @zh 扩展加载完成后触发的钩子
 */
function load() {
    console.log('ccc references finder loaded!');
}
exports.load = load;
/**
 * @en Hooks triggered after extension uninstallation is complete
 * @zh 扩展卸载完成后触发的钩子
 */
function unload() {
    console.log('ccc references finder unload!');
}
exports.unload = unload;
