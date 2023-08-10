"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unload = exports.onAfterBuild = exports.isObject = exports.onAfterCompressSettings = exports.onBeforeCompressSettings = exports.onBeforeBuild = exports.load = exports.throwError = void 0;
const utils_1 = require("./utils");
var fs = require('fs');
var path = require('path');
var pngquant = require('./pngquant');
var http = require('http');
const xxtea = require('./xxtea');
const PACKAGE_NAME = 'cocos-build-template';
function log(...arg) {
    return console.log(`[${PACKAGE_NAME}] `, ...arg);
}
let allAssets = [];
exports.throwError = true;
const load = function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`[${PACKAGE_NAME}] Load cocos plugin example in builder.`);
        allAssets = yield Editor.Message.request('asset-db', 'query-assets');
    });
};
exports.load = load;
const onBeforeBuild = function (options) {
    return __awaiter(this, void 0, void 0, function* () {
        if (isMinigame(options.platform)) {
            options.md5Cache = true;
        }
        // Todo some thing
        log(`${PACKAGE_NAME}.webTestOption`, 'onBeforeBuild');
    });
};
exports.onBeforeBuild = onBeforeBuild;
const onBeforeCompressSettings = function (options, result) {
    return __awaiter(this, void 0, void 0, function* () {
        const pkgOptions = options.packages[PACKAGE_NAME];
        if (pkgOptions.webTestOption) {
            console.debug('webTestOption', true);
        }
        // Todo some thing
        console.debug('get settings test', result.settings);
    });
};
exports.onBeforeCompressSettings = onBeforeCompressSettings;
const onAfterCompressSettings = function (options, result) {
    return __awaiter(this, void 0, void 0, function* () {
        // Todo some thing
        console.log('webTestOption', 'onAfterCompressSettings');
    });
};
exports.onAfterCompressSettings = onAfterCompressSettings;
let replaceAll = function (str, FindText, RepText) {
    let regExp = new RegExp(FindText, "g");
    return str.replace(regExp, RepText);
};
function rmdirSync(url) {
    if (fs.existsSync(url)) {
        // 读取要删除的目录，获取目录下的文件信息
        let files = fs.readdirSync(url);
        // 循环遍历要删除的文件
        files.forEach(file => {
            //   console.log(file);//1.text dir2
            // 将文件的名字和要删除的目录路径组合，得到要删除的文件的路径
            let filePath = path.join(url, file);
            //   如果是目录，继续遍历(递归遍历)
            if (fs.statSync(filePath).isDirectory()) {
                rmdirSync(filePath);
            }
            else {
                // 如果是文件，直接删除文件
                fs.unlinkSync(filePath);
            }
        });
        fs.rmdirSync(url); //删除所有的空目录
    }
}
function Unique(arr) {
    return arr.filter((item, index) => {
        return arr.indexOf(item) == index;
    });
}
function ConvertJS(pluginName, fileName) {
    var indexStr = fs.readFileSync(fileName, 'utf8');
    let shareVarPatt = new RegExp('System.register\\(\"chunks:///_virtual/(.[^,]+?).ts\",*?', 'g');
    let prefix = "System.register(\"";
    if (shareVarPatt.test(indexStr)) {
        let resultArr = indexStr.match(shareVarPatt);
        if (resultArr) {
            for (let i = 0; i < resultArr.length; i++) {
                let line = resultArr[i].substring(prefix.length, resultArr[i].length - 1);
                let fileName = path.basename(line);
                indexStr = replaceAll(indexStr, fileName, pluginName + "_" + fileName);
            }
        }
    }
    // 替换ct.LocalCache.xxx() ->ct.LocalPluginCache.xxx(PluginName)
    // let localCachePatt = new RegExp('\.LocalCache\..+?[(]', 'g');
    // if (localCachePatt.test(indexStr)) {
    //     let resultArr = indexStr.match(localCachePatt)
    //     if (resultArr) {
    //         resultArr = Unique(resultArr)
    //         for (let i = 0; i < resultArr.length; i++) {
    //             indexStr = replaceAll(indexStr,resultArr[i],resultArr[i]+ pluginName + ",")
    //         }
    //     }
    // }
    // 替换ct.UserCache.xxx() ->ct.UserPluginCache.xxx(PluginName)
    // let userCachePatt = new RegExp('\.UserCache\..+?[(]', 'g');
    // if (userCachePatt.test(indexStr)) {
    //     let resultArr = indexStr.match(userCachePatt)
    //     if (resultArr) {
    //         resultArr = Unique(resultArr)
    //         for (let i = 0; i < resultArr.length; i++) {
    //             indexStr = replaceAll(indexStr,resultArr[i],resultArr[i]+ pluginName + ",")
    //         }
    //     }
    // }
    fs.writeFileSync(fileName, indexStr);
}
function GetIndexJSPath(rootPath) {
    if (!fs.existsSync(rootPath)) {
        return "";
    }
    var files = fs.readdirSync(rootPath);
    var file = "";
    files.forEach(function (name) {
        if (name.endsWith(".js")) {
            file = name;
        }
    });
    if (!file) {
        return "";
    }
    return path.join(rootPath, file);
}
function GetJsonPath(rootPath, filter) {
    var files = fs.readdirSync(rootPath);
    var file = "";
    files.forEach(function (name) {
        if (name.endsWith(".json")) {
            if (!filter) {
                file = name;
            }
            else {
                if (name.startsWith(filter)) {
                    file = name;
                }
            }
        }
    });
    if (file) {
        return path.join(rootPath, file);
    }
    else {
        return "";
    }
}
function isMinigame(platform) {
    if (platform == "wechatgame" || platform == "alipay-mini-game") {
        return true;
    }
    return false;
}
function PostProcessPlugin(options, result) {
    return __awaiter(this, void 0, void 0, function* () {
        let rootPath = result.paths.assets;
        if (isMinigame(options.platform)) {
            rootPath = result.paths.bundleScripts;
        }
        var files = fs.readdirSync(rootPath);
        files.forEach(function (name) {
            var filedir = path.join(rootPath, name);
            var stats = fs.statSync(filedir);
            var isDir = stats.isDirectory();
            if (isDir && name.endsWith("Plugin")) {
                let dirName = name;
                if (dirName != "CommonPlugin" && dirName != "SkinPlugin") {
                    console.debug("process plugin js", dirName);
                    try {
                        let jspath = GetIndexJSPath(path.join(rootPath, dirName));
                        fs.statSync(jspath);
                        ConvertJS(dirName, jspath);
                    }
                    catch (err) {
                    }
                }
            }
        });
    });
}
/**
 * 如果构建原生版本，则移除小程序相关资源
 * 如果构建IOS版本，移除所有实物相关的
 * @param options
 * @param result
 */
