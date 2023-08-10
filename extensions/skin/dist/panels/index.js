"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ready = exports.close = exports.beforeClose = exports.listeners = exports.methods = exports.$ = exports.style = exports.template = void 0;
const editor_api_1 = __importDefault(require("../editor-api"));
const utils_1 = require("../utils");
const os = require('os');
const fs = require('fs');
const path = require('path');
// html 文本
exports.template = fs.readFileSync(path.join(utils_1.EXTENSION_PATH, 'static', "template", 'index.html'), { encoding: 'utf-8' });
// 样式文本
exports.style = fs.readFileSync(path.join(utils_1.EXTENSION_PATH, 'static', "style", 'base-style.css'), { encoding: 'utf-8' }) +
    fs.readFileSync(path.join(utils_1.EXTENSION_PATH, 'static', "style", 'default', 'index.css'), { encoding: 'utf-8' });
// 渲染后 html 选择器
exports.$ = {
    panel: `#generate-panel`,
    panelMain: `#setting-panel`,
    checkSkinMJ: '#checkSkinMJ',
    checkSkinJD: '#checkSkinJD',
    checkSkinJF: '#checkSkinJF',
};
// 面板上的方法
exports.methods = {};
// 面板上触发的事件
exports.listeners = {
    /**
     * 面板隐藏的时候触发
     */
    hide() {
        // console.log(this.hidden);
    },
    /**
     * 面板显示的时候触发
     */
    show() {
        // console.log(this.hidden);
    },
    /**
     * 面板大小更改的时候触发
     */
    resize() {
        // console.log(this.clientHeight);
        // console.log(this.clientWidth);
    }
};
// 尝试关闭面板的时候触发
async function beforeClose() { }
exports.beforeClose = beforeClose;
// 当面板实际关闭后触发
async function close() { }
exports.close = close;
let skinList = ["mj", "jd", "jf"];
function setSkin(style) {
    const options = {
        name: 'skin',
        method: 'updateSkinType',
        args: [style]
    };
    Editor.Message.send('scene', 'execute-scene-script', options);
}
// 当面板渲染成功后触发
async function ready() {
    const options = {
        name: 'skin',
        method: 'getSkinList',
        args: []
    };
    let curSkinList = await Editor.Message.request('scene', 'execute-scene-script', options);
    if (curSkinList.indexOf("mj") != -1) {
        this.$.checkSkinMJ.value = true;
    }
    if (curSkinList.indexOf("jd") != -1) {
        this.$.checkSkinJD.value = true;
    }
    if (curSkinList.indexOf("jf") != -1) {
        this.$.checkSkinJF.value = true;
    }
    this.$.checkSkinMJ.addEventListener('change', async (e) => {
        setSkin("mj");
    });
    this.$.checkSkinJD.addEventListener('change', async (e) => {
        setSkin("jd");
    });
    this.$.checkSkinJF.addEventListener('change', async (e) => {
        setSkin("jf");
    });
    let allAssets = await Editor.Message.request('asset-db', 'query-assets');
    let pluginNamePathDic = (0, utils_1.getGamePacks)(Editor.Project.path);
    let pluginSkinDic = {};
    let isSkinPluginReadOnly = true;
    for (let pluginName in pluginNamePathDic) {
        let url = editor_api_1.default.fspathToUrl(pluginNamePathDic[pluginName]);
        url = url.replace("db://extensions/asset-plugins\\assets\\", "db://asset-plugins/");
        url = url.replace("db://assets/plugins\\", "db://assets/plugins/");
        let skinUUIDDic = {};
        let existFlag = false;
        //判断是否配置了皮肤
        for (let i = 0; i < allAssets.length; i++) {
            if (!allAssets[i].url.startsWith(url)) {
                continue;
            }
            let meta = await utils_1.AssetDB.queryAssetMeta(allAssets[i].uuid);
            for (let k = 0; k < skinList.length; k++) {
                let skinName = skinList[k];
                let skinUUID = meta.userData["skin" + skinName];
                if (skinUUID) {
                    existFlag = true;
                    skinUUIDDic[skinName] = skinUUIDDic[skinName] || {};
                    skinUUIDDic[skinName][allAssets[i].uuid] = [allAssets[i].url, allAssets[i].type, skinUUID];
                }
            }
        }
        if (existFlag) {
            pluginSkinDic[pluginName] = skinUUIDDic;
        }
    }
    if (!pluginSkinDic["SkinPlugin"]) {
        let skinUUIDDic = {};
        let existFlag = false;
        // 单独处理皮肤
        for (let i = 0; i < allAssets.length; i++) {
            if (!allAssets[i].url.startsWith("db://internal/common_skin")) {
                continue;
            }
            let meta = await utils_1.AssetDB.queryAssetMeta(allAssets[i].uuid);
            for (let k = 0; k < skinList.length; k++) {
                let skinName = skinList[k];
                let skinUUID = meta.userData["skin" + skinName];
                if (skinUUID) {
                    existFlag = true;
                    skinUUIDDic[skinName] = skinUUIDDic[skinName] || {};
                    skinUUIDDic[skinName][allAssets[i].uuid] = [allAssets[i].url, allAssets[i].type, skinUUID];
                }
            }
        }
        if (existFlag) {
            pluginSkinDic["SkinPlugin"] = skinUUIDDic;
        }
    }
    else {
        isSkinPluginReadOnly = false;
    }
    for (let k = 0; k < skinList.length; k++) {
        let skinName = skinList[k];
        let flag = false;
        for (let pluginName in pluginSkinDic) {
            if (pluginSkinDic[pluginName][skinName]) {
                flag = true;
                break;
            }
        }
        if (flag) {
            const $skinSection = document.createElement('ui-section');
            $skinSection.setAttribute('expand', "");
            $skinSection.setAttribute('header', skinName);
            $skinSection.setAttribute('class', "config section");
            this.$.panelMain.appendChild($skinSection);
            for (let pluginName in pluginSkinDic) {
                if (!pluginSkinDic[pluginName][skinName]) {
                    continue;
                }
                const $section = document.createElement('ui-section');
                $section.setAttribute('expand', "");
                $section.setAttribute('header', pluginName);
                $section.setAttribute('class', "config section");
                $skinSection.appendChild($section);
                for (let uuid in pluginSkinDic[pluginName][skinName]) {
                    let t = pluginSkinDic[pluginName][skinName][uuid];
                    if (t[1] != "cc.ImageAsset") {
                        continue;
                    }
                    const $group = document.createElement('ui-prop');
                    $group.setAttribute('class', "mb-10");
                    const $linkUUID = document.createElement('ui-link');
                    $linkUUID.setAttribute('type', "assetUrl");
                    $linkUUID.innerText = t[0];
                    $group.appendChild($linkUUID);
                    const $asset = document.createElement('ui-asset');
                    $asset.setAttribute('droppable', "cc.ImageAsset");
                    $asset.setAttribute('value', t[2]);
                    $asset.addEventListener('change', async (e) => {
                        let id = $asset.getAttribute('value');
                        if (id == uuid) {
                            return;
                        }
                        let meta = await utils_1.AssetDB.queryAssetMeta(uuid);
                        let name = "skin" + skinName;
                        if (id) {
                            meta.userData[name] = id;
                        }
                        else {
                            delete meta.userData[name];
                        }
                        utils_1.AssetDB.saveAssetMeta(uuid, meta);
                        const options = {
                            name: 'skin',
                            method: 'updateSkinInScene',
                            args: [skinName, uuid, id]
                        };
                        await Editor.Message.request('scene', 'execute-scene-script', options);
                    });
                    if (isSkinPluginReadOnly && pluginName == "SkinPlugin") {
                        $asset.setAttribute('readonly', "true");
                    }
                    $group.appendChild($asset);
                    $section.appendChild($group);
                }
                const $line = document.createElement('HR');
                $line.setAttribute('width', "100%");
                $section.appendChild($line);
                for (let uuid in pluginSkinDic[pluginName][skinName]) {
                    let t = pluginSkinDic[pluginName][skinName][uuid];
                    if (t[1] == "cc.ImageAsset") {
                        continue;
                    }
                    const $group = document.createElement('ui-prop');
                    $group.setAttribute('class', "mb-10");
                    const $linkUUID = document.createElement('ui-link');
                    $linkUUID.setAttribute('type', "assetUrl");
                    $linkUUID.innerText = t[0];
                    $group.appendChild($linkUUID);
                    const $asset = document.createElement('ui-asset');
                    $asset.setAttribute('droppable', "cc.Prefab");
                    $asset.setAttribute('value', t[2]);
                    $asset.addEventListener('change', async (e) => {
                        let id = $asset.getAttribute('value');
                        if (id == uuid) {
                            return;
                        }
                        let meta = await utils_1.AssetDB.queryAssetMeta(uuid);
                        let name = "skin" + skinName;
                        if (id) {
                            meta.userData[name] = id;
                        }
                        else {
                            delete meta.userData[name];
                        }
                        utils_1.AssetDB.saveAssetMeta(uuid, meta);
                        const options = {
                            name: 'skin',
                            method: 'updateSkinInScene',
                            args: [skinName, uuid, id]
                        };
                        await Editor.Message.request('scene', 'execute-scene-script', options);
                    });
                    $group.appendChild($asset);
                    if (isSkinPluginReadOnly && pluginName == "SkinPlugin") {
                        $asset.setAttribute('readonly', "true");
                    }
                    $section.appendChild($group);
                }
            }
        }
    }
}
exports.ready = ready;
