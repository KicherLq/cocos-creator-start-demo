"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
const editor_api_1 = __importDefault(require("./editor-api"));
const file_util_1 = __importDefault(require("./file-util"));
function escapeRegExp(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}
function replaceAll(str, FindText, RepText) {
    let regExp = new RegExp(escapeRegExp(FindText), "g");
    return str.replace(regExp, RepText);
}
class ReplaceUUID {
    static async replaceDir(assetsPath) {
        let uuidDic = {};
        let handler = async (path, stats) => {
            let ext = (0, path_1.extname)(path);
            if (ext === '.meta') {
                let jsonStr = fs_1.default.readFileSync(path, 'utf-8');
                let json = JSON.parse(jsonStr);
                if (editor_api_1.default.isUUID(json['uuid'])) {
                    uuidDic[json['uuid']] = editor_api_1.default.generateUUID();
                    if (json['subMetas'] && typeof json['subMetas'] == 'object') {
                        for (var bb in json['subMetas']) {
                            let subJson = json['subMetas'][bb];
                            if (editor_api_1.default.isUUID(subJson['uuid'])) {
                                uuidDic[subJson['uuid']] = editor_api_1.default.generateUUID();
                            }
                        }
                    }
                }
            }
        };
        await file_util_1.default.map(assetsPath, handler);
        // 开始暴力替换
        let replaceHandler = async (path, stats) => {
            let jsonStr = fs_1.default.readFileSync(path, 'utf-8');
            let needSave = false;
            for (let uuid in uuidDic) {
                let newJsonStr1 = replaceAll(jsonStr, uuid, uuidDic[uuid]);
                let compressUuid = editor_api_1.default.compressUuid(uuid);
                let newJsonStr2 = replaceAll(newJsonStr1, compressUuid, editor_api_1.default.compressUuid(uuidDic[uuid]));
                if (newJsonStr2 != jsonStr) {
                    needSave = true;
                    jsonStr = newJsonStr2;
                }
            }
            if (needSave) {
                fs_1.default.writeFileSync(path, jsonStr);
            }
        };
        await file_util_1.default.map(assetsPath, replaceHandler);
        console.log("replace done");
    }
}
exports.default = ReplaceUUID;