function PostProcessRemoveRes(options, result) {
    return __awaiter(this, void 0, void 0, function* () {
        let rootPath = result.paths.assets;
        var files = fs.readdirSync(rootPath);
        files.forEach(function (name) {
            var filedir = path.join(rootPath, name);
            var stats = fs.statSync(filedir);
            var isDir = stats.isDirectory();
            if (isDir && name.endsWith("Plugin")) {
                let pluginName = name;
                let config = JSON.parse(fs.readFileSync(path.join(filedir, "cc.config.json"), 'utf8'));
                let uuidList = [];
                for (let uuid in config.paths) {
                    let resPath = config.paths[uuid][0];
                    if (options.flags && options.flags["iosflag"]) {
                        if (resPath.indexOf("minigame/") != -1) {
                            uuidList.push(uuid);
                        }
                    }
                    if (options.name == "SkinPlugin") {
                        // ios下移除所有实物道具
                        if (options.flags && options.flags["iosflag"]) {
                            if (resPath.indexOf("item/realitem") != -1) {
                                uuidList.push(uuid);
                            }
                        }
                    }
                }
                if (uuidList.length == 0) {
                    return;
                }
                if (options.debug) {
                    // 从cc.config.json文件中移除
                    config.uuids = config.uuids.filter((x) => uuidList.indexOf(x) == -1);
                    // 从paths移除
                    uuidList.forEach((uuid) => {
                        delete config.paths[uuid];
                    });
                    // 从packs移除
                    for (let packid in config.packs) {
                        let newList = config.packs[packid].filter((x) => uuidList.indexOf(x) == -1);
                        if (newList.length != config.packs[packid].length) {
                            let packfilePath = (0, utils_1.findFile)(filedir, packid, utils_1.FindFileType.FILE);
                            let packJsonConfig = JSON.parse(fs.readFileSync(packfilePath, 'utf8'));
                            if (Array.isArray(packJsonConfig)) {
                                throw `cant remove resources from pack ${pluginName}`;
                            }
                            else {
                                if (packJsonConfig.data) {
                                    if (packJsonConfig.type == "cc.ImageAsset" || packJsonConfig.type == "cc.Texture2D") {
                                        let newDatas = [];
                                        for (let i = 0; i < packJsonConfig.data.length; i++) {
                                            let uuid = config.packs[packid][i];
                                            if (uuidList.indexOf(uuid) == -1) {
                                                newDatas.push(packJsonConfig.data[i]);
                                            }
                                        }
                                        packJsonConfig.data = newDatas;
                                    }
                                }
                            }
                            fs.writeFileSync(packfilePath, JSON.stringify(packJsonConfig));
                        }
                        config.packs[packid] = newList;
                    }
                    // 从extensionMap中移除
                    for (let key in config.extensionMap) {
                        config.extensionMap[key] = config.extensionMap[key].filter((x) => uuidList.indexOf(x) == -1);
                    }
                    // 移除uuid对应的资源
                    uuidList.forEach((uuid) => {
                        let findFilePath = [];
                        (0, utils_1.findAllFile)(findFilePath, filedir, uuid, utils_1.FindFileType.FILE);
                        findFilePath.forEach((filedir) => {
                            fs.unlinkSync(filedir);
                        });
                    });
                    fs.writeFileSync(path.join(filedir, "cc.config.json"), JSON.stringify(config, null, 4));
                }
                else {
                    // 非DEBUG模式，数据是优化过的
                    let uuidIndexList = uuidList;
                    uuidList = [];
                    for (let i = 0; i < uuidIndexList.length; i++) {
                        uuidList.push(config.uuids[uuidIndexList[i]]);
                    }
                    let olduuids = config.uuids;
                    // 从cc.config.json文件中移除
                    config.uuids = config.uuids.filter((x) => uuidList.indexOf(x) == -1);
                    // 从paths移除
                    let newUuidPaths = {};
                    for (let k in config.paths) {
                        if (uuidIndexList.indexOf(k) == -1) {
                            newUuidPaths[olduuids[k]] = config.paths[k];
                        }
                    }
                    let newPaths = {};
                    for (let k in newUuidPaths) {
                        newPaths[config.uuids.indexOf(k)] = newUuidPaths[k];
                    }
                    config.paths = newPaths;
                    // 从packs移除
                    for (let packid in config.packs) {
                        let oldPackList = config.packs[packid];
                        let newList = oldPackList.filter((x) => uuidIndexList.indexOf(x) == -1);
                        if (newList.length != oldPackList.length) {
                            // 转为uuid
                            newList = newList.map((x) => olduuids[x]);
                            // 新索引
                            newList = newList.map((x) => config.uuids.indexOf(x).toString());
                            let packfilePath = (0, utils_1.findFile)(filedir, packid, utils_1.FindFileType.FILE);
                            let packJsonConfig = JSON.parse(fs.readFileSync(packfilePath, 'utf8'));
                            if (Array.isArray(packJsonConfig)) {
                                throw `cant remove resources from pack ${pluginName}`;
                            }
                            else {
                                if (packJsonConfig.data) {
                                    if (packJsonConfig.type == "cc.ImageAsset" || packJsonConfig.type == "cc.Texture2D") {
                                        let newDatas = [];
                                        for (let i = 0; i < packJsonConfig.data.length; i++) {
                                            let uuid = olduuids[oldPackList[i]];
                                            if (uuidList.indexOf(uuid) == -1) {
                                                newDatas.push(packJsonConfig.data[i]);
                                            }
                                        }
                                        packJsonConfig.data = newDatas;
                                    }
                                }
                            }
                            //保存pack内容文件
                            fs.writeFileSync(packfilePath, JSON.stringify(packJsonConfig));
                            config.packs[packid] = newList;
                        }
                        else {
                            newList = newList.map((x) => olduuids[x]);
                            // 新索引
                            newList = newList.map((x) => config.uuids.indexOf(x).toString());
                            config.packs[packid] = newList;
                        }
                    }
                    // 从extensionMap中移除
                    for (let key in config.extensionMap) {
                        let list = config.extensionMap[key];
                        let newList = list.filter((x) => uuidIndexList.indexOf(x) == -1);
                        let newListUUIDs = newList.map((x) => olduuids[x]);
                        newList = newListUUIDs.map((x) => config.uuids.indexOf(x));
                        config.extensionMap[key] = newList;
                    }
                    // 移除uuid对应的资源
                    uuidList.forEach((uuid) => {
                        let uuidDecompress = Editor.Utils.UUID.decompressUUID(uuid);
                        let findFilePath = [];
                        (0, utils_1.findAllFile)(findFilePath, filedir, uuidDecompress, utils_1.FindFileType.FILE);
                        findFilePath.forEach((filedir) => {
                            fs.unlinkSync(filedir);
                        });
                    });
                    fs.writeFileSync(path.join(filedir, "cc.config.json"), JSON.stringify(config));
                }
            }
        });
    });
}
function SyncHttpRequest(url) {
    return __awaiter(this, void 0, void 0, function* () {
        let content = '';
        yield new Promise(function (resolve, reject) {
            let t = new Date().getTime();
            let req = http.get(url + "?" + t.toString(), function (res) {
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                    content += chunk;
                });
                res.on('end', function () {
                    resolve({ result: true, data: content });
                });
            });
            req.on('error', (e) => {
                content = "";
                resolve({ result: false, errmsg: e.message });
            });
            req.end();
        });
        return content;
    });
}
function PostProcessPackSubpackage(options, result) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("PostProcessPackSubpackage");
        var pluginsList = [];
        // 移动脚本文件到bundleScripts
        var files = fs.readdirSync(result.paths.remote);
        files.forEach(function (name) {
            let jsFile = GetIndexJSPath(path.join(result.paths.remote, name));
            if (jsFile) {
                if (!fs.existsSync(path.join(result.paths.bundleScripts, name))) {
                    fs.mkdirSync(path.join(result.paths.bundleScripts, name), { recursive: true });
                }
                fs.renameSync(jsFile, path.join(result.paths.bundleScripts, name, "index.js"));
            }
            pluginsList.push(name);
        });
        console.log("build plugins", pluginsList);
        var mergeContent = "";
        pluginsList.forEach(function (plugin) {
            let jsFile = GetIndexJSPath(path.join(result.paths.bundleScripts, plugin));
            if (jsFile && fs.existsSync(jsFile)) {
                var content = fs.readFileSync(jsFile, 'utf8');
                console.log("merge plugin", plugin);
                mergeContent += content;
            }
            mergeContent += "\n";
        });
        if (!mergeContent) {
            console.log("插件资源有问题，没有代码");
            return;
        }
        if (!fs.existsSync(result.paths.subpackages)) {
            fs.mkdirSync(result.paths.subpackages);
        }
        var subpackagesDir = path.join(result.paths.subpackages, "plugins");
        if (!fs.existsSync(subpackagesDir)) {
            fs.mkdirSync(subpackagesDir);
            // 代码
            var file = path.join(subpackagesDir, "game.js");
            fs.writeFileSync(file, mergeContent);
            // 配置文件
            var configStr = '{"importBase":"import","nativeBase":"native","name":"plugins","deps":[],"uuids":[],"paths":{},"scenes":{},"packs":{},"versions":{"import":[],"native":[]},"redirect":[],"debug":false,"extensionMap":{},"types":["cc.JsonAsset"]}';
            file = path.join(subpackagesDir, "config.json");
            fs.writeFileSync(file, configStr);
            // 添加分包到game.json
            var gameJson = JSON.parse(fs.readFileSync(path.join(result.paths.dir, "game.json"), 'utf8'));
            gameJson.subpackages = gameJson.subpackages || [];
            gameJson.subpackages.push({
                "name": "plugins",
                "root": "subpackages/plugins/"
            });
            gameJson.networkTimeout.request = 10000;
            gameJson.networkTimeout.connectSocket = 10000;
            gameJson.networkTimeout.uploadFile = 10000;
            gameJson.deviceOrientation = "landscape";
            fs.writeFileSync(path.join(result.paths.dir, "game.json"), JSON.stringify(gameJson, null, 4));
        }
        return pluginsList;
    });
}
/**
 * 把模板目录下面的js转成jsc文件
 */
