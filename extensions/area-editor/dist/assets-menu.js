"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onAssetMenu = exports.createAltasMeta = exports.altas_file_meta = exports.atlas_file = exports.onCreateMenu = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const scene_1 = require("./scene");
const utils_1 = require("./utils");
const ExtensionPath = __dirname;
function onCreateMenu(assetInfo) {
    return [
        {
            label: '插件',
            click() {
                if (assetInfo) {
                    Editor.Dialog.info("aaa");
                }
            },
        },
    ];
}
exports.onCreateMenu = onCreateMenu;
exports.atlas_file = "\
{\
  \"__type__\": \"cc.SpriteAtlas\"\
}\
";
exports.altas_file_meta = "\
{\
  \"ver\": \"1.0.6\",\
  \"importer\": \"auto-atlas\",\
  \"imported\": true,\
  \"uuid\": \"03fa7654-68fc-47f3-8617-21a81e816309\",\
  \"files\": [\
    \".json\"\
  ],\
  \"subMetas\": {},\
  \"userData\": {\
    \"maxWidth\": 1024,\
    \"maxHeight\": 1024,\
    \"padding\": 2,\
    \"allowRotation\": true,\
    \"forceSquared\": false,\
    \"powerOfTwo\": false,\
    \"algorithm\": \"MaxRects\",\
    \"format\": \"png\",\
    \"quality\": 80,\
    \"contourBleed\": true,\
    \"paddingBleed\": true,\
    \"filterUnused\": true,\
    \"removeTextureInBundle\": true,\
    \"removeImageInBundle\": true,\
    \"removeSpriteAtlasInBundle\": true,\
    \"compressSettings\": {\
      \"useCompressTexture\": true,\
      \"presetId\": \"20C0oUYFpPrKsO4x/uWFKQ\"\
    },\
    \"textureSetting\": {\
      \"wrapModeS\": \"repeat\",\
      \"wrapModeT\": \"repeat\",\
      \"minfilter\": \"linear\",\
      \"magfilter\": \"linear\",\
      \"mipfilter\": \"none\",\
      \"anisotropy\": 0\
    }\
  }\
}\
";
function createAltasMeta(dir) {
    let uuid = Editor.Utils.UUID.generate();
    let file = path_1.default.join(dir, "auto-atlas.pac");
    if (fs_1.default.existsSync(file))
        fs_1.default.unlinkSync(file);
    fs_1.default.writeFileSync(file, exports.atlas_file);
    let metaData = exports.altas_file_meta.replace("03fa7654-68fc-47f3-8617-21a81e816309", uuid);
    console.log(metaData);
    file = path_1.default.join(dir, "auto-atlas.pac.meta");
    if (fs_1.default.existsSync(file))
        fs_1.default.unlinkSync(file);
    fs_1.default.writeFileSync(file, metaData);
}
exports.createAltasMeta = createAltasMeta;
function createPluginFile(dir, pluginName) {
    utils_1.copyFile(`${ExtensionPath}/source/TemplatePlugin.ts`, `${dir}/${pluginName}.ts`, (data) => {
        return data.replace(new RegExp("TemplatePlugin", "gm"), pluginName);
    });
    utils_1.copyFile(`${ExtensionPath}/source/TemplatePluginConfig.ts`, `${dir}/${pluginName}Config.ts`);
}
function onAssetMenu(assetInfo) {
    var _a;
    // 判断是否选择了插件
    let isPluginDirectory = false;
    let metaData;
    if (assetInfo.isDirectory) {
        let metaFile = assetInfo.file + ".meta";
        if (!fs_1.default.existsSync(metaFile)) {
            return;
        }
        metaData = utils_1.readJsonFile(metaFile);
        if ((_a = metaData.userData) === null || _a === void 0 ? void 0 : _a.isBundle) {
            isPluginDirectory = true;
        }
    }
    if (!isPluginDirectory) {
        return;
    }
    let pluginDir = assetInfo.file;
    return [
        {
            label: '插件',
            submenu: [
                {
                    label: '创建资源目录',
                    click() {
                        // 判断插件名是否提供正确
                        if (!metaData.userData.bundleName) {
                            Editor.Dialog.error("插件名字为空");
                            return;
                        }
                        if (!metaData.userData.bundleName.endsWith("Plugin")) {
                            Editor.Dialog.error("插件名字需要以Plugin结尾:" + metaData.userData.bundleName);
                            return;
                        }
                        let topDir = pluginDir;
                        let subDirs = ["animations", "effects", "images", "icon", "prefabs", "scripts", "spines"];
                        for (let i = 0; i < subDirs.length; i++) {
                            if (!utils_1.findFile(topDir, subDirs[i], utils_1.FindFileType.DIRECTORY)) {
                                fs_1.default.mkdirSync(path_1.default.join(topDir, subDirs[i]));
                            }
                        }
                        // images 下一级目录
                        topDir = path_1.default.join(pluginDir, "images");
                        subDirs = ["fonts"];
                        for (let i = 0; i < subDirs.length; i++) {
                            if (!utils_1.findFile(topDir, subDirs[i], utils_1.FindFileType.DIRECTORY)) {
                                fs_1.default.mkdirSync(path_1.default.join(topDir, subDirs[i]));
                            }
                        }
                        // 在images下面自动创建图集
                        createAltasMeta(topDir);
                        // 代码目录
                        topDir = path_1.default.join(pluginDir, "scripts");
                        subDirs = ["action", "view"];
                        for (let i = 0; i < subDirs.length; i++) {
                            if (!utils_1.findFile(topDir, subDirs[i], utils_1.FindFileType.DIRECTORY)) {
                                fs_1.default.mkdirSync(path_1.default.join(topDir, subDirs[i]));
                            }
                        }
                        // 创建插件文件
                        createPluginFile(topDir, metaData.userData.bundleName);
                        utils_1.copyFile(`${ExtensionPath}/source/Context.ts`, `${topDir}/view/Context.ts`);
                        utils_1.AssetDB.refreshAsset(assetInfo.uuid);
                        setTimeout(() => {
                            scene_1.load();
                        }, 1000);
                    },
                }
            ],
        },
    ];
}
exports.onAssetMenu = onAssetMenu;
//# sourceMappingURL=data:application/json;charset=utf8;base64,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LENBQUMsQ0FBQTt3QkFFMUUsZUFBTyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUE7d0JBRXBDLFVBQVUsQ0FBQyxHQUFFLEVBQUU7NEJBQ2IsWUFBSSxFQUFFLENBQUE7d0JBQ1IsQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFBO29CQUNYLENBQUM7aUJBQ0Y7YUFDRjtTQUNGO0tBQ0YsQ0FBQztBQUNSLENBQUM7QUF4RkQsa0NBd0ZDIiwiZmlsZSI6ImFzc2V0cy1tZW51LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZzIGZyb20gJ2ZzJztcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcclxuaW1wb3J0IHsgbG9hZCB9IGZyb20gJy4vc2NlbmUnO1xyXG5pbXBvcnQge3JlYWRKc29uRmlsZSxmaW5kRmlsZSxGaW5kRmlsZVR5cGUsY29weUZpbGUsIEFzc2V0REJ9IGZyb20gJy4vdXRpbHMnXHJcblxyXG5jb25zdCBFeHRlbnNpb25QYXRoID0gX19kaXJuYW1lXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gb25DcmVhdGVNZW51KGFzc2V0SW5mbykge1xyXG4gICAgcmV0dXJuIFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBsYWJlbDogJ+aPkuS7ticsXHJcbiAgICAgICAgICBjbGljaygpIHtcclxuICAgICAgICAgICAgaWYgKGFzc2V0SW5mbykge1xyXG4gICAgICAgICAgICAgICAgRWRpdG9yLkRpYWxvZy5pbmZvKFwiYWFhXCIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgXTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGF0bGFzX2ZpbGUgPSBcIlxcXHJcbntcXFxyXG4gIFxcXCJfX3R5cGVfX1xcXCI6IFxcXCJjYy5TcHJpdGVBdGxhc1xcXCJcXFxyXG59XFxcclxuXCJcclxuXHJcbmV4cG9ydCBjb25zdCBhbHRhc19maWxlX21ldGEgPSBcIlxcXHJcbntcXFxyXG4gIFxcXCJ2ZXJcXFwiOiBcXFwiMS4wLjZcXFwiLFxcXHJcbiAgXFxcImltcG9ydGVyXFxcIjogXFxcImF1dG8tYXRsYXNcXFwiLFxcXHJcbiAgXFxcImltcG9ydGVkXFxcIjogdHJ1ZSxcXFxyXG4gIFxcXCJ1dWlkXFxcIjogXFxcIjAzZmE3NjU0LTY4ZmMtNDdmMy04NjE3LTIxYTgxZTgxNjMwOVxcXCIsXFxcclxuICBcXFwiZmlsZXNcXFwiOiBbXFxcclxuICAgIFxcXCIuanNvblxcXCJcXFxyXG4gIF0sXFxcclxuICBcXFwic3ViTWV0YXNcXFwiOiB7fSxcXFxyXG4gIFxcXCJ1c2VyRGF0YVxcXCI6IHtcXFxyXG4gICAgXFxcIm1heFdpZHRoXFxcIjogMTAyNCxcXFxyXG4gICAgXFxcIm1heEhlaWdodFxcXCI6IDEwMjQsXFxcclxuICAgIFxcXCJwYWRkaW5nXFxcIjogMixcXFxyXG4gICAgXFxcImFsbG93Um90YXRpb25cXFwiOiB0cnVlLFxcXHJcbiAgICBcXFwiZm9yY2VTcXVhcmVkXFxcIjogZmFsc2UsXFxcclxuICAgIFxcXCJwb3dlck9mVHdvXFxcIjogZmFsc2UsXFxcclxuICAgIFxcXCJhbGdvcml0aG1cXFwiOiBcXFwiTWF4UmVjdHNcXFwiLFxcXHJcbiAgICBcXFwiZm9ybWF0XFxcIjogXFxcInBuZ1xcXCIsXFxcclxuICAgIFxcXCJxdWFsaXR5XFxcIjogODAsXFxcclxuICAgIFxcXCJjb250b3VyQmxlZWRcXFwiOiB0cnVlLFxcXHJcbiAgICBcXFwicGFkZGluZ0JsZWVkXFxcIjogdHJ1ZSxcXFxyXG4gICAgXFxcImZpbHRlclVudXNlZFxcXCI6IHRydWUsXFxcclxuICAgIFxcXCJyZW1vdmVUZXh0dXJlSW5CdW5kbGVcXFwiOiB0cnVlLFxcXHJcbiAgICBcXFwicmVtb3ZlSW1hZ2VJbkJ1bmRsZVxcXCI6IHRydWUsXFxcclxuICAgIFxcXCJyZW1vdmVTcHJpdGVBdGxhc0luQnVuZGxlXFxcIjogdHJ1ZSxcXFxyXG4gICAgXFxcImNvbXByZXNzU2V0dGluZ3NcXFwiOiB7XFxcclxuICAgICAgXFxcInVzZUNvbXByZXNzVGV4dHVyZVxcXCI6IHRydWUsXFxcclxuICAgICAgXFxcInByZXNldElkXFxcIjogXFxcIjIwQzBvVVlGcFByS3NPNHgvdVdGS1FcXFwiXFxcclxuICAgIH0sXFxcclxuICAgIFxcXCJ0ZXh0dXJlU2V0dGluZ1xcXCI6IHtcXFxyXG4gICAgICBcXFwid3JhcE1vZGVTXFxcIjogXFxcInJlcGVhdFxcXCIsXFxcclxuICAgICAgXFxcIndyYXBNb2RlVFxcXCI6IFxcXCJyZXBlYXRcXFwiLFxcXHJcbiAgICAgIFxcXCJtaW5maWx0ZXJcXFwiOiBcXFwibGluZWFyXFxcIixcXFxyXG4gICAgICBcXFwibWFnZmlsdGVyXFxcIjogXFxcImxpbmVhclxcXCIsXFxcclxuICAgICAgXFxcIm1pcGZpbHRlclxcXCI6IFxcXCJub25lXFxcIixcXFxyXG4gICAgICBcXFwiYW5pc290cm9weVxcXCI6IDBcXFxyXG4gICAgfVxcXHJcbiAgfVxcXHJcbn1cXFxyXG5cIlxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUFsdGFzTWV0YShkaXIpIHtcclxuICBsZXQgdXVpZCA9IEVkaXRvci5VdGlscy5VVUlELmdlbmVyYXRlKCk7XHJcblxyXG4gIGxldCBmaWxlID0gcGF0aC5qb2luKGRpcixcImF1dG8tYXRsYXMucGFjXCIpXHJcbiAgaWYgKGZzLmV4aXN0c1N5bmMoZmlsZSkpXHJcbiAgICBmcy51bmxpbmtTeW5jKGZpbGUpXHJcbiAgZnMud3JpdGVGaWxlU3luYyhmaWxlLGF0bGFzX2ZpbGUpXHJcblxyXG4gIGxldCBtZXRhRGF0YSA9IGFsdGFzX2ZpbGVfbWV0YS5yZXBsYWNlKFwiMDNmYTc2NTQtNjhmYy00N2YzLTg2MTctMjFhODFlODE2MzA5XCIsdXVpZClcclxuICBjb25zb2xlLmxvZyhtZXRhRGF0YSlcclxuICBmaWxlID0gcGF0aC5qb2luKGRpcixcImF1dG8tYXRsYXMucGFjLm1ldGFcIilcclxuICBpZiAoZnMuZXhpc3RzU3luYyhmaWxlKSlcclxuICAgIGZzLnVubGlua1N5bmMoZmlsZSlcclxuICBmcy53cml0ZUZpbGVTeW5jKGZpbGUsbWV0YURhdGEpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVBsdWdpbkZpbGUoZGlyLHBsdWdpbk5hbWUpIHtcclxuICBjb3B5RmlsZShgJHtFeHRlbnNpb25QYXRofS9zb3VyY2UvVGVtcGxhdGVQbHVnaW4udHNgLGAke2Rpcn0vJHtwbHVnaW5OYW1lfS50c2AsKGRhdGEpPT4ge1xyXG4gICAgcmV0dXJuIGRhdGEucmVwbGFjZShuZXcgUmVnRXhwKFwiVGVtcGxhdGVQbHVnaW5cIixcImdtXCIpLHBsdWdpbk5hbWUpXHJcbiAgfSlcclxuXHJcbiAgY29weUZpbGUoYCR7RXh0ZW5zaW9uUGF0aH0vc291cmNlL1RlbXBsYXRlUGx1Z2luQ29uZmlnLnRzYCxgJHtkaXJ9LyR7cGx1Z2luTmFtZX1Db25maWcudHNgKVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gb25Bc3NldE1lbnUoYXNzZXRJbmZvKSB7XHJcbiAgICAvLyDliKTmlq3mmK/lkKbpgInmi6nkuobmj5Lku7ZcclxuICAgIGxldCBpc1BsdWdpbkRpcmVjdG9yeSA9IGZhbHNlO1xyXG4gICAgbGV0IG1ldGFEYXRhXHJcbiAgICBpZiAoYXNzZXRJbmZvLmlzRGlyZWN0b3J5KSB7XHJcbiAgICAgICAgbGV0IG1ldGFGaWxlID0gYXNzZXRJbmZvLmZpbGUgKyBcIi5tZXRhXCJcclxuICAgICAgICBcclxuICAgICAgICBpZiAoIWZzLmV4aXN0c1N5bmMobWV0YUZpbGUpKSB7XHJcbiAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG1ldGFEYXRhID0gcmVhZEpzb25GaWxlKG1ldGFGaWxlKVxyXG5cclxuICAgICAgICBpZiAobWV0YURhdGEudXNlckRhdGE/LmlzQnVuZGxlKSB7XHJcbiAgICAgICAgICAgIGlzUGx1Z2luRGlyZWN0b3J5ID0gdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoIWlzUGx1Z2luRGlyZWN0b3J5KSB7XHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHBsdWdpbkRpciA9IGFzc2V0SW5mby5maWxlXHJcblxyXG4gICAgcmV0dXJuIFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBsYWJlbDogJ+aPkuS7ticsXHJcbiAgICAgICAgICBzdWJtZW51OiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBsYWJlbDogJ+WIm+W7uui1hOa6kOebruW9lScsXHJcbiAgICAgICAgICAgICAgY2xpY2soKSB7XHJcbiAgICAgICAgICAgICAgICAgIC8vIOWIpOaWreaPkuS7tuWQjeaYr+WQpuaPkOS+m+ato+ehrlxyXG4gICAgICAgICAgICAgICAgICBpZiAoIW1ldGFEYXRhLnVzZXJEYXRhLmJ1bmRsZU5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIEVkaXRvci5EaWFsb2cuZXJyb3IoXCLmj5Lku7blkI3lrZfkuLrnqbpcIilcclxuICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICBpZiAoIW1ldGFEYXRhLnVzZXJEYXRhLmJ1bmRsZU5hbWUuZW5kc1dpdGgoXCJQbHVnaW5cIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIEVkaXRvci5EaWFsb2cuZXJyb3IoXCLmj5Lku7blkI3lrZfpnIDopoHku6VQbHVnaW7nu5PlsL46XCIgKyBtZXRhRGF0YS51c2VyRGF0YS5idW5kbGVOYW1lKVxyXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgIGxldCB0b3BEaXIgID0gcGx1Z2luRGlyXHJcbiAgICAgICAgICAgICAgICAgIGxldCBzdWJEaXJzID0gW1wiYW5pbWF0aW9uc1wiLFwiZWZmZWN0c1wiLFwiaW1hZ2VzXCIsXCJpY29uXCIsXCJwcmVmYWJzXCIsXCJzY3JpcHRzXCIsXCJzcGluZXNcIl1cclxuICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3ViRGlycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKCFmaW5kRmlsZSh0b3BEaXIsc3ViRGlyc1tpXSxGaW5kRmlsZVR5cGUuRElSRUNUT1JZKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGZzLm1rZGlyU3luYyhwYXRoLmpvaW4odG9wRGlyLHN1YkRpcnNbaV0pKVxyXG4gICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAvLyBpbWFnZXMg5LiL5LiA57qn55uu5b2VXHJcbiAgICAgICAgICAgICAgICAgIHRvcERpciAgPSBwYXRoLmpvaW4ocGx1Z2luRGlyLFwiaW1hZ2VzXCIpXHJcbiAgICAgICAgICAgICAgICAgIHN1YkRpcnMgPSBbXCJmb250c1wiXVxyXG4gICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdWJEaXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFmaW5kRmlsZSh0b3BEaXIsc3ViRGlyc1tpXSxGaW5kRmlsZVR5cGUuRElSRUNUT1JZKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmcy5ta2RpclN5bmMocGF0aC5qb2luKHRvcERpcixzdWJEaXJzW2ldKSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgIC8vIOWcqGltYWdlc+S4i+mdouiHquWKqOWIm+W7uuWbvumbhlxyXG4gICAgICAgICAgICAgICAgICBjcmVhdGVBbHRhc01ldGEodG9wRGlyKVxyXG5cclxuICAgICAgICAgICAgICAgICAgLy8g5Luj56CB55uu5b2VXHJcbiAgICAgICAgICAgICAgICAgIHRvcERpciAgPSBwYXRoLmpvaW4ocGx1Z2luRGlyLFwic2NyaXB0c1wiKVxyXG4gICAgICAgICAgICAgICAgICBzdWJEaXJzID0gW1wiYWN0aW9uXCIsXCJ2aWV3XCJdXHJcblxyXG4gICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN1YkRpcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWZpbmRGaWxlKHRvcERpcixzdWJEaXJzW2ldLEZpbmRGaWxlVHlwZS5ESVJFQ1RPUlkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZzLm1rZGlyU3luYyhwYXRoLmpvaW4odG9wRGlyLHN1YkRpcnNbaV0pKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgLy8g5Yib5bu65o+S5Lu25paH5Lu2XHJcbiAgICAgICAgICAgICAgICAgIGNyZWF0ZVBsdWdpbkZpbGUodG9wRGlyLG1ldGFEYXRhLnVzZXJEYXRhLmJ1bmRsZU5hbWUpXHJcbiAgICAgICAgICAgICAgICAgIGNvcHlGaWxlKGAke0V4dGVuc2lvblBhdGh9L3NvdXJjZS9Db250ZXh0LnRzYCxgJHt0b3BEaXJ9L3ZpZXcvQ29udGV4dC50c2ApXHJcblxyXG4gICAgICAgICAgICAgICAgICBBc3NldERCLnJlZnJlc2hBc3NldChhc3NldEluZm8udXVpZClcclxuXHJcbiAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCk9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9hZCgpXHJcbiAgICAgICAgICAgICAgICAgIH0sMTAwMClcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICBdLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF07XHJcbn0iXX0=
