"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.translate = void 0;
/** 图标表 */
const ICON_MAP = {
    'scene': '🔥',
    'prefab': '💠',
    'node': '🎲',
    'component': '🧩',
    'property': '📄',
    'asset': '📦',
    'asset-info': '📋',
    'node-refs': '📙',
    'asset-refs': '📗',
};
function translate(key) {
    if (Editor.I18n.getLanguage() == 'zh') {
        return require('../i18n/zh')[key] || key;
    }
    else if (Editor.I18n.getLanguage() == 'en') {
        return require('../i18n/en')[key] || key;
    }
    return key;
}
exports.translate = translate;
/**
 * 打印机
 */
class Printer {
    static print(type, arg) {
        switch (type) {
            case 'log': {
                console.log(arg);
                break;
            }
            case 'info': {
                console.info(arg);
                break;
            }
            case 'warn': {
                console.warn(arg);
                break;
            }
            case 'error': {
                console.error(arg);
                break;
            }
            default: {
                console.log(arg);
            }
        }
    }
    /**
     * 打印结果至控制台
     * @param {object} result
     */
    static printResult(result) {
        if (!result) {
            return;
        }
        // 标志位
        const nodeRefs = [], assetRefs = [];
        let nodeRefsCount = 0, assetRefsCount = 0;
        // 遍历引用信息
        for (let refs = result.refs, i = 0, l = refs.length; i < l; i++) {
            const ref = refs[i];
            const type = ref.type || '';
            const url = ref.url ? ref.url.replace('.meta', '') : '';
            if (type === 'scene' || type === 'prefab') {
                // 场景或预制体
                nodeRefs.push(`　　${ICON_MAP[type]} [${translate(type)}] {asset(${url})}`);
                // 节点引用
                let details = ref.refs;
                if (details) {
                    for (let j = 0, l = details.length; j < l; j++) {
                        nodeRefsCount++;
                        // 详情
                        const detail = details[j];
                        let item = `　　　　${ICON_MAP['node']} [${translate('node')}] {node(${detail.node})}`;
                        if (detail.component) {
                            item += ` 　→ 　${ICON_MAP['component']} [${translate('component')}] ${detail.component}`;
                        }
                        if (detail.property) {
                            item += ` 　→ 　${ICON_MAP['property']} [${translate('property')}] ${detail.property}`;
                        }
                        nodeRefs.push(item);
                    }
                }
            }
            else {
                // 资源引用
                assetRefsCount++;
                assetRefs.push(`　　${ICON_MAP['asset']} [${translate(type)}] {asset(${url})}`);
            }
        }
        // 组装文本
        const texts = [];
        // 分割线
        texts.push(`${'- - '.repeat(36)}`);
        // 基础信息
        texts.push(`${ICON_MAP['asset-info']} ${translate('asset-info')}`);
        texts.push(`　　- ${translate('asset-type')}${result.type}`);
        texts.push(`　　- ${translate('asset-uuid')}${result.uuid}`);
        // 分割线
        texts.push(`${'- - '.repeat(36)}`);
        // 节点引用
        if (nodeRefs.length > 0) {
            texts.push(`${ICON_MAP['node-refs']} ${translate('node-refs')} x ${nodeRefsCount}`);
            for (let i = 0, l = nodeRefs.length; i < l; i++) {
                texts.push(nodeRefs[i]);
            }
        }
        // 资源引用
        if (assetRefs.length > 0) {
            texts.push(`${ICON_MAP['asset-refs']} ${translate('asset-refs')} x ${assetRefsCount}`);
            for (let i = 0, l = assetRefs.length; i < l; i++) {
                texts.push(assetRefs[i]);
            }
        }
        // 结尾分割线
        texts.push(`${'- - '.repeat(36)}`);
        // 打印到控制台
        texts.unshift(`🗂 ${translate('result')} >>>`);
        for (let index = 0; index < texts.length; index++) {
            const text = texts[index];
            Printer.print('log', text);
        }
    }
}
exports.default = Printer;
;