function PostProcessJsc(options, result) {
    return __awaiter(this, void 0, void 0, function* () {
        let config = options["packages"]["native"];
        function tojsc(dir) {
            let info = fs.statSync(dir);
            if (info.isDirectory()) {
                (0, utils_1.mapDirectory)(dir, (fullPath, file) => {
                    if (file.endsWith(".js")) {
                        console.log("tojsc", fullPath);
                        let data = fs.readFileSync(fullPath);
                        let encryptData = xxtea.encrypt(data, config.xxteaKey);
                        fs.writeFileSync(fullPath + "c", encryptData);
                        fs.unlinkSync(fullPath);
                    }
                    return true;
                });
            }
            else {
                let fullPath = dir;
                let data = fs.readFileSync(fullPath);
                let encryptData = xxtea.encrypt(data, config.xxteaKey);
                fs.writeFileSync(fullPath + "c", encryptData);
                fs.unlinkSync(fullPath);
            }
        }
        if (options.name == "engine") {
            tojsc(path.join(result.paths.dir, "jsb-adapter"));
            tojsc(path.join(result.paths.dir, "src"));
            tojsc(path.join(result.paths.dir, "main.js"));
        }
        tojsc(result.paths.assets);
    });
}
function PostProcessSetting(result) {
    return __awaiter(this, void 0, void 0, function* () {
        var json = JSON.parse(fs.readFileSync(result.paths.settings, 'utf8'));
        // 去掉水印
        json.splashScreen.totalTime = 0;
        json.splashScreen.displayWatermark = false;
        json.splashScreen.base64src = "";
        fs.writeFileSync(result.paths.settings, JSON.stringify(json));
    });
}
function getGamePacks(findPath) {
    let packs = [];
    let _collectGamePacks;
    _collectGamePacks = (path_) => {
        for (let f of fs.readdirSync(path_)) {
            let fpath = path.join(path_, f);
            let fstate = fs.statSync(fpath);
            if (fstate.isDirectory()) {
                let metafile = fpath + '.meta';
                if (fs.existsSync(metafile)) {
                    let meta = JSON.parse(fs.readFileSync(metafile, { encoding: 'utf-8' }));
                    if (meta === null || meta === void 0 ? void 0 : meta.userData.isBundle) {
                        let name = meta.userData.bundleName || f;
                        if (name != "resources")
                            packs.push(name);
                        continue;
                    }
                }
                _collectGamePacks(fpath);
            }
        }
    };
    _collectGamePacks(path.join(findPath, 'assets'));
    return packs;
}
function PostProcessMiniGameGameSetting(options, result, remotePluginList) {
    return __awaiter(this, void 0, void 0, function* () {
        let data = options["packages"][options.platform];
        var json = JSON.parse(fs.readFileSync(result.paths.settings, 'utf8'));
        json.plugins = {
            remoteAddress: data.remoteServerAddress
        };
        // 注入远程插件
        for (let i = 0; i < remotePluginList.length; i++) {
            if (json.remoteBundles.indexOf(remotePluginList[i]) == -1) {
                json.remoteBundles.push(remotePluginList[i]);
            }
        }
        // 写入本地插件
        let packs = getGamePacks(Editor.Project.path);
        json.plugins.gamePacks = packs;
        fs.writeFileSync(result.paths.settings, JSON.stringify(json));
    });
}
function PostProcessMiniGamePrivateSetting(options, result) {
    return __awaiter(this, void 0, void 0, function* () {
        let t = {
            "description": "项目私有配置文件。此文件中的内容将覆盖 project.config.json 中的相同字段。项目的改动优先同步到此文件中。详见文档：https://developers.weixin.qq.com/miniprogram/dev/devtools/projectconfig.html",
            "setting": {
                "urlCheck": false
            }
        };
        fs.writeFileSync(path.join(result.paths.dir, "project.private.config.json"), JSON.stringify(t, null, 4));
    });
}
function PngCompress(assets, dest) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            pngquant.apply(assets, dest, dest, (err) => {
                console.log("pngquant complete");
                resolve();
            });
        });
    });
}
const encryptKey = [19, 80, 123, 30, 1, 203, 51, 2, 3, 5, 111];
let offsetKey = 0;
function encodeImageData(byte) {
    if (offsetKey >= encryptKey.length) {
        offsetKey = 0;
    }
    let num = encryptKey[offsetKey];
    offsetKey++;
    return (num + byte) & 0xff;
}
/**
 * 对图片进行加密
 * @param result
 */
