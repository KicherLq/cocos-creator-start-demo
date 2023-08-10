"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unload = exports.load = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const assets_menu_1 = require("./assets-menu");
const utils_1 = require("./utils");
function waitAssetLoaded(uuid, callback) {
    let f;
    let n = 0;
    f = () => {
        utils_1.AssetDB.queryAssetMeta(uuid).then((metaData) => {
            if (!metaData.imported) {
                n++;
                if (n > 60) {
                    callback(false);
                    return;
                }
                setTimeout(f, 100);
            }
            else {
                callback(true);
            }
        });
    };
    f();
}
function load() {
    // 获取所有的插件
    let gamePacks = utils_1.getGamePacks(Editor.Project.path);
    let gamePacksUUID = {};
    let freezeMap = {};
    for (let name in gamePacks) {
        let packName = name;
        let packPath = gamePacks[name];
        let packMetaData = utils_1.readJsonFile(packPath + ".meta");
        gamePacksUUID[name] = packMetaData.uuid;
        // 遍历JPG图片，设置压缩格式
        utils_1.mapDirectory(packPath, (filepath, file, isdir) => {
            if (!isdir) {
                if (file.endsWith(".jpg.meta")) {
                    let metaData = utils_1.readJsonFile(filepath);
                    if (!metaData.userData.compressSettings) {
                        metaData.userData.compressSettings = {
                            useCompressTexture: true,
                            presetId: "98qGASP+BH0oX+P2L4m4vX"
                        };
                        utils_1.writeJsonFile(filepath, metaData, 4);
                        utils_1.AssetDB.refreshAsset(metaData.uuid);
                    }
                }
            }
            return false;
        });
        fs_1.default.watch(packPath, (event, filename) => {
            if (filename == "spines") {
                // 自动设置spine的纹理压缩
                utils_1.mapDirectory(path_1.default.join(packPath, filename), (filepath, file, isdir) => {
                    if (!isdir) {
                        if (file.endsWith(".png.meta") && fs_1.default.existsSync(filepath) && fs_1.default.existsSync(filepath.substring(0, filepath.length - 5))) {
                            if (freezeMap[file]) {
                                return;
                            }
                            freezeMap[file] = true;
                            let metaData = utils_1.readJsonFile(filepath);
                            waitAssetLoaded(metaData.uuid, (isOK) => {
                                if (isOK) {
                                    let metaData = utils_1.readJsonFile(filepath);
                                    metaData.userData.compressSettings = {
                                        useCompressTexture: true,
                                        presetId: "20C0oUYFpPrKsO4x/uWFKQ"
                                    };
                                    utils_1.writeJsonFile(filepath, metaData, 4);
                                    utils_1.AssetDB.refreshAsset(metaData.uuid);
                                }
                                freezeMap[file] = false;
                            });
                        }
                    }
                    return false;
                });
            }
            if (filename == "animations") {
                if (freezeMap[filename]) {
                    return;
                }
                freezeMap[filename] = true;
                setTimeout(() => {
                    if (fs_1.default.existsSync(path_1.default.join(packPath, filename))) {
                        // 只能添加.anim文件
                        let tipFile = "";
                        utils_1.mapDirectory(path_1.default.join(packPath, filename), (filepath, file, isdir) => {
                            if (!isdir && !file.endsWith(".meta")) {
                                if (!file.endsWith(".anim") && !file.endsWith(".anim.meta")) {
                                    tipFile = file;
                                }
                            }
                            return false;
                        });
                        if (tipFile) {
                            // Editor.Dialog.error(`animations 下面只能添加界面动画文件 ${packName} ${tipFile}`)
                        }
                        freezeMap[filename] = false;
                    }
                }, 1000);
            }
            if (filename == "prefabs") {
                if (freezeMap[filename]) {
                    return;
                }
                freezeMap[filename] = true;
                setTimeout(() => {
                    if (fs_1.default.existsSync(path_1.default.join(packPath, filename))) {
                        // 只能添加.anim文件
                        let tipFile = "";
                        utils_1.mapDirectory(path_1.default.join(packPath, filename), (filepath, file, isdir) => {
                            if (!isdir && !file.endsWith(".meta")) {
                                if (!file.endsWith(".prefab") && !file.endsWith(".prefab.meta")) {
                                    tipFile = file;
                                }
                            }
                            return false;
                        });
                        if (tipFile) {
                            // Editor.Dialog.error(`prefabs 下面只能添加预制体文件 ${packName} ${tipFile}`)
                        }
                        freezeMap[filename] = false;
                    }
                }, 1000);
            }
            if (filename == "effects") {
                //特效以目录区分，比如001,002这样
                if (freezeMap[filename]) {
                    return;
                }
                freezeMap[filename] = true;
                setTimeout(() => {
                    if (fs_1.default.existsSync(path_1.default.join(packPath, filename))) {
                        freezeMap[filename] = false;
                        let tip = false;
                        let needRefresh = false;
                        // 在目录下面创建图集如果不存在的话
                        utils_1.mapDirectory(path_1.default.join(packPath, filename), (filepath, file, isdir) => {
                            if (isdir) {
                                if (!fs_1.default.existsSync(path_1.default.join(filepath, "auto-atlas.pac"))) {
                                    assets_menu_1.createAltasMeta(filepath);
                                    needRefresh = true;
                                }
                            }
                            else {
                                if (!filepath.endsWith(".meta")) {
                                    if (path_1.default.dirname(filepath).length == path_1.default.join(packPath, filename).length) {
                                        tip = true;
                                    }
                                }
                            }
                            return false;
                        });
                        if (needRefresh) {
                            utils_1.AssetDB.refreshAsset(gamePacksUUID[name]);
                        }
                        if (tip) {
                            // Editor.Dialog.error(`特效请以目录区分，比如001,002这样分类存放 ${packName}`)
                        }
                    }
                }, 1000);
            }
        });
    }
}
exports.load = load;
function unload() {
}
exports.unload = unload;
//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUMsVUFBVSxDQUFDLGNBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFDLGdCQUFnQixDQUFDLENBQUMsRUFBRTtvQ0FDdEQsNkJBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQTtvQ0FDekIsV0FBVyxHQUFHLElBQUksQ0FBQTtpQ0FDckI7NkJBQ0o7aUNBQU07Z0NBQ0gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7b0NBQzdCLElBQUksY0FBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLElBQUksY0FBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxFQUFFO3dDQUN0RSxHQUFHLEdBQUcsSUFBSSxDQUFBO3FDQUNiO2lDQUNKOzZCQUNKOzRCQUVELE9BQU8sS0FBSyxDQUFBO3dCQUNoQixDQUFDLENBQUMsQ0FBQTt3QkFFRixJQUFJLFdBQVcsRUFBRTs0QkFDYixlQUFPLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO3lCQUM1Qzt3QkFFRCxJQUFJLEdBQUcsRUFBRTs0QkFDTCw4REFBOEQ7eUJBQ2pFO3FCQUNKO2dCQUNMLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUNaO1FBR0wsQ0FBQyxDQUFDLENBQUE7S0FDTDtBQUNMLENBQUM7QUF6S0Qsb0JBeUtDO0FBRUQsU0FBZ0IsTUFBTTtBQUV0QixDQUFDO0FBRkQsd0JBRUMiLCJmaWxlIjoic2NlbmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZnMgZnJvbSAnZnMnO1xyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xyXG5pbXBvcnQgeyBjcmVhdGVBbHRhc01ldGEgfSBmcm9tICcuL2Fzc2V0cy1tZW51JztcclxuaW1wb3J0IHtBc3NldERCLGdldEdhbWVQYWNrcyxtYXBEaXJlY3RvcnkscmVhZEpzb25GaWxlLHdyaXRlSnNvbkZpbGV9IGZyb20gJy4vdXRpbHMnXHJcblxyXG5cclxuZnVuY3Rpb24gd2FpdEFzc2V0TG9hZGVkKHV1aWQsY2FsbGJhY2spIHtcclxuICAgIGxldCBmXHJcbiAgICBsZXQgbiA9IDBcclxuXHJcbiAgICBmID0gKCkgPT4ge1xyXG4gICAgICAgIEFzc2V0REIucXVlcnlBc3NldE1ldGEodXVpZCkudGhlbigobWV0YURhdGEpPT4ge1xyXG4gICAgICAgICAgICBpZiAoIW1ldGFEYXRhLmltcG9ydGVkKSB7XHJcbiAgICAgICAgICAgICAgICBuKytcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobiA+IDYwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soZmFsc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmLDEwMClcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHRydWUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGYoKVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbG9hZCgpIHtcclxuICAgIC8vIOiOt+WPluaJgOacieeahOaPkuS7tlxyXG4gICAgbGV0IGdhbWVQYWNrcyA9IGdldEdhbWVQYWNrcyhFZGl0b3IuUHJvamVjdC5wYXRoKVxyXG4gICAgbGV0IGdhbWVQYWNrc1VVSUQgPSB7fVxyXG4gICAgbGV0IGZyZWV6ZU1hcCA9IHt9XHJcblxyXG4gICAgZm9yIChsZXQgbmFtZSBpbiBnYW1lUGFja3MpIHtcclxuICAgICAgICBsZXQgcGFja05hbWUgPSBuYW1lXHJcbiAgICAgICAgbGV0IHBhY2tQYXRoID0gZ2FtZVBhY2tzW25hbWVdXHJcbiAgICAgICAgbGV0IHBhY2tNZXRhRGF0YSA9IHJlYWRKc29uRmlsZShwYWNrUGF0aCArIFwiLm1ldGFcIilcclxuICAgICAgICBnYW1lUGFja3NVVUlEW25hbWVdID0gcGFja01ldGFEYXRhLnV1aWRcclxuXHJcbiAgICAgICAgLy8g6YGN5Y6GSlBH5Zu+54mH77yM6K6+572u5Y6L57yp5qC85byPXHJcbiAgICAgICAgbWFwRGlyZWN0b3J5KHBhY2tQYXRoLChmaWxlcGF0aCxmaWxlLGlzZGlyKT0+IHtcclxuICAgICAgICAgICAgaWYgKCFpc2Rpcikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGZpbGUuZW5kc1dpdGgoXCIuanBnLm1ldGFcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbWV0YURhdGEgPSByZWFkSnNvbkZpbGUoZmlsZXBhdGgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghbWV0YURhdGEudXNlckRhdGEuY29tcHJlc3NTZXR0aW5ncykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXRhRGF0YS51c2VyRGF0YS5jb21wcmVzc1NldHRpbmdzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlQ29tcHJlc3NUZXh0dXJlIDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXNldElkIDogXCI5OHFHQVNQK0JIMG9YK1AyTDRtNHZYXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3cml0ZUpzb25GaWxlKGZpbGVwYXRoLG1ldGFEYXRhLDQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEFzc2V0REIucmVmcmVzaEFzc2V0KG1ldGFEYXRhLnV1aWQpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGZzLndhdGNoKHBhY2tQYXRoLChldmVudCxmaWxlbmFtZSk9PiB7XHJcbiAgICAgICAgICAgIGlmIChmaWxlbmFtZSA9PSBcInNwaW5lc1wiKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDoh6rliqjorr7nva5zcGluZeeahOe6ueeQhuWOi+e8qVxyXG4gICAgICAgICAgICAgICAgbWFwRGlyZWN0b3J5KHBhdGguam9pbihwYWNrUGF0aCxmaWxlbmFtZSksKGZpbGVwYXRoLGZpbGUsaXNkaXIpPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNkaXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpbGUuZW5kc1dpdGgoXCIucG5nLm1ldGFcIikgJiYgZnMuZXhpc3RzU3luYyhmaWxlcGF0aCkgJiYgZnMuZXhpc3RzU3luYyhmaWxlcGF0aC5zdWJzdHJpbmcoMCxmaWxlcGF0aC5sZW5ndGggLSA1KSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmcmVlemVNYXBbZmlsZV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcmVlemVNYXBbZmlsZV0gPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbWV0YURhdGEgPSByZWFkSnNvbkZpbGUoZmlsZXBhdGgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YWl0QXNzZXRMb2FkZWQobWV0YURhdGEudXVpZCwoaXNPSyk9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzT0spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG1ldGFEYXRhID0gcmVhZEpzb25GaWxlKGZpbGVwYXRoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRhRGF0YS51c2VyRGF0YS5jb21wcmVzc1NldHRpbmdzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlQ29tcHJlc3NUZXh0dXJlIDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXNldElkIDogXCIyMEMwb1VZRnBQcktzTzR4L3VXRktRXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd3JpdGVKc29uRmlsZShmaWxlcGF0aCxtZXRhRGF0YSw0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBc3NldERCLnJlZnJlc2hBc3NldChtZXRhRGF0YS51dWlkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcmVlemVNYXBbZmlsZV0gPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZmlsZW5hbWUgPT0gXCJhbmltYXRpb25zXCIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChmcmVlemVNYXBbZmlsZW5hbWVdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZnJlZXplTWFwW2ZpbGVuYW1lXSA9IHRydWVcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmcy5leGlzdHNTeW5jKHBhdGguam9pbihwYWNrUGF0aCxmaWxlbmFtZSkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOWPquiDvea3u+WKoC5hbmlt5paH5Lu2XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0aXBGaWxlID0gXCJcIlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFwRGlyZWN0b3J5KHBhdGguam9pbihwYWNrUGF0aCxmaWxlbmFtZSksKGZpbGVwYXRoLGZpbGUsaXNkaXIpPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpc2RpciAmJiAhZmlsZS5lbmRzV2l0aChcIi5tZXRhXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFmaWxlLmVuZHNXaXRoKFwiLmFuaW1cIikgJiYgIWZpbGUuZW5kc1dpdGgoXCIuYW5pbS5tZXRhXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpcEZpbGUgPSBmaWxlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aXBGaWxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBFZGl0b3IuRGlhbG9nLmVycm9yKGBhbmltYXRpb25zIOS4i+mdouWPquiDvea3u+WKoOeVjOmdouWKqOeUu+aWh+S7tiAke3BhY2tOYW1lfSAke3RpcEZpbGV9YClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZnJlZXplTWFwW2ZpbGVuYW1lXSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChmaWxlbmFtZSA9PSBcInByZWZhYnNcIikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGZyZWV6ZU1hcFtmaWxlbmFtZV0pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBmcmVlemVNYXBbZmlsZW5hbWVdID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZzLmV4aXN0c1N5bmMocGF0aC5qb2luKHBhY2tQYXRoLGZpbGVuYW1lKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5Y+q6IO95re75YqgLmFuaW3mlofku7ZcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRpcEZpbGUgPSBcIlwiXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXBEaXJlY3RvcnkocGF0aC5qb2luKHBhY2tQYXRoLGZpbGVuYW1lKSwoZmlsZXBhdGgsZmlsZSxpc2Rpcik9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWlzZGlyICYmICFmaWxlLmVuZHNXaXRoKFwiLm1ldGFcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWZpbGUuZW5kc1dpdGgoXCIucHJlZmFiXCIpICYmICFmaWxlLmVuZHNXaXRoKFwiLnByZWZhYi5tZXRhXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpcEZpbGUgPSBmaWxlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aXBGaWxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBFZGl0b3IuRGlhbG9nLmVycm9yKGBwcmVmYWJzIOS4i+mdouWPquiDvea3u+WKoOmihOWItuS9k+aWh+S7tiAke3BhY2tOYW1lfSAke3RpcEZpbGV9YClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZnJlZXplTWFwW2ZpbGVuYW1lXSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChmaWxlbmFtZSA9PSBcImVmZmVjdHNcIikge1xyXG4gICAgICAgICAgICAgICAgLy/nibnmlYjku6Xnm67lvZXljLrliIbvvIzmr5TlpoIwMDEsMDAy6L+Z5qC3XHJcbiAgICAgICAgICAgICAgICBpZiAoZnJlZXplTWFwW2ZpbGVuYW1lXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGZyZWV6ZU1hcFtmaWxlbmFtZV0gPSB0cnVlXHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZnMuZXhpc3RzU3luYyhwYXRoLmpvaW4ocGFja1BhdGgsZmlsZW5hbWUpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmcmVlemVNYXBbZmlsZW5hbWVdID0gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRpcCA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZWVkUmVmcmVzaCA9IGZhbHNlXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDlnKjnm67lvZXkuIvpnaLliJvlu7rlm77pm4blpoLmnpzkuI3lrZjlnKjnmoTor51cclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFwRGlyZWN0b3J5KHBhdGguam9pbihwYWNrUGF0aCxmaWxlbmFtZSksKGZpbGVwYXRoLGZpbGUsaXNkaXIpPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzZGlyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFmcy5leGlzdHNTeW5jKHBhdGguam9pbihmaWxlcGF0aCxcImF1dG8tYXRsYXMucGFjXCIpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVBbHRhc01ldGEoZmlsZXBhdGgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5lZWRSZWZyZXNoID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFmaWxlcGF0aC5lbmRzV2l0aChcIi5tZXRhXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXRoLmRpcm5hbWUoZmlsZXBhdGgpLmxlbmd0aCA9PSBwYXRoLmpvaW4ocGFja1BhdGgsZmlsZW5hbWUpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGlwID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5lZWRSZWZyZXNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBc3NldERCLnJlZnJlc2hBc3NldChnYW1lUGFja3NVVUlEW25hbWVdKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGlwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBFZGl0b3IuRGlhbG9nLmVycm9yKGDnibnmlYjor7fku6Xnm67lvZXljLrliIbvvIzmr5TlpoIwMDEsMDAy6L+Z5qC35YiG57G75a2Y5pS+ICR7cGFja05hbWV9YClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICB9KVxyXG4gICAgfSAgXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB1bmxvYWQoKSB7XHJcbiAgICBcclxufVxyXG5cclxuLyoqXHJcbiAqIOaPkuS7tuWHveaVsOmbhuWQiFxyXG4gKi9cclxuZXhwb3J0IG5hbWVzcGFjZSBtZXRob2RzIHtcclxufVxyXG4iXX0=
