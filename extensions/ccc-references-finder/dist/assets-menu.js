"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onAssetMenu = exports.isAssetFile = void 0;
const editor_api_1 = __importDefault(require("./editor-api"));
const AssetType = [
    'cc.Prefab',
    'cc.Script',
    'cc.ImageAsset',
    'cc.SpriteFrame',
    'cc.SpriteAtlas',
    'cc.ParticleAsset',
    'cc.BitmapFont',
    'cc.JsonAsset',
    'cc.AnimationClip',
    'cc.AudioClip',
    'cc.VideoClip',
    'cc.EffectAsset',
    'cc.Material',
    'sp.SkeletonData', // 骨骼动画
];
const isAssetFile = function (type) {
    return AssetType.indexOf(type) != -1;
};
exports.isAssetFile = isAssetFile;
function onAssetMenu(assetInfo) {
    return [
        {
            label: 'i18n:ccc-references-finder.find_references',
            enabled: (0, exports.isAssetFile)(assetInfo.type),
            click() {
                Editor.Message.send('ccc-references-finder', 'find_references', assetInfo.uuid);
            }
        },
        {
            label: 'replace uuids',
            enabled: assetInfo.isDirectory,
            async click() {
                let filePath = await editor_api_1.default.urlToFspath(assetInfo.url);
                Editor.Message.send('ccc-references-finder', 'replaceuuids', filePath);
            }
        },
    ];
}
exports.onAssetMenu = onAssetMenu;
;