function PostProcessImageEncrypt(result) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, utils_1.mapDirectory)(result.paths.assets, (fullPath, file) => {
            file = file.toLocaleLowerCase();
            if (file.endsWith(".png") || file.endsWith(".jpg") || file.endsWith(".astc") || file.endsWith(".pkm")) {
                offsetKey = 0;
                let data = fs.readFileSync(fullPath);
                const marker = "lvimage_";
                let encryptData = [];
                for (let i = 0; i < marker.length; i++) {
                    encryptData.push(marker.charCodeAt(i));
                }
                for (let i = 0; i < data.length; i++) {
                    encryptData.push(encodeImageData(data[i]));
                }
                fs.writeFileSync(fullPath, Buffer.from(encryptData));
            }
            return true;
        });
    });
}
function PostProcessBundleVers(options, result, remotePluginList) {
    return __awaiter(this, void 0, void 0, function* () {
        if (remotePluginList.length > 0) {
            var json = JSON.parse(fs.readFileSync(result.paths.settings, 'utf8'));
            for (let i = 0; i < remotePluginList.length; i++) {
                let jsonFile = path.basename(GetJsonPath(path.join(result.paths.remote, remotePluginList[i]), "config"));
                let md5 = jsonFile.split(".")[1];
                json.bundleVers[remotePluginList[i]] = md5;
            }
            fs.writeFileSync(result.paths.settings, JSON.stringify(json));
        }
        // 拷贝插件的config文件到Plugins分包
        var files = fs.readdirSync(result.paths.remote);
        files.forEach(function (name) {
            let jsonFile = GetJsonPath(path.join(result.paths.remote, name), "config");
            let dir = path.join(result.paths.subpackages, "plugins", name);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
            fs.writeFileSync(path.join(dir, path.basename(jsonFile)), fs.readFileSync(jsonFile));
        });
        // 拷贝插件的AppConfig.json文件到Plugins分包
        var files = fs.readdirSync(result.paths.remote);
        files.forEach(function (name) {
            let jsonFile = GetJsonPath(path.join(result.paths.remote, name), "AppConfig");
            if (jsonFile) {
                let dir = path.join(result.paths.subpackages, "plugins", name);
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir);
                }
                fs.writeFileSync(path.join(dir, path.basename(jsonFile)), fs.readFileSync(jsonFile));
            }
        });
    });
}
function PostProcessApplicationJS(options, result) {
    return __awaiter(this, void 0, void 0, function* () {
        let str = fs.readFileSync(path.join(result.paths.dir, "application.js"), 'utf8');
        // 替换setting文件
        let settingName = path.basename(result.paths.settings);
        str = str.replace("settings.json", settingName);
        fs.writeFileSync(result.paths.applicationJS, str);
        // 删除文件
        fs.unlinkSync(path.join(result.paths.dir, "application.js"));
    });
}
function PostProcessGameJS(options, result) {
    return __awaiter(this, void 0, void 0, function* () {
        let str = fs.readFileSync(path.join(result.paths.dir, "game.js"), 'utf8');
        // 替换文件
        str = str.replace("import-map.js", path.basename(result.paths.importMap));
        str = str.replace("import-map.js", path.basename(result.paths.importMap));
        str = str.replace("polyfills.bundle.js", path.basename(result.paths.polyfillsJs));
        str = str.replace("system.bundle.js", path.basename(result.paths.systemJs));
        str = str.replace("application.js", path.basename(result.paths.applicationJS));
        fs.writeFileSync(path.join(result.paths.dir, "game.js"), str);
    });
}
const isObject = (val) => val !== null && typeof val === 'object';
exports.isObject = isObject;
function getConfigByKey(data, key) {
    for (let i = 0; i < data.length; i++) {
        if (data[i] == key) {
            return data[i + 1];
        }
        else {
            if ((0, exports.isObject)(data[i])) {
                let r = getConfigByKey(data[i], key);
                if (r) {
                    return r;
                }
            }
        }
    }
}
function mergeSlot(dst, src) {
    if (!src || !src.plugins) {
        return;
    }
    let n1 = 0;
    for (let i = 0; i < src.plugins.length; i++) {
        let exist = dst.plugins.some((x) => {
            if (x == src.plugins[i]) {
                return true;
            }
        });
        if (!exist) {
            let index = 0;
            let n2 = 0;
            for (let k = 0; k < dst.plugins.length; k++) {
                if (dst.plugins[k] == "-" || dst.plugins[k] == "_") {
                    if (n2 > n1) {
                        break;
                    }
                    n2++;
                    index = k;
                }
            }
            n1++;
            dst.plugins.splice(index, 0, src.plugins[i]);
        }
    }
    dst.plugins = dst.plugins.filter((x) => x != "-" && x != "_");
}
/**
 * 把后台配置合并到pluginConfig文件里
 * @param result
 * @param remotePluginList
 */
