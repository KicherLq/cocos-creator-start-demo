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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mixin = exports.addon = exports.getPropertyDescriptor = exports.getFileMd5 = exports.writeJsonFile = exports.readJsonFile = exports.copyDirectory = exports.copyFile = exports.mapDirectory = exports.findAllFile = exports.findFile = exports.FindFileType = exports.AssetDB = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const crypto_1 = __importDefault(require("crypto"));
/**
 * 资源库函数
 */
class AssetDB {
    /**
     * 创建资源
     * @param source
     * @param target
     * @param option
     */
    static createAsset(target, content, option = {}) {
        return Editor.Message.send('asset-db', 'create-asset', target, content, option);
    }
    /** create-asset
     * 导入资源
     * @param source
     * @param target
     * @param option
     */
    static importAsset(source, target, option = {}) {
        return Editor.Message.send('asset-db', 'import-asset', source, target, option);
    }
    /**
     * 删除资源
     * @param target
     */
    static deleteAsset(target) {
        return Editor.Message.send('asset-db', 'delete-asset', target);
    }
    /**
     * 刷新资源
     * @param target
     */
    static refreshAsset(target) {
        return Editor.Message.send('asset-db', 'refresh-asset', target);
    }
    /**
     * 刷新资源
     * @param target
     */
    static reimportAsset(target) {
        return Editor.Message.send('asset-db', 'reimport-asset', target);
    }
    /**
     * 刷新资源
     * @param urlOrUUID
     */
    static queryAssetMeta(urlOrUUID) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield Editor.Message.request('asset-db', 'query-asset-meta', urlOrUUID));
        });
    }
    static queryAssetPath(urlOrUUID) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield Editor.Message.request('asset-db', 'query-path', urlOrUUID));
        });
    }
    static queryAssetInfo(urlOrUUID) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield Editor.Message.request('asset-db', 'query-asset-info', urlOrUUID));
        });
    }
}
exports.AssetDB = AssetDB;
/**
 * 查找文件类型
 */
var FindFileType;
(function (FindFileType) {
    FindFileType[FindFileType["FILE"] = 1] = "FILE";
    FindFileType[FindFileType["DIRECTORY"] = 2] = "DIRECTORY";
})(FindFileType = exports.FindFileType || (exports.FindFileType = {}));
/**
 * 在指定目录中查找文件
 * @param dir
 * @param filename
 */
function findFile(dir, filename, types = FindFileType.FILE | FindFileType.DIRECTORY) {
    for (let file of fs_1.default.readdirSync(dir)) {
        let npath = path_1.default.join(dir, file);
        let info = fs_1.default.statSync(npath);
        if ((file === filename || file.split(".")[0] == filename) && (info.isDirectory() ? types & FindFileType.DIRECTORY : types & FindFileType.FILE)) {
            return npath;
        }
        else if (info.isDirectory()) {
            let result = findFile(npath, filename, types);
            if (result) {
                return result;
            }
        }
    }
}
exports.findFile = findFile;
function findAllFile(findFileList, dir, filename, types = FindFileType.FILE | FindFileType.DIRECTORY) {
    for (let file of fs_1.default.readdirSync(dir)) {
        let npath = path_1.default.join(dir, file);
        let info = fs_1.default.statSync(npath);
        if (info.isDirectory()) {
            findAllFile(findFileList, npath, filename, types);
        }
        else {
            if ((file === filename || file.split(".")[0] == filename) && (info.isDirectory() ? types & FindFileType.DIRECTORY : types & FindFileType.FILE)) {
                findFileList.push(npath);
            }
        }
    }
}
exports.findAllFile = findAllFile;
/**
 * 遍历目录路径
 */
function mapDirectory(path_, callback) {
    if (!fs_1.default.existsSync(path_)) {
        return false;
    }
    for (let file of fs_1.default.readdirSync(path_)) {
        let npath = path_1.default.join(path_, file);
        let info = fs_1.default.statSync(npath);
        if (info.isDirectory()) {
            if (mapDirectory(npath, callback)) {
                return true;
            }
        }
        else {
            callback(npath, file);
        }
    }
}
exports.mapDirectory = mapDirectory;
/**
 * 复制文件
 * @param srcPath
 * @param destPath
 */
function copyFile(srcPath, destPath, callback) {
    let src = fs_1.default.readFileSync(srcPath, { encoding: 'utf-8' });
    if (callback) {
        src = callback(src);
    }
    fs_1.default.writeFileSync(destPath, src);
}
exports.copyFile = copyFile;
/**
 * 复制目录
 * @param src
 * @param dest
 */
function copyDirectory(srcPath, destPath) {
    if (fs_1.default.existsSync(srcPath)) {
        if (!fs_1.default.existsSync(destPath)) {
            fs_1.default.mkdirSync(destPath, { recursive: true });
        }
        for (let file of fs_1.default.readdirSync(srcPath)) {
            let spath = path_1.default.join(srcPath, file);
            let dpath = path_1.default.join(destPath, file);
            let info = fs_1.default.statSync(spath);
            if (info.isDirectory()) {
                copyDirectory(spath, dpath);
            }
            else {
                copyFile(spath, dpath);
            }
        }
    }
}
exports.copyDirectory = copyDirectory;
/**
 * 读取json文件
 *
 * @param file 文件路径
 */
function readJsonFile(file) {
    if (fs_1.default.existsSync(file)) {
        return JSON.parse(fs_1.default.readFileSync(file, 'utf-8'));
    }
}
exports.readJsonFile = readJsonFile;
/**
 * 写入json文件
 * @param file 文件路径
 * @param json 对象
 */
function writeJsonFile(file, json, ident = 0) {
    if (json) {
        fs_1.default.writeFileSync(file, JSON.stringify(json, null, ident));
    }
}
exports.writeJsonFile = writeJsonFile;
/**
 * 获得文件的MD5值
 * @param file
 */
function getFileMd5(file) {
    return crypto_1.default.createHash('md5').update(fs_1.default.readFileSync(file)).digest('hex');
}
exports.getFileMd5 = getFileMd5;
function getPropertyDescriptor(object, propertyName) {
    while (object) {
        const pd = Object.getOwnPropertyDescriptor(object, propertyName);
        if (pd) {
            return pd;
        }
        object = Object.getPrototypeOf(object);
    }
    return null;
}
exports.getPropertyDescriptor = getPropertyDescriptor;
function _copyprop(name, source, target) {
    const pd = getPropertyDescriptor(source, name);
    if (pd) {
        Object.defineProperty(target, name, pd);
    }
}
/**
 * Copy all properties not defined in object from arguments[1...n].
 * @param object Object to extend its properties.
 * @param sources Source object to copy properties from.
 * @return The result object.
 */
function addon(object, ...sources) {
    object = object || {};
    for (const source of sources) {
        if (source !== undefined) {
            if (typeof source !== 'object') {
                continue;
            }
            for (const name in source) {
                if (!(name in object)) {
                    _copyprop(name, source, object);
                }
            }
        }
    }
    return object;
}
exports.addon = addon;
/**
 * Copy all properties from arguments[1...n] to object.
 * @return The result object.
 */
function mixin(object, ...sources) {
    object = object || {};
    if (sources) {
        for (const source of sources) {
            if (source !== undefined) {
                if (typeof source !== 'object') {
                    continue;
                }
                for (const name in source) {
                    _copyprop(name, source, object);
                }
            }
        }
    }
    return object;
}
exports.mixin = mixin;
