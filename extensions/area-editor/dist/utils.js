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
exports.getGamePacks = exports.saveExtensionConfig = exports.getExtensionConfig = exports.deepCopy = exports.mixin = exports.addon = exports.getPropertyDescriptor = exports.getFileMd5 = exports.writeJsonFile = exports.readJsonFile = exports.copyDirectory = exports.copyFile = exports.mapDirectory = exports.findFile = exports.FindFileType = exports.AssetDB = exports.exeCommand = exports.EXTENSION_PATH = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const crypto_1 = __importDefault(require("crypto"));
const child_process_1 = require("child_process");
const extensiondata_1 = require("./extensiondata");
/**
 * 扩展路径
 */
exports.EXTENSION_PATH = path_1.default.join(__dirname, '..');
/**
 * 执行命令
 * @param command
 * @param cwd
 */
function exeCommand(command, cwd) {
    return new Promise((resolve) => {
        child_process_1.exec(command, { cwd: cwd }, (error, stdout, stderr) => {
            resolve({
                error: error,
                stdout: stdout,
                stderr: stderr
            });
        });
    });
}
exports.exeCommand = exeCommand;
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
     * @param urlOrUUID
     */
    static queryAssetMeta(urlOrUUID) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield Editor.Message.request('asset-db', 'query-asset-meta', urlOrUUID));
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
        if (file === filename && (info.isDirectory() ? types & FindFileType.DIRECTORY : types & FindFileType.FILE)) {
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
        if (callback(npath, file, info.isDirectory())) {
            return true;
        }
        else if (info.isDirectory()) {
            if (mapDirectory(npath, callback)) {
                return true;
            }
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
function deepCopy(obj) {
    if (obj && typeof obj == 'object') {
        let objClone = Array.isArray(obj) ? [] : {};
        for (const key in obj) {
            //判断obj子元素是否为对象，如果是，递归复制
            if (obj[key] && typeof obj[key] === "object") {
                objClone[key] = this.deepCopy(obj[key]);
            }
            else {
                //如果不是，简单复制
                objClone[key] = obj[key];
            }
        }
        return objClone;
    }
    return obj;
}
exports.deepCopy = deepCopy;
/**
 * 获得扩展配置
 */
const extFile = path_1.default.join(Editor.Project.path, 'assets', "resources", "config", "ExtensionConfig.json");
const extFileInGame = path_1.default.join(Editor.Project.path, 'assets', "game", "config", "ExtensionConfig.json");
let extensionConfig = new extensiondata_1.ExtensionData;
let extensionConfigLoaded = false;
function getExtensionConfig() {
    if (!extensionConfigLoaded) {
        extensionConfigLoaded = true;
        if (fs_1.default.existsSync(extFile)) {
            extensionConfig = JSON.parse(fs_1.default.readFileSync(extFile, { encoding: 'utf-8' }));
            extensionConfig.game = mixin(new extensiondata_1.GameExtensionData, extensionConfig.game);
            extensionConfig.personalInfo = mixin(new extensiondata_1.PersonalInfoExtData, extensionConfig.personalInfo);
            extensionConfig.resouce = mixin(new extensiondata_1.ResourceExtensionData, extensionConfig.resouce);
            extensionConfig.chat = mixin(new extensiondata_1.ChatExtensionData, extensionConfig.chat);
            for (let i = 0; i < extensionConfig.hall.length; i++) {
                extensionConfig.hall[i].setting = mixin(new extensiondata_1.HallSettingData, extensionConfig.hall[i].setting);
                for (let k = 0; k < extensionConfig.hall[i].slots.length; k++) {
                    let slot = extensionConfig.hall[i].slots[k];
                    switch (slot.slotType) {
                        case extensiondata_1.SlotType.Area:
                            extensionConfig.hall[i].slots[k] = mixin(new extensiondata_1.HallAreaSlotProp, extensionConfig.hall[i].slots[k]);
                            break;
                        case extensiondata_1.SlotType.Room:
                            extensionConfig.hall[i].slots[k] = mixin(new extensiondata_1.HallRoomSlotProp, extensionConfig.hall[i].slots[k]);
                            break;
                        case extensiondata_1.SlotType.Custom:
                            extensionConfig.hall[i].slots[k] = mixin(new extensiondata_1.HallCustomSlotProp, extensionConfig.hall[i].slots[k]);
                            break;
                        case extensiondata_1.SlotType.Moregame:
                            extensionConfig.hall[i].slots[k] = mixin(new extensiondata_1.HallMoregameSlotProp, extensionConfig.hall[i].slots[k]);
                            break;
                        case extensiondata_1.SlotType.Game:
                            extensionConfig.hall[i].slots[k] = mixin(new extensiondata_1.HallGameSlotProp, extensionConfig.hall[i].slots[k]);
                            break;
                    }
                }
            }
            if (extensionConfig.rules) {
                for (let i = 0; i < extensionConfig.rules.length; i++) {
                    extensionConfig.rules[i] = mixin(new extensiondata_1.RuleExtensionData, extensionConfig.rules[i]);
                }
            }
            else {
                extensionConfig.rules = [new extensiondata_1.RuleExtensionData, new extensiondata_1.RuleExtensionData, new extensiondata_1.RuleExtensionData, new extensiondata_1.RuleExtensionData, new extensiondata_1.RuleExtensionData, new extensiondata_1.RuleExtensionData];
            }
        }
    }
    return extensionConfig;
}
exports.getExtensionConfig = getExtensionConfig;
function saveExtensionConfig() {
    writeJsonFile(extFile, extensionConfig, 4);
    writeJsonFile(extFileInGame, extensionConfig, 4);
}
exports.saveExtensionConfig = saveExtensionConfig;
/**
 * 获得所有游戏包
 */
function getGamePacks(findPath) {
    let packs = {};
    let _collectGamePacks;
    _collectGamePacks = (path_) => {
        for (let f of fs_1.default.readdirSync(path_)) {
            let fpath = path_1.default.join(path_, f);
            let fstate = fs_1.default.statSync(fpath);
            if (fstate.isDirectory()) {
                let metafile = fpath + '.meta';
                if (fs_1.default.existsSync(metafile)) {
                    let meta = JSON.parse(fs_1.default.readFileSync(metafile, { encoding: 'utf-8' }));
                    if (meta === null || meta === void 0 ? void 0 : meta.userData.isBundle) {
                        let name = meta.userData.bundleName || f;
                        if (name != "resources")
                            packs[name] = path_1.default.normalize(fpath);
                        continue;
                    }
                }
                _collectGamePacks(fpath);
            }
        }
    };
    _collectGamePacks(path_1.default.join(findPath, 'assets'));
    _collectGamePacks(path_1.default.join(findPath, 'extensions/asset-plugins'));
    return packs;
}
exports.getGamePacks = getGamePacks;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUVBLDRDQUFvQjtBQUNwQixnREFBd0I7QUFDeEIsb0RBQTRCO0FBQzVCLGlEQUFxQztBQUNyQyxtREFBZ1I7QUFFaFI7O0dBRUc7QUFDVSxRQUFBLGNBQWMsR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUV6RDs7OztHQUlHO0FBQ0gsU0FBZ0IsVUFBVSxDQUFDLE9BQWUsRUFBRSxHQUFXO0lBQ25ELE9BQU8sSUFBSSxPQUFPLENBQW9ELENBQUMsT0FBTyxFQUFFLEVBQUU7UUFDOUUsb0JBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ2xELE9BQU8sQ0FBQztnQkFDSixLQUFLLEVBQUUsS0FBSztnQkFDWixNQUFNLEVBQUUsTUFBTTtnQkFDZCxNQUFNLEVBQUUsTUFBTTthQUNqQixDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQVZELGdDQVVDO0FBRUQ7O0dBRUc7QUFDSCxNQUFhLE9BQU87SUFDaEI7Ozs7O09BS0c7SUFDSCxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQWMsRUFBRSxPQUFlLEVBQUUsU0FBb0QsRUFBRTtRQUN0RyxPQUFPLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNwRixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQWMsRUFBRSxNQUFjLEVBQUUsU0FBb0QsRUFBRTtRQUNyRyxPQUFPLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNuRixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFjO1FBQzdCLE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLGNBQWMsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFjO1FBQzlCLE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLGVBQWUsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsTUFBTSxDQUFPLGNBQWMsQ0FBQyxTQUFpQjs7WUFDekMsT0FBTyxDQUFDLE1BQU0sTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLGtCQUFrQixFQUFFLFNBQVMsQ0FBQyxDQUFlLENBQUM7UUFDbkcsQ0FBQztLQUFBO0NBQ0o7QUE1Q0QsMEJBNENDO0FBRUQ7O0dBRUc7QUFDSCxJQUFZLFlBR1g7QUFIRCxXQUFZLFlBQVk7SUFDcEIsK0NBQVEsQ0FBQTtJQUNSLHlEQUFhLENBQUE7QUFDakIsQ0FBQyxFQUhXLFlBQVksR0FBWixvQkFBWSxLQUFaLG9CQUFZLFFBR3ZCO0FBRUQ7Ozs7R0FJRztBQUNILFNBQWdCLFFBQVEsQ0FBQyxHQUFXLEVBQUUsUUFBZ0IsRUFBRSxRQUFnQixZQUFZLENBQUMsSUFBSSxHQUFHLFlBQVksQ0FBQyxTQUFTO0lBQzlHLEtBQUssSUFBSSxJQUFJLElBQUksWUFBRSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUNsQyxJQUFJLEtBQUssR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNqQyxJQUFJLElBQUksR0FBRyxZQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlCLElBQUksSUFBSSxLQUFLLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDeEcsT0FBTyxLQUFLLENBQUM7U0FDaEI7YUFBTSxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRTtZQUMzQixJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUM5QyxJQUFJLE1BQU0sRUFBRTtnQkFDUixPQUFPLE1BQU0sQ0FBQzthQUNqQjtTQUNKO0tBQ0o7QUFDTCxDQUFDO0FBYkQsNEJBYUM7QUFFRDs7R0FFRztBQUNILFNBQWdCLFlBQVksQ0FBQyxLQUFhLEVBQUUsUUFBaUU7SUFDekcsSUFBSSxDQUFDLFlBQUUsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDdkIsT0FBTyxLQUFLLENBQUE7S0FDZjtJQUVELEtBQUssSUFBSSxJQUFJLElBQUksWUFBRSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUNwQyxJQUFJLEtBQUssR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNuQyxJQUFJLElBQUksR0FBRyxZQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlCLElBQUksUUFBUSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLEVBQUU7WUFDM0MsT0FBTyxJQUFJLENBQUM7U0FDZjthQUFNLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFO1lBQzNCLElBQUksWUFBWSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsRUFBRTtnQkFDL0IsT0FBTyxJQUFJLENBQUM7YUFDZjtTQUNKO0tBQ0o7QUFDTCxDQUFDO0FBaEJELG9DQWdCQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFnQixRQUFRLENBQUMsT0FBZSxFQUFFLFFBQWdCLEVBQUMsUUFBb0I7SUFDM0UsSUFBSSxHQUFHLEdBQVksWUFBRSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUMsRUFBQyxRQUFRLEVBQUcsT0FBTyxFQUFDLENBQUMsQ0FBQTtJQUVoRSxJQUFJLFFBQVEsRUFBRTtRQUNWLEdBQUcsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUE7S0FDdEI7SUFFRCxZQUFFLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNwQyxDQUFDO0FBUkQsNEJBUUM7QUFFRDs7OztHQUlHO0FBQ0gsU0FBZ0IsYUFBYSxDQUFDLE9BQWUsRUFBRSxRQUFnQjtJQUMzRCxJQUFJLFlBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDeEIsSUFBSSxDQUFDLFlBQUUsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDMUIsWUFBRSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztTQUMvQztRQUNELEtBQUssSUFBSSxJQUFJLElBQUksWUFBRSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUN0QyxJQUFJLEtBQUssR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNyQyxJQUFJLEtBQUssR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN0QyxJQUFJLElBQUksR0FBRyxZQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzlCLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFO2dCQUNwQixhQUFhLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQy9CO2lCQUFNO2dCQUNILFFBQVEsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDMUI7U0FDSjtLQUNKO0FBQ0wsQ0FBQztBQWhCRCxzQ0FnQkM7QUFFRDs7OztHQUlHO0FBQ0gsU0FBZ0IsWUFBWSxDQUFDLElBQVk7SUFDckMsSUFBSSxZQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFFLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0tBQ3JEO0FBQ0wsQ0FBQztBQUpELG9DQUlDO0FBRUQ7Ozs7R0FJRztBQUNILFNBQWdCLGFBQWEsQ0FBQyxJQUFZLEVBQUUsSUFBUyxFQUFFLEtBQUssR0FBRyxDQUFDO0lBQzVELElBQUksSUFBSSxFQUFFO1FBQ04sWUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7S0FDN0Q7QUFDTCxDQUFDO0FBSkQsc0NBSUM7QUFFRDs7O0dBR0c7QUFDSCxTQUFnQixVQUFVLENBQUMsSUFBWTtJQUNuQyxPQUFPLGdCQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxZQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2hGLENBQUM7QUFGRCxnQ0FFQztBQUVELFNBQWdCLHFCQUFxQixDQUFFLE1BQVcsRUFBRSxZQUFvQjtJQUNwRSxPQUFPLE1BQU0sRUFBRTtRQUNYLE1BQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxNQUFNLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDakUsSUFBSSxFQUFFLEVBQUU7WUFDSixPQUFPLEVBQUUsQ0FBQztTQUNiO1FBQ0QsTUFBTSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDMUM7SUFDRCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBVEQsc0RBU0M7QUFFRCxTQUFTLFNBQVMsQ0FBRSxJQUFZLEVBQUUsTUFBVyxFQUFFLE1BQVc7SUFDdEQsTUFBTSxFQUFFLEdBQUcscUJBQXFCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQy9DLElBQUksRUFBRSxFQUFFO1FBQ0osTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQzNDO0FBQ0wsQ0FBQztBQUVEOzs7OztHQUtHO0FBQ0YsU0FBZ0IsS0FBSyxDQUFFLE1BQVksRUFBRSxHQUFHLE9BQWM7SUFDbkQsTUFBTSxHQUFHLE1BQU0sSUFBSSxFQUFFLENBQUM7SUFDdEIsS0FBSyxNQUFNLE1BQU0sSUFBSSxPQUFPLEVBQUU7UUFDMUIsSUFBSSxNQUFNLEtBQUssU0FBUyxFQUFFO1lBQ3RCLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxFQUFFO2dCQUM1QixTQUFTO2FBQ1o7WUFDRCxLQUFLLE1BQU0sSUFBSSxJQUFJLE1BQU0sRUFBRTtnQkFDdkIsSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLE1BQU0sQ0FBQyxFQUFFO29CQUNuQixTQUFTLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztpQkFDbkM7YUFDSjtTQUNKO0tBQ0o7SUFDRCxPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDO0FBZkEsc0JBZUE7QUFFRDs7O0dBR0c7QUFDSCxTQUFnQixLQUFLLENBQUUsTUFBWSxFQUFFLEdBQUcsT0FBYztJQUNsRCxNQUFNLEdBQUcsTUFBTSxJQUFJLEVBQUUsQ0FBQztJQUV0QixJQUFJLE9BQU8sRUFBRTtRQUNULEtBQUssTUFBTSxNQUFNLElBQUksT0FBTyxFQUFFO1lBQzFCLElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTtnQkFDdEIsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUU7b0JBQzVCLFNBQVM7aUJBQ1o7Z0JBQ0QsS0FBSyxNQUFNLElBQUksSUFBSSxNQUFNLEVBQUU7b0JBQ3ZCLFNBQVMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2lCQUNuQzthQUNKO1NBQ0o7S0FDSjtJQUVELE9BQU8sTUFBTSxDQUFDO0FBQ2xCLENBQUM7QUFqQkQsc0JBaUJDO0FBRUQsU0FBZ0IsUUFBUSxDQUFDLEdBQUc7SUFDeEIsSUFBSSxHQUFHLElBQUksT0FBTyxHQUFHLElBQUksUUFBUSxFQUFFO1FBQy9CLElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBRTVDLEtBQUssTUFBTSxHQUFHLElBQUksR0FBRyxFQUFFO1lBQ25CLHdCQUF3QjtZQUN4QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxRQUFRLEVBQUU7Z0JBQzFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQzNDO2lCQUFNO2dCQUNILFdBQVc7Z0JBQ1gsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUM1QjtTQUNKO1FBRUQsT0FBTyxRQUFRLENBQUE7S0FDbEI7SUFFRCxPQUFPLEdBQUcsQ0FBQTtBQUNkLENBQUM7QUFsQkQsNEJBa0JDO0FBRUQ7O0dBRUc7QUFDSCxNQUFNLE9BQU8sR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQyxXQUFXLEVBQUMsUUFBUSxFQUFDLHNCQUFzQixDQUFDLENBQUE7QUFDcEcsTUFBTSxhQUFhLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxzQkFBc0IsQ0FBQyxDQUFBO0FBRXJHLElBQUksZUFBZSxHQUFtQixJQUFJLDZCQUFhLENBQUM7QUFDeEQsSUFBSSxxQkFBcUIsR0FBRyxLQUFLLENBQUE7QUFFakMsU0FBZ0Isa0JBQWtCO0lBQzlCLElBQUksQ0FBQyxxQkFBcUIsRUFBRTtRQUN4QixxQkFBcUIsR0FBRyxJQUFJLENBQUE7UUFFNUIsSUFBSSxZQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3hCLGVBQWUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQUUsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM5RSxlQUFlLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLGlDQUFpQixFQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUN4RSxlQUFlLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQyxJQUFJLG1DQUFtQixFQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsQ0FBQTtZQUMxRixlQUFlLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxJQUFJLHFDQUFxQixFQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUNsRixlQUFlLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLGlDQUFpQixFQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUV4RSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2xELGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxJQUFJLCtCQUFlLEVBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtnQkFFNUYsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDM0QsSUFBSSxJQUFJLEdBQUcsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7b0JBRTNDLFFBQU8sSUFBSSxDQUFDLFFBQVEsRUFBRTt3QkFDbEIsS0FBSyx3QkFBUSxDQUFDLElBQUk7NEJBQ2QsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksZ0NBQWdCLEVBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTs0QkFDL0YsTUFBSzt3QkFDVCxLQUFLLHdCQUFRLENBQUMsSUFBSTs0QkFDZCxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxnQ0FBZ0IsRUFBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBOzRCQUMvRixNQUFLO3dCQUNULEtBQUssd0JBQVEsQ0FBQyxNQUFNOzRCQUNoQixlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxrQ0FBa0IsRUFBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBOzRCQUNqRyxNQUFLO3dCQUNULEtBQUssd0JBQVEsQ0FBQyxRQUFROzRCQUNsQixlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxvQ0FBb0IsRUFBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBOzRCQUNuRyxNQUFLO3dCQUNULEtBQUssd0JBQVEsQ0FBQyxJQUFJOzRCQUNkLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLGdDQUFnQixFQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7NEJBQy9GLE1BQUs7cUJBQ1o7aUJBQ0o7YUFDSjtZQUVELElBQUksZUFBZSxDQUFDLEtBQUssRUFBRTtnQkFDdkIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGVBQWUsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUNuRCxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLGlDQUFpQixFQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtpQkFDbkY7YUFDSjtpQkFBTTtnQkFDSCxlQUFlLENBQUMsS0FBSyxHQUFFLENBQUMsSUFBSSxpQ0FBaUIsRUFBQyxJQUFJLGlDQUFpQixFQUFDLElBQUksaUNBQWlCLEVBQUMsSUFBSSxpQ0FBaUIsRUFBQyxJQUFJLGlDQUFpQixFQUFDLElBQUksaUNBQWlCLENBQUMsQ0FBQTthQUMvSjtTQUNKO0tBQ0o7SUFFRCxPQUFPLGVBQWUsQ0FBQztBQUMzQixDQUFDO0FBaERELGdEQWdEQztBQUVELFNBQWdCLG1CQUFtQjtJQUMvQixhQUFhLENBQUMsT0FBTyxFQUFDLGVBQWUsRUFBQyxDQUFDLENBQUMsQ0FBQTtJQUN4QyxhQUFhLENBQUMsYUFBYSxFQUFDLGVBQWUsRUFBQyxDQUFDLENBQUMsQ0FBQTtBQUNsRCxDQUFDO0FBSEQsa0RBR0M7QUFFRDs7R0FFRztBQUNILFNBQWdCLFlBQVksQ0FBQyxRQUFRO0lBQ2pDLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQztJQUNmLElBQUksaUJBQWlCLENBQUM7SUFDdEIsaUJBQWlCLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtRQUNsQyxLQUFLLElBQUksQ0FBQyxJQUFJLFlBQUUsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDakMsSUFBSSxLQUFLLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDaEMsSUFBSSxNQUFNLEdBQUcsWUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNoQyxJQUFJLE1BQU0sQ0FBQyxXQUFXLEVBQUUsRUFBRTtnQkFDdEIsSUFBSSxRQUFRLEdBQUcsS0FBSyxHQUFHLE9BQU8sQ0FBQztnQkFDL0IsSUFBSSxZQUFFLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO29CQUN6QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQUUsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDeEUsSUFBSSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsUUFBUSxDQUFDLFFBQVEsRUFBRTt3QkFDekIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLElBQUksQ0FBQyxDQUFBO3dCQUN4QyxJQUFJLElBQUksSUFBSSxXQUFXOzRCQUNuQixLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsY0FBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDeEMsU0FBUztxQkFDWjtpQkFDSjtnQkFDRCxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUM1QjtTQUNKO0lBQ0wsQ0FBQyxDQUFDO0lBRUYsaUJBQWlCLENBQUMsY0FBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUNqRCxpQkFBaUIsQ0FBQyxjQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSwwQkFBMEIsQ0FBQyxDQUFDLENBQUM7SUFDbkUsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQztBQTFCRCxvQ0EwQkMiLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQXNzZXRNZXRhIH0gZnJvbSAnLi4vQHR5cGVzL3BhY2thZ2VzL2Fzc2V0LWRiL0B0eXBlcy9wdWJsaWMnO1xuXG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgY3J5cHRvIGZyb20gJ2NyeXB0byc7XG5pbXBvcnQgeyBleGVjIH0gZnJvbSAnY2hpbGRfcHJvY2Vzcyc7XG5pbXBvcnQgeyBDaGF0RXh0ZW5zaW9uRGF0YSwgRXh0ZW5zaW9uRGF0YSwgR2FtZUV4dGVuc2lvbkRhdGEsIEhhbGxBcmVhU2xvdFByb3AsIEhhbGxDdXN0b21TbG90UHJvcCwgSGFsbEdhbWVTbG90UHJvcCwgSGFsbE1vcmVnYW1lU2xvdFByb3AsIEhhbGxSb29tU2xvdFByb3AsIEhhbGxTZXR0aW5nRGF0YSwgUGVyc29uYWxJbmZvRXh0RGF0YSwgUmVzb3VyY2VFeHRlbnNpb25EYXRhLCBSdWxlRXh0ZW5zaW9uRGF0YSwgU2xvdFR5cGUgfSBmcm9tICcuL2V4dGVuc2lvbmRhdGEnO1xuXG4vKipcbiAqIOaJqeWxlei3r+W+hFxuICovXG5leHBvcnQgY29uc3QgRVhURU5TSU9OX1BBVEggPSBwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi4nKTtcblxuLyoqXG4gKiDmiafooYzlkb3ku6RcbiAqIEBwYXJhbSBjb21tYW5kXG4gKiBAcGFyYW0gY3dkXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBleGVDb21tYW5kKGNvbW1hbmQ6IHN0cmluZywgY3dkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8eyBlcnJvcj86IGFueTsgc3Rkb3V0Pzogc3RyaW5nOyBzdGRlcnI/OiBzdHJpbmcgfT4oKHJlc29sdmUpID0+IHtcbiAgICAgICAgZXhlYyhjb21tYW5kLCB7IGN3ZDogY3dkIH0sIChlcnJvciwgc3Rkb3V0LCBzdGRlcnIpID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUoe1xuICAgICAgICAgICAgICAgIGVycm9yOiBlcnJvcixcbiAgICAgICAgICAgICAgICBzdGRvdXQ6IHN0ZG91dCxcbiAgICAgICAgICAgICAgICBzdGRlcnI6IHN0ZGVyclxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuXG4vKipcbiAqIOi1hOa6kOW6k+WHveaVsFxuICovXG5leHBvcnQgY2xhc3MgQXNzZXREQiB7XG4gICAgLyoqXG4gICAgICog5Yib5bu66LWE5rqQXG4gICAgICogQHBhcmFtIHNvdXJjZVxuICAgICAqIEBwYXJhbSB0YXJnZXRcbiAgICAgKiBAcGFyYW0gb3B0aW9uXG4gICAgICovXG4gICAgc3RhdGljIGNyZWF0ZUFzc2V0KHRhcmdldDogc3RyaW5nLCBjb250ZW50OiBzdHJpbmcsIG9wdGlvbjogeyBvdmVyd3JpdGU/OiBib29sZWFuOyByZW5hbWU/OiBib29sZWFuIH0gPSB7fSkge1xuICAgICAgICByZXR1cm4gRWRpdG9yLk1lc3NhZ2Uuc2VuZCgnYXNzZXQtZGInLCAnY3JlYXRlLWFzc2V0JywgdGFyZ2V0LCBjb250ZW50LCBvcHRpb24pO1xuICAgIH1cblxuICAgIC8qKiBjcmVhdGUtYXNzZXRcbiAgICAgKiDlr7zlhaXotYTmupBcbiAgICAgKiBAcGFyYW0gc291cmNlXG4gICAgICogQHBhcmFtIHRhcmdldFxuICAgICAqIEBwYXJhbSBvcHRpb25cbiAgICAgKi9cbiAgICBzdGF0aWMgaW1wb3J0QXNzZXQoc291cmNlOiBzdHJpbmcsIHRhcmdldDogc3RyaW5nLCBvcHRpb246IHsgb3ZlcndyaXRlPzogYm9vbGVhbjsgcmVuYW1lPzogYm9vbGVhbiB9ID0ge30pIHtcbiAgICAgICAgcmV0dXJuIEVkaXRvci5NZXNzYWdlLnNlbmQoJ2Fzc2V0LWRiJywgJ2ltcG9ydC1hc3NldCcsIHNvdXJjZSwgdGFyZ2V0LCBvcHRpb24pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWIoOmZpOi1hOa6kFxuICAgICAqIEBwYXJhbSB0YXJnZXRcbiAgICAgKi9cbiAgICBzdGF0aWMgZGVsZXRlQXNzZXQodGFyZ2V0OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIEVkaXRvci5NZXNzYWdlLnNlbmQoJ2Fzc2V0LWRiJywgJ2RlbGV0ZS1hc3NldCcsIHRhcmdldCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Yi35paw6LWE5rqQXG4gICAgICogQHBhcmFtIHRhcmdldFxuICAgICAqL1xuICAgIHN0YXRpYyByZWZyZXNoQXNzZXQodGFyZ2V0OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIEVkaXRvci5NZXNzYWdlLnNlbmQoJ2Fzc2V0LWRiJywgJ3JlZnJlc2gtYXNzZXQnLCB0YXJnZXQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWIt+aWsOi1hOa6kFxuICAgICAqIEBwYXJhbSB1cmxPclVVSURcbiAgICAgKi9cbiAgICBzdGF0aWMgYXN5bmMgcXVlcnlBc3NldE1ldGEodXJsT3JVVUlEOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIChhd2FpdCBFZGl0b3IuTWVzc2FnZS5yZXF1ZXN0KCdhc3NldC1kYicsICdxdWVyeS1hc3NldC1tZXRhJywgdXJsT3JVVUlEKSkgYXMgSUFzc2V0TWV0YTtcbiAgICB9XG59XG5cbi8qKlxuICog5p+l5om+5paH5Lu257G75Z6LXG4gKi9cbmV4cG9ydCBlbnVtIEZpbmRGaWxlVHlwZSB7XG4gICAgRklMRSA9IDEsXG4gICAgRElSRUNUT1JZID0gMlxufVxuXG4vKipcbiAqIOWcqOaMh+WumuebruW9leS4reafpeaJvuaWh+S7tlxuICogQHBhcmFtIGRpclxuICogQHBhcmFtIGZpbGVuYW1lXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmaW5kRmlsZShkaXI6IHN0cmluZywgZmlsZW5hbWU6IHN0cmluZywgdHlwZXM6IG51bWJlciA9IEZpbmRGaWxlVHlwZS5GSUxFIHwgRmluZEZpbGVUeXBlLkRJUkVDVE9SWSkge1xuICAgIGZvciAobGV0IGZpbGUgb2YgZnMucmVhZGRpclN5bmMoZGlyKSkge1xuICAgICAgICBsZXQgbnBhdGggPSBwYXRoLmpvaW4oZGlyLCBmaWxlKTtcbiAgICAgICAgbGV0IGluZm8gPSBmcy5zdGF0U3luYyhucGF0aCk7XG4gICAgICAgIGlmIChmaWxlID09PSBmaWxlbmFtZSAmJiAoaW5mby5pc0RpcmVjdG9yeSgpID8gdHlwZXMgJiBGaW5kRmlsZVR5cGUuRElSRUNUT1JZIDogdHlwZXMgJiBGaW5kRmlsZVR5cGUuRklMRSkpIHtcbiAgICAgICAgICAgIHJldHVybiBucGF0aDtcbiAgICAgICAgfSBlbHNlIGlmIChpbmZvLmlzRGlyZWN0b3J5KCkpIHtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBmaW5kRmlsZShucGF0aCwgZmlsZW5hbWUsIHR5cGVzKTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqIOmBjeWOhuebruW9lei3r+W+hFxuICovXG5leHBvcnQgZnVuY3Rpb24gbWFwRGlyZWN0b3J5KHBhdGhfOiBzdHJpbmcsIGNhbGxiYWNrOiAocGF0aDogc3RyaW5nLCBmaWxlOiBzdHJpbmcsIGlzZGlyOiBib29sZWFuKSA9PiBib29sZWFuKSB7XG4gICAgaWYgKCFmcy5leGlzdHNTeW5jKHBhdGhfKSkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBmb3IgKGxldCBmaWxlIG9mIGZzLnJlYWRkaXJTeW5jKHBhdGhfKSkge1xuICAgICAgICBsZXQgbnBhdGggPSBwYXRoLmpvaW4ocGF0aF8sIGZpbGUpO1xuICAgICAgICBsZXQgaW5mbyA9IGZzLnN0YXRTeW5jKG5wYXRoKTtcbiAgICAgICAgaWYgKGNhbGxiYWNrKG5wYXRoLCBmaWxlLCBpbmZvLmlzRGlyZWN0b3J5KCkpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmIChpbmZvLmlzRGlyZWN0b3J5KCkpIHtcbiAgICAgICAgICAgIGlmIChtYXBEaXJlY3RvcnkobnBhdGgsIGNhbGxiYWNrKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqIOWkjeWItuaWh+S7tlxuICogQHBhcmFtIHNyY1BhdGhcbiAqIEBwYXJhbSBkZXN0UGF0aFxuICovXG5leHBvcnQgZnVuY3Rpb24gY29weUZpbGUoc3JjUGF0aDogc3RyaW5nLCBkZXN0UGF0aDogc3RyaW5nLGNhbGxiYWNrPyA6IEZ1bmN0aW9uKSB7XG4gICAgbGV0IHNyYyA6IHN0cmluZyA9IGZzLnJlYWRGaWxlU3luYyhzcmNQYXRoLHtlbmNvZGluZyA6ICd1dGYtOCd9KVxuXG4gICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgIHNyYyA9IGNhbGxiYWNrKHNyYylcbiAgICB9XG4gICAgXG4gICAgZnMud3JpdGVGaWxlU3luYyhkZXN0UGF0aCwgc3JjKTtcbn1cblxuLyoqXG4gKiDlpI3liLbnm67lvZVcbiAqIEBwYXJhbSBzcmNcbiAqIEBwYXJhbSBkZXN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb3B5RGlyZWN0b3J5KHNyY1BhdGg6IHN0cmluZywgZGVzdFBhdGg6IHN0cmluZykge1xuICAgIGlmIChmcy5leGlzdHNTeW5jKHNyY1BhdGgpKSB7XG4gICAgICAgIGlmICghZnMuZXhpc3RzU3luYyhkZXN0UGF0aCkpIHtcbiAgICAgICAgICAgIGZzLm1rZGlyU3luYyhkZXN0UGF0aCwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgZmlsZSBvZiBmcy5yZWFkZGlyU3luYyhzcmNQYXRoKSkge1xuICAgICAgICAgICAgbGV0IHNwYXRoID0gcGF0aC5qb2luKHNyY1BhdGgsIGZpbGUpO1xuICAgICAgICAgICAgbGV0IGRwYXRoID0gcGF0aC5qb2luKGRlc3RQYXRoLCBmaWxlKTtcbiAgICAgICAgICAgIGxldCBpbmZvID0gZnMuc3RhdFN5bmMoc3BhdGgpO1xuICAgICAgICAgICAgaWYgKGluZm8uaXNEaXJlY3RvcnkoKSkge1xuICAgICAgICAgICAgICAgIGNvcHlEaXJlY3Rvcnkoc3BhdGgsIGRwYXRoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29weUZpbGUoc3BhdGgsIGRwYXRoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiDor7vlj5Zqc29u5paH5Lu2XG4gKlxuICogQHBhcmFtIGZpbGUg5paH5Lu26Lev5b6EXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZWFkSnNvbkZpbGUoZmlsZTogc3RyaW5nKSB7XG4gICAgaWYgKGZzLmV4aXN0c1N5bmMoZmlsZSkpIHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKGZpbGUsICd1dGYtOCcpKTtcbiAgICB9XG59XG5cbi8qKlxuICog5YaZ5YWlanNvbuaWh+S7tlxuICogQHBhcmFtIGZpbGUg5paH5Lu26Lev5b6EXG4gKiBAcGFyYW0ganNvbiDlr7nosaFcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHdyaXRlSnNvbkZpbGUoZmlsZTogc3RyaW5nLCBqc29uOiBhbnksIGlkZW50ID0gMCkge1xuICAgIGlmIChqc29uKSB7XG4gICAgICAgIGZzLndyaXRlRmlsZVN5bmMoZmlsZSwgSlNPTi5zdHJpbmdpZnkoanNvbiwgbnVsbCwgaWRlbnQpKTtcbiAgICB9XG59XG5cbi8qKlxuICog6I635b6X5paH5Lu255qETUQ15YC8XG4gKiBAcGFyYW0gZmlsZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RmlsZU1kNShmaWxlOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gY3J5cHRvLmNyZWF0ZUhhc2goJ21kNScpLnVwZGF0ZShmcy5yZWFkRmlsZVN5bmMoZmlsZSkpLmRpZ2VzdCgnaGV4Jyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQcm9wZXJ0eURlc2NyaXB0b3IgKG9iamVjdDogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZykge1xuICAgIHdoaWxlIChvYmplY3QpIHtcbiAgICAgICAgY29uc3QgcGQgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgcHJvcGVydHlOYW1lKTtcbiAgICAgICAgaWYgKHBkKSB7XG4gICAgICAgICAgICByZXR1cm4gcGQ7XG4gICAgICAgIH1cbiAgICAgICAgb2JqZWN0ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBfY29weXByb3AgKG5hbWU6IHN0cmluZywgc291cmNlOiBhbnksIHRhcmdldDogYW55KSB7XG4gICAgY29uc3QgcGQgPSBnZXRQcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBuYW1lKTtcbiAgICBpZiAocGQpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgbmFtZSwgcGQpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBDb3B5IGFsbCBwcm9wZXJ0aWVzIG5vdCBkZWZpbmVkIGluIG9iamVjdCBmcm9tIGFyZ3VtZW50c1sxLi4ubl0uXG4gKiBAcGFyYW0gb2JqZWN0IE9iamVjdCB0byBleHRlbmQgaXRzIHByb3BlcnRpZXMuXG4gKiBAcGFyYW0gc291cmNlcyBTb3VyY2Ugb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyBmcm9tLlxuICogQHJldHVybiBUaGUgcmVzdWx0IG9iamVjdC5cbiAqL1xuIGV4cG9ydCBmdW5jdGlvbiBhZGRvbiAob2JqZWN0PzogYW55LCAuLi5zb3VyY2VzOiBhbnlbXSkge1xuICAgIG9iamVjdCA9IG9iamVjdCB8fCB7fTtcbiAgICBmb3IgKGNvbnN0IHNvdXJjZSBvZiBzb3VyY2VzKSB7XG4gICAgICAgIGlmIChzb3VyY2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBzb3VyY2UgIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGNvbnN0IG5hbWUgaW4gc291cmNlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCEobmFtZSBpbiBvYmplY3QpKSB7XG4gICAgICAgICAgICAgICAgICAgIF9jb3B5cHJvcChuYW1lLCBzb3VyY2UsIG9iamVjdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvYmplY3Q7XG59XG5cbi8qKlxuICogQ29weSBhbGwgcHJvcGVydGllcyBmcm9tIGFyZ3VtZW50c1sxLi4ubl0gdG8gb2JqZWN0LlxuICogQHJldHVybiBUaGUgcmVzdWx0IG9iamVjdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1peGluIChvYmplY3Q/OiBhbnksIC4uLnNvdXJjZXM6IGFueVtdKSB7XG4gICAgb2JqZWN0ID0gb2JqZWN0IHx8IHt9O1xuXG4gICAgaWYgKHNvdXJjZXMpIHtcbiAgICAgICAgZm9yIChjb25zdCBzb3VyY2Ugb2Ygc291cmNlcykge1xuICAgICAgICAgICAgaWYgKHNvdXJjZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzb3VyY2UgIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG5hbWUgaW4gc291cmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIF9jb3B5cHJvcChuYW1lLCBzb3VyY2UsIG9iamVjdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBvYmplY3Q7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWVwQ29weShvYmopIHtcbiAgICBpZiAob2JqICYmIHR5cGVvZiBvYmogPT0gJ29iamVjdCcpIHtcbiAgICAgICAgbGV0IG9iakNsb25lID0gQXJyYXkuaXNBcnJheShvYmopID8gW10gOiB7fTtcblxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcbiAgICAgICAgICAgIC8v5Yik5patb2Jq5a2Q5YWD57Sg5piv5ZCm5Li65a+56LGh77yM5aaC5p6c5piv77yM6YCS5b2S5aSN5Yi2XG4gICAgICAgICAgICBpZiAob2JqW2tleV0gJiYgdHlwZW9mIG9ialtrZXldID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICAgICAgb2JqQ2xvbmVba2V5XSA9IHRoaXMuZGVlcENvcHkob2JqW2tleV0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL+WmguaenOS4jeaYr++8jOeugOWNleWkjeWItlxuICAgICAgICAgICAgICAgIG9iakNsb25lW2tleV0gPSBvYmpba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvYmpDbG9uZVxuICAgIH1cblxuICAgIHJldHVybiBvYmpcbn1cblxuLyoqXG4gKiDojrflvpfmianlsZXphY3nva5cbiAqL1xuY29uc3QgZXh0RmlsZSA9IHBhdGguam9pbihFZGl0b3IuUHJvamVjdC5wYXRoLCAnYXNzZXRzJyxcInJlc291cmNlc1wiLFwiY29uZmlnXCIsXCJFeHRlbnNpb25Db25maWcuanNvblwiKVxuY29uc3QgZXh0RmlsZUluR2FtZSA9IHBhdGguam9pbihFZGl0b3IuUHJvamVjdC5wYXRoLCAnYXNzZXRzJyxcImdhbWVcIixcImNvbmZpZ1wiLFwiRXh0ZW5zaW9uQ29uZmlnLmpzb25cIilcblxubGV0IGV4dGVuc2lvbkNvbmZpZyA6IEV4dGVuc2lvbkRhdGEgPSBuZXcgRXh0ZW5zaW9uRGF0YTtcbmxldCBleHRlbnNpb25Db25maWdMb2FkZWQgPSBmYWxzZVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RXh0ZW5zaW9uQ29uZmlnKCkgOiBFeHRlbnNpb25EYXRhIHtcbiAgICBpZiAoIWV4dGVuc2lvbkNvbmZpZ0xvYWRlZCkge1xuICAgICAgICBleHRlbnNpb25Db25maWdMb2FkZWQgPSB0cnVlXG5cbiAgICAgICAgaWYgKGZzLmV4aXN0c1N5bmMoZXh0RmlsZSkpIHtcbiAgICAgICAgICAgIGV4dGVuc2lvbkNvbmZpZyA9IEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKGV4dEZpbGUsIHsgZW5jb2Rpbmc6ICd1dGYtOCcgfSkpO1xuICAgICAgICAgICAgZXh0ZW5zaW9uQ29uZmlnLmdhbWUgPSBtaXhpbihuZXcgR2FtZUV4dGVuc2lvbkRhdGEsZXh0ZW5zaW9uQ29uZmlnLmdhbWUpXG4gICAgICAgICAgICBleHRlbnNpb25Db25maWcucGVyc29uYWxJbmZvID0gbWl4aW4obmV3IFBlcnNvbmFsSW5mb0V4dERhdGEsZXh0ZW5zaW9uQ29uZmlnLnBlcnNvbmFsSW5mbylcbiAgICAgICAgICAgIGV4dGVuc2lvbkNvbmZpZy5yZXNvdWNlID0gbWl4aW4obmV3IFJlc291cmNlRXh0ZW5zaW9uRGF0YSxleHRlbnNpb25Db25maWcucmVzb3VjZSlcbiAgICAgICAgICAgIGV4dGVuc2lvbkNvbmZpZy5jaGF0ID0gbWl4aW4obmV3IENoYXRFeHRlbnNpb25EYXRhLGV4dGVuc2lvbkNvbmZpZy5jaGF0KVxuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGV4dGVuc2lvbkNvbmZpZy5oYWxsLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZXh0ZW5zaW9uQ29uZmlnLmhhbGxbaV0uc2V0dGluZyA9IG1peGluKG5ldyBIYWxsU2V0dGluZ0RhdGEsZXh0ZW5zaW9uQ29uZmlnLmhhbGxbaV0uc2V0dGluZylcblxuICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgZXh0ZW5zaW9uQ29uZmlnLmhhbGxbaV0uc2xvdHMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNsb3QgPSBleHRlbnNpb25Db25maWcuaGFsbFtpXS5zbG90c1trXVxuXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaChzbG90LnNsb3RUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFNsb3RUeXBlLkFyZWE6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXh0ZW5zaW9uQ29uZmlnLmhhbGxbaV0uc2xvdHNba10gPSBtaXhpbihuZXcgSGFsbEFyZWFTbG90UHJvcCxleHRlbnNpb25Db25maWcuaGFsbFtpXS5zbG90c1trXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBTbG90VHlwZS5Sb29tOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4dGVuc2lvbkNvbmZpZy5oYWxsW2ldLnNsb3RzW2tdID0gbWl4aW4obmV3IEhhbGxSb29tU2xvdFByb3AsZXh0ZW5zaW9uQ29uZmlnLmhhbGxbaV0uc2xvdHNba10pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgU2xvdFR5cGUuQ3VzdG9tOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4dGVuc2lvbkNvbmZpZy5oYWxsW2ldLnNsb3RzW2tdID0gbWl4aW4obmV3IEhhbGxDdXN0b21TbG90UHJvcCxleHRlbnNpb25Db25maWcuaGFsbFtpXS5zbG90c1trXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBTbG90VHlwZS5Nb3JlZ2FtZTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHRlbnNpb25Db25maWcuaGFsbFtpXS5zbG90c1trXSA9IG1peGluKG5ldyBIYWxsTW9yZWdhbWVTbG90UHJvcCxleHRlbnNpb25Db25maWcuaGFsbFtpXS5zbG90c1trXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBTbG90VHlwZS5HYW1lOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4dGVuc2lvbkNvbmZpZy5oYWxsW2ldLnNsb3RzW2tdID0gbWl4aW4obmV3IEhhbGxHYW1lU2xvdFByb3AsZXh0ZW5zaW9uQ29uZmlnLmhhbGxbaV0uc2xvdHNba10pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGV4dGVuc2lvbkNvbmZpZy5ydWxlcykge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZXh0ZW5zaW9uQ29uZmlnLnJ1bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGV4dGVuc2lvbkNvbmZpZy5ydWxlc1tpXSA9IG1peGluKG5ldyBSdWxlRXh0ZW5zaW9uRGF0YSxleHRlbnNpb25Db25maWcucnVsZXNbaV0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBleHRlbnNpb25Db25maWcucnVsZXMgPVtuZXcgUnVsZUV4dGVuc2lvbkRhdGEsbmV3IFJ1bGVFeHRlbnNpb25EYXRhLG5ldyBSdWxlRXh0ZW5zaW9uRGF0YSxuZXcgUnVsZUV4dGVuc2lvbkRhdGEsbmV3IFJ1bGVFeHRlbnNpb25EYXRhLG5ldyBSdWxlRXh0ZW5zaW9uRGF0YV1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBleHRlbnNpb25Db25maWc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzYXZlRXh0ZW5zaW9uQ29uZmlnKCkge1xuICAgIHdyaXRlSnNvbkZpbGUoZXh0RmlsZSxleHRlbnNpb25Db25maWcsNClcbiAgICB3cml0ZUpzb25GaWxlKGV4dEZpbGVJbkdhbWUsZXh0ZW5zaW9uQ29uZmlnLDQpICAgXG59XG5cbi8qKlxuICog6I635b6X5omA5pyJ5ri45oiP5YyFXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRHYW1lUGFja3MoZmluZFBhdGgpIHtcbiAgICBsZXQgcGFja3MgPSB7fTtcbiAgICBsZXQgX2NvbGxlY3RHYW1lUGFja3M7XG4gICAgX2NvbGxlY3RHYW1lUGFja3MgPSAocGF0aF86IHN0cmluZykgPT4ge1xuICAgICAgICBmb3IgKGxldCBmIG9mIGZzLnJlYWRkaXJTeW5jKHBhdGhfKSkge1xuICAgICAgICAgICAgbGV0IGZwYXRoID0gcGF0aC5qb2luKHBhdGhfLCBmKTtcbiAgICAgICAgICAgIGxldCBmc3RhdGUgPSBmcy5zdGF0U3luYyhmcGF0aCk7XG4gICAgICAgICAgICBpZiAoZnN0YXRlLmlzRGlyZWN0b3J5KCkpIHtcbiAgICAgICAgICAgICAgICBsZXQgbWV0YWZpbGUgPSBmcGF0aCArICcubWV0YSc7XG4gICAgICAgICAgICAgICAgaWYgKGZzLmV4aXN0c1N5bmMobWV0YWZpbGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBtZXRhID0gSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMobWV0YWZpbGUsIHsgZW5jb2Rpbmc6ICd1dGYtOCcgfSkpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobWV0YT8udXNlckRhdGEuaXNCdW5kbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuYW1lID0gbWV0YS51c2VyRGF0YS5idW5kbGVOYW1lIHx8IGZcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuYW1lICE9IFwicmVzb3VyY2VzXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFja3NbbmFtZV0gPSBwYXRoLm5vcm1hbGl6ZShmcGF0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBfY29sbGVjdEdhbWVQYWNrcyhmcGF0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgX2NvbGxlY3RHYW1lUGFja3MocGF0aC5qb2luKGZpbmRQYXRoLCAnYXNzZXRzJykpO1xuICAgIF9jb2xsZWN0R2FtZVBhY2tzKHBhdGguam9pbihmaW5kUGF0aCwgJ2V4dGVuc2lvbnMvYXNzZXQtcGx1Z2lucycpKTtcbiAgICByZXR1cm4gcGFja3M7XG59XG4iXX0=
