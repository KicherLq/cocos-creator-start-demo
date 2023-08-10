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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const util_1 = require("util");
class FileUtil {
    /**
     * 复制文件/文件夹
     * @param {Fs.PathLike} srcPath 源路径
     * @param {Fs.PathLike} destPath 目标路径
     * @returns {Promise<boolean>}
     */
    static copy(srcPath, destPath) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!FileUtil.existsSync(srcPath)) {
                return false;
            }
            const stats = yield FileUtil.stat(srcPath);
            if (stats.isDirectory()) {
                if (!FileUtil.existsSync(destPath)) {
                    yield FileUtil.createDir(destPath);
                }
                const names = yield FileUtil.readdir(srcPath);
                for (const name of names) {
                    yield FileUtil.copy(path_1.default.join(srcPath, name), path_1.default.join(destPath, name));
                }
            }
            else {
                yield FileUtil.writeFile(destPath, yield FileUtil.readFile(srcPath));
            }
            return true;
        });
    }
    /**
     * 创建文件夹 (递归)
     * @param {Fs.PathLike} path 路径
     * @returns {Promise<boolean>}
     */
    static createDir(path) {
        return __awaiter(this, void 0, void 0, function* () {
            if (FileUtil.existsSync(path)) {
                return true;
            }
            else {
                const dir = path_1.default.dirname(path);
                if (yield FileUtil.createDir(dir)) {
                    yield FileUtil.mkdir(path);
                    return true;
                }
            }
            return false;
        });
    }
    /**
     * 移除文件/文件夹 (递归)
     * @param {Fs.PathLike} path 路径
     */
    static remove(path) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!FileUtil.existsSync(path)) {
                return;
            }
            const stats = yield FileUtil.stat(path);
            if (stats.isDirectory()) {
                const names = yield FileUtil.readdir(path);
                for (const name of names) {
                    yield FileUtil.remove(path_1.default.join(path, name));
                }
                yield FileUtil.rmdir(path);
            }
            else {
                yield FileUtil.unlink(path);
            }
        });
    }
    /**
     * 遍历文件/文件夹并执行函数
     * @param {Fs.PathLike} path 路径
     * @param {(filePath: Fs.PathLike, stat: Fs.Stats) => void | Promise<void>} handler 处理函数
     */
    static map(path, handler) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!path) {
                return;
            }
            if (!FileUtil.existsSync(path)) {
                return;
            }
            const stats = yield FileUtil.stat(path);
            if (stats.isDirectory()) {
                const names = yield FileUtil.readdir(path);
                for (const name of names) {
                    yield FileUtil.map(path_1.default.join(path, name), handler);
                }
            }
            else {
                yield handler(path, stats);
            }
        });
    }
}
exports.default = FileUtil;
/**
 * 获取文件状态
 * @param {Fs.PathLike} path 路径
 * @returns {Promise<Fs.stats>}
 */
FileUtil.stat = (0, util_1.promisify)(fs_1.default.stat);
/**
 * 创建文件夹
 * @param {Fs.PathLike} path 路径
 * @param {Fs.MakeDirectoryOptions?} options 选项
 * @returns {Promise<void>}
 */
FileUtil.mkdir = (0, util_1.promisify)(fs_1.default.mkdir);
/**
 * 读取文件夹
 * @param {Fs.PathLike} path 路径
 * @param {any} options 选项
 * @returns {Promise<string[]>}
 */
FileUtil.readdir = (0, util_1.promisify)(fs_1.default.readdir);
/**
 * 移除文件夹
 * @param {Fs.PathLike} path 路径
 * @param {Fs.RmDirOptions?} options 选项
 * @returns {Promise<void>}
 */
FileUtil.rmdir = (0, util_1.promisify)(fs_1.default.rmdir);
/**
 * 读取文件
 * @param {Fs.PathLike} path 路径
 * @param {any} options 选项
 * @returns {Promise<Buffer>}
 */
FileUtil.readFile = (0, util_1.promisify)(fs_1.default.readFile);
/**
 * 创建文件
 * @param {Fs.PathLike} path 路径
 * @param {string | NodeJS.ArrayBufferView} data 数据
 * @param {Fs.WriteFileOptions?} options 选项
 * @returns {Promise<void>}
 */
FileUtil.writeFile = (0, util_1.promisify)(fs_1.default.writeFile);
/**
 * 移除文件
 * @param {Fs.PathLike} path 路径
 * @returns {Promise<void>}
 */
FileUtil.unlink = (0, util_1.promisify)(fs_1.default.unlink);
/**
 * 测试路径是否存在 (同步)
 * @param {Fs.PathLike} path 路径
 */
FileUtil.existsSync = fs_1.default.existsSync;
