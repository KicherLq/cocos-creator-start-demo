"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.methods = exports.unload = exports.load = void 0;
const fs_1 = __importDefault(require("fs"));
const utils_1 = require("./utils");
const path_1 = __importDefault(require("path"));
const { join } = require('path');
module.paths.push(join(Editor.App.path, 'node_modules'));
let cocosuid = "";
async function load() {
    const { ct } = require('cc');
    cocosuid = Editor.Utils.UUID.generate();
    // 获取默认游戏
    let extConfig = JSON.parse(fs_1.default.readFileSync(path_1.default.join(Editor.Project.path, "assets/resources/config/ExtensionConfig.json"), { encoding: 'utf-8' }));
    if (extConfig.game.gameType == 1) {
        ct.resourceCenter.addSkin("mj");
    }
    if (extConfig.game.currencyType == 1) {
        ct.resourceCenter.addSkin("jd");
    }
    if (extConfig.game.currencyType == 2) {
        ct.resourceCenter.addSkin("jf");
    }
    // 读取abbr
    let config = JSON.parse(fs_1.default.readFileSync(path_1.default.join(Editor.Project.path, "assets/resources/config/DebugConfig.json"), { encoding: 'utf-8' }));
    let abbr = config.gameCode;
    console.log("init skin", abbr, cocosuid);
    // 注入到启动页面里
    let filePath = path_1.default.join(path_1.default.dirname(Editor.App.path), "app.asar.unpacked/builtin/preview/static/views/script.ejs");
    let str = fs_1.default.readFileSync(filePath, { encoding: 'utf-8' });
    let lines = str.split("\n");
    let newlines = lines.slice(0, 42);
    // 只替换自己游戏那1行
    for (let i = 42; i < lines.length; i++) {
        if (lines[i].indexOf(abbr) == -1) {
            newlines.push(lines[i]);
        }
    }
    str = newlines.join("\n");
    str += "\n";
    str += `<script>window.abbrs = window.abbrs || {};window.abbrs["${abbr}"]="${cocosuid}"</script>`;
    fs_1.default.writeFileSync(filePath, str);
    // 查询所有资源
    let allAssets = await Editor.Message.request('asset-db', 'query-assets');
    for (let i = 0; i < allAssets.length; i++) {
        let meta = await utils_1.AssetDB.queryAssetMeta(allAssets[i].uuid);
        let skinList = ["mj", "jd", "jf"];
        for (let k = 0; k < skinList.length; k++) {
            let skinUUID = meta.userData["skin" + skinList[k]];
            if (skinUUID) {
                ct.resourceCenter.setSkinAsset(skinList[k], allAssets[i].uuid, skinUUID);
                let params = {
                    cocosuuid: new Buffer(cocosuid).toString("base64"),
                    group: skinList[k],
                    uuid: allAssets[i].uuid,
                    skinuuid: skinUUID
                };
                Editor.Network.post("http://logdebug.tcy365.com:2505/log/setskin.php", params);
            }
        }
    }
    if (ct.resourceCenter.hasSkin()) {
        Editor.Message.request('scene', 'soft-reload');
    }
}
exports.load = load;
function unload() {
}
exports.unload = unload;
exports.methods = {
    async updateSkinInScene(type, assetUUID, skinUUID) {
        const { ct } = require('cc');
        skinUUID = skinUUID || null;
        if (ct.resourceCenter.getSkinAssetByType(type, assetUUID) === skinUUID) {
            return;
        }
        ct.resourceCenter.setSkinAsset(type, assetUUID, skinUUID);
        if (ct.resourceCenter.getSkin(type)) {
            utils_1.AssetDB.reimportAsset(assetUUID);
        }
        let params = {
            cocosuuid: new Buffer(cocosuid).toString("base64"),
            group: type,
            uuid: assetUUID,
            skinuuid: skinUUID || ""
        };
        setTimeout(() => {
            Editor.Network.post("http://logdebug.tcy365.com:2505/log/setskin.php", params);
        }, 0);
    },
    async updateSkinType(type) {
        const { ct } = require('cc');
        if (type != "") {
            if (ct.resourceCenter.getSkin(type)) {
                ct.resourceCenter.removeSkin(type);
            }
            else {
                ct.resourceCenter.addSkin(type);
            }
        }
        ct.resourceCenter.printSkinList();
        // 场景重载
        Editor.Message.request('scene', 'soft-reload');
    },
    async getSkinList() {
        const { ct } = require('cc');
        return ct.resourceCenter.getSkinList();
    }
};
