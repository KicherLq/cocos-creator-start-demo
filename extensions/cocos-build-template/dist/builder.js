"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configs = exports.unload = exports.load = void 0;
const load = function () {
    console.debug('cocos-build-template load11111');
};
exports.load = load;
const unload = function () {
    console.debug('cocos-build-template unload');
};
exports.unload = unload;
exports.configs = {
    '*': {
        hooks: './hooks',
        options: {},
        verifyRuleMap: {},
    },
    'wechatgame': {
        hooks: './hooks',
        options: {
            serverMode: {
                label: '服务器设置',
                default: "0",
                render: {
                    ui: 'ui-select',
                    items: [
                        {
                            value: "0",
                            label: "使用项目设置"
                        },
                        {
                            value: "1",
                            label: "内网测试"
                        },
                        {
                            value: "2",
                            label: "888"
                        },
                        {
                            value: "3",
                            label: "正式"
                        },
                    ]
                },
            }
        },
        verifyRuleMap: {}
    },
    'alipay-mini-game': {
        hooks: './hooks',
        options: {
            serverMode: {
                label: '服务器设置',
                default: "0",
                render: {
                    ui: 'ui-select',
                    items: [
                        {
                            value: "0",
                            label: "使用项目设置"
                        },
                        {
                            value: "1",
                            label: "内网测试"
                        },
                        {
                            value: "2",
                            label: "888"
                        },
                        {
                            value: "3",
                            label: "正式"
                        },
                    ]
                },
            }
        },
        verifyRuleMap: {}
    }
};
// export const assetHandlers: BuildPlugin.AssetHandlers = './asset-handlers';
