"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unload = exports.load = exports.methods = void 0;
function setSkin(style) {
    const options = {
        name: 'skin',
        method: 'updateSkinType',
        args: [style]
    };
    Editor.Message.send('scene', 'execute-scene-script', options);
}
/**
 * @en Registration method for the main process of Extension
 * @zh 为扩展的主进程的注册方法
 */
exports.methods = {
    async updateSkin(type, assetUUID, skinUUID) {
        if (assetUUID == skinUUID) {
            return;
        }
        const options = {
            name: 'skin',
            method: 'updateSkinInScene',
            args: [type, assetUUID, skinUUID]
        };
        await Editor.Message.request('scene', 'execute-scene-script', options);
    },
    async openStyleMJ() {
        setSkin("mj");
    },
    async openStyleJD() {
        setSkin("jd");
    },
    async openStyleScore() {
        setSkin("jf");
    },
    async openStyleQuery() {
        setSkin("");
    },
    async openFunctionsCommon() {
        Editor.Panel.open(`skin.common`);
    }
};
/**
 * @en Hooks triggered after extension loading is complete
 * @zh 扩展加载完成后触发的钩子
 */
const load = function () { };
exports.load = load;
/**
 * @en Hooks triggered after extension uninstallation is complete
 * @zh 扩展卸载完成后触发的钩子
 */
const unload = function () { };
exports.unload = unload;
