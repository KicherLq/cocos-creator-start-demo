"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 对象工具
 */
class ObjectUtil {
    /**
     * 判断指定值是否是一个对象
     * @param {any} arg 参数
     */
    static isObject(arg) {
        return Object.prototype.toString.call(arg) === '[object Object]';
    }
    /**
     * 对象中是否包含指定的属性
     * @param {object} object 对象
     * @param {string} name 属性名
     */
    static containsProperty(object, name) {
        let result = false;
        const search = (_object) => {
            if (ObjectUtil.isObject(_object)) {
                for (const key in _object) {
                    if (key == name) {
                        result = true;
                        return;
                    }
                    search(_object[key]);
                }
            }
            else if (Array.isArray(_object)) {
                for (let i = 0, l = _object.length; i < l; i++) {
                    search(_object[i]);
                }
            }
        };
        search(object);
        return result;
    }
    /**
     * 提取有效信息（含有 uuid）
     * @param {object} source 源数据
     * @returns {{ __type__: string, _name: string, fileId?: string }}
     */
    static extractValidInfo(source) {
        const result = Object.create(null);
        // 记录有用的属性
        const keys = ['__type__', '_name', 'fileId'];
        for (let i = 0, l = keys.length; i < l; i++) {
            const key = keys[i];
            if (source[key] !== undefined) {
                result[key] = source[key];
            }
        }
        // 记录包含 uuid 的属性
        for (const key in source) {
            const contains = ObjectUtil.containsProperty(source[key], '__uuid__');
            if (contains) {
                result[key] = source[key];
            }
        }
        return result;
    }
    /**
     * 对象中是否包含指定的值
     * @param {object} object 对象
     * @param {any} value 值
     */
    static containsValue(object, value) {
        let result = false;
        const search = (_object) => {
            if (ObjectUtil.isObject(_object)) {
                for (const key in _object) {
                    if (_object[key] === value) {
                        result = true;
                        return;
                    }
                    search(_object[key]);
                }
            }
            else if (Array.isArray(_object)) {
                for (let i = 0, l = _object.length; i < l; i++) {
                    search(_object[i]);
                }
            }
        };
        search(object);
        return result;
    }
}
exports.default = ObjectUtil;
;