function PostProcessPluginConfig(result, remotePluginList) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if (!fs.existsSync(path.join(result.dest, "plug_config.ini"))) {
            return;
        }
        let assest = yield Editor.Message.request('asset-db', 'query-asset-info', "db://assets/resources/config/PluginConfig_h5.json");
        let info = result.getJsonPathInfo(assest["uuid"]);
        let data = JSON.parse(fs.readFileSync(info[0].json, 'utf8'));
        let config = getConfigByKey(data, "PluginConfig_h5");
        let remoteConfig = fs.readFileSync(path.join(result.dest, "plug_config.ini"), 'utf8').split("\n");
        let remoteSlotConfig = {};
        for (let i = 0; i < remoteConfig.length; i++) {
            if (remoteConfig[i] == "") {
                continue;
            }
            let slotName = remoteConfig[i].split(",")[0];
            let pluginName = remoteConfig[i].split(",")[1];
            let exist = config.plugins.some((x) => {
                if (x.name == pluginName) {
                    return true;
                }
            });
            if (!exist) {
                config.plugins.push({
                    name: pluginName
                });
            }
            if (slotName != "none") {
                remoteSlotConfig[slotName] = remoteSlotConfig[slotName] || { plugins: [] };
                remoteSlotConfig[slotName].plugins.push(pluginName);
            }
        }
        for (let slotName in remoteSlotConfig) {
            let localSlotPlugins = (_a = config["slots"][slotName]) === null || _a === void 0 ? void 0 : _a.plugins;
            if (localSlotPlugins) {
                mergeSlot(config["slots"][slotName], remoteSlotConfig[slotName]);
            }
            else {
                if (remoteSlotConfig[slotName]) {
                    config["slots"][slotName] = remoteSlotConfig[slotName];
                }
            }
        }
        fs.writeFileSync(info[0].json, JSON.stringify(data));
        // 删除后台文件
        fs.unlinkSync(path.join(result.dest, "plug_config.ini"));
    });
}
function PostProcessMiniGameEnd(options, result) {
    return __awaiter(this, void 0, void 0, function* () {
        rmdirSync(result.paths.bundleScripts);
        // 写入版本时间.
        let buildConfig = {};
        buildConfig.buildTime = new Date().toLocaleString();
        buildConfig.serverModeDesc = "serverMode : 1-内网测试 2-888 3-外网正式";
        // 判断是否覆盖服务器设置
        let data = options["packages"]["cocos-build-template"];
        if (data.serverMode != "0") {
            buildConfig.serverMode = parseInt(data.serverMode);
        }
        else {
            if (options.debug) {
                buildConfig.serverMode = 1;
            }
        }
        fs.writeFileSync(path.join(result.paths.dir, "build.json"), JSON.stringify(buildConfig, null, 4));
    });
}
function queryAssetMetaLocalFile(uuid) {
    return __awaiter(this, void 0, void 0, function* () {
        let assetPath = yield utils_1.AssetDB.queryAssetPath(uuid);
        if (!assetPath) {
            return null;
        }
        let basename = path.basename(assetPath).split("@")[0];
        let dir = path.dirname(assetPath);
        let uuidFilePath = path.join(dir, basename + ".meta");
        if (!fs.existsSync(uuidFilePath)) {
            return null;
        }
        let content = fs.readFileSync(uuidFilePath, 'utf8');
        return JSON.parse(content);
    });
}
//换肤处理
function PostProcessSkin(options, result) {
    return __awaiter(this, void 0, void 0, function* () {
        let uuidPluginDic = {};
        let rootPath = result.paths.assets;
        if (isMinigame(options.platform)) {
            rootPath = result.paths.remote;
        }
        var files = fs.readdirSync(rootPath);
        files.forEach(function (name) {
            var filedir = path.join(rootPath, name);
            var stats = fs.statSync(filedir);
            var isDir = stats.isDirectory();
            if (isDir && name.endsWith("Plugin")) {
                let pluginName = name;
                let json = JSON.parse(fs.readFileSync(GetJsonPath(path.join(rootPath, name)), 'utf8'));
                for (let i = 0; i < json.uuids.length; i++) {
                    if (json.redirect.indexOf(json.uuids[i]) == -1) {
                        if (options.debug) {
                            uuidPluginDic[json.uuids[i]] = pluginName;
                        }
                        else {
                            uuidPluginDic[Editor.Utils.UUID.decompressUUID(json.uuids[i])] = pluginName;
                        }
                    }
                }
            }
        });
        let pluginSkinDic = {};
        for (let uuid in uuidPluginDic) {
            let pluginName = uuidPluginDic[uuid];
            if (!pluginName) {
                continue;
            }
            let meta = yield queryAssetMetaLocalFile(uuid);
            if (!meta) {
                continue;
            }
            let skinList = ["mj", "jd", "jf"];
            for (let k = 0; k < skinList.length; k++) {
                let skinUUID = meta.userData["skin" + skinList[k]];
                if (skinUUID) {
                    let uuidnew = uuid.split("@")[0];
                    pluginSkinDic[pluginName] = pluginSkinDic[pluginName] || {};
                    pluginSkinDic[pluginName][skinList[k]] = pluginSkinDic[pluginName][skinList[k]] || {};
                    pluginSkinDic[pluginName][skinList[k]][uuidnew] = skinUUID;
                }
            }
        }
        for (let pluginName in pluginSkinDic) {
            let jsonPath = GetJsonPath(path.join(rootPath, pluginName));
            let json = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
            json.skinList = {};
            let skinList = ["mj", "jd", "jf"];
            for (let i = 0; i < skinList.length; i++) {
                if (pluginSkinDic[pluginName][skinList[i]]) {
                    json.skinList[skinList[i]] = pluginSkinDic[pluginName][skinList[i]];
                }
            }
            if (options.debug) {
                fs.writeFileSync(jsonPath, JSON.stringify(json, null, 4));
            }
            else {
                fs.writeFileSync(jsonPath, JSON.stringify(json));
            }
        }
    });
}
function PostProcessMiniGamePlugin(options, result) {
    return __awaiter(this, void 0, void 0, function* () {
        // 移动脚本到remote文件夹，方便在没有插件的时候也能打包代码到工程里面
        var files = fs.readdirSync(result.paths.remote);
        files.forEach(function (name) {
            let jsFile = GetIndexJSPath(path.join(result.paths.bundleScripts, name));
            fs.renameSync(jsFile, path.join(result.paths.remote, name, "index.js"));
        });
    });
}
const onAfterBuild = function (options, result) {
    return __awaiter(this, void 0, void 0, function* () {
        // 遍历所有的插件，处理index.ts文件
        yield PostProcessPlugin(options, result);
        yield PostProcessSkin(options, result);
        if (isMinigame(options.platform)) {
            // 判断是否打包游戏
            let isGameBuild = fs.existsSync(path.join(Editor.Project.path, 'assets/resources/config/PluginConfig_h5.json'));
            if (isGameBuild) {
                console.log("build minigame game");
                // 打包bundle-scripts到“plugins”分包
                let remotePluginList = yield PostProcessPackSubpackage(options, result);
                // 插件地址写入到游戏配置里
                yield PostProcessMiniGameGameSetting(options, result, remotePluginList);
                if (options.debug) {
                    yield PostProcessMiniGamePrivateSetting(options, result);
                }
                yield PostProcessBundleVers(options, result, remotePluginList);
                yield PostProcessApplicationJS(options, result);
                yield PostProcessGameJS(options, result);
                yield PostProcessPluginConfig(result, remotePluginList);
                yield PostProcessMiniGameEnd(options, result);
            }
            else {
                console.log("build minigame plugin");
                // 打包插件或模板
                yield PostProcessMiniGamePlugin(options, result);
            }
        }
        yield PostProcessRemoveRes(options, result);
        // 编译模板下面JSC
        if (options.flags && options.flags["iosflag"] && !options.debug) {
            yield PostProcessJsc(options, result);
        }
        yield PostProcessSetting(result);
        if (!isMinigame(options.platform)) {
            if (!options.debug) {
                yield PngCompress(allAssets.slice(), result.paths.assets);
                // 如果是ios渠道并且开启了加密，则对所有图片加密
                if (options.flags && options.flags["iosflag"]) {
                    yield PostProcessImageEncrypt(result);
                }
            }
        }
    });
};
exports.onAfterBuild = onAfterBuild;
const unload = function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`[${PACKAGE_NAME}] Unload cocos plugin example in builder.`);
    });
};
exports.unload = unload;
