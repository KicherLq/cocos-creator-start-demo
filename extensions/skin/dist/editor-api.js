"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EditorAPI {
    static async assetInfoByUUID(uuid) {
        return (await Editor.Message.request('asset-db', 'query-asset-info', uuid));
    }
    static isUUID(uuid) {
        return Editor.Utils.UUID.isUUID(uuid);
    }
    static compressUuid(uuid) {
        return Editor.Utils.UUID.compressUUID(uuid, false);
    }
    static decompressUUID(compressedUUID) {
        return Editor.Utils.UUID.decompressUUID(compressedUUID);
    }
    static fspathToUrl(path) {
        let projPath = Editor.Project.path;
        return path.replace(projPath + '\\', 'db://').replace('\\', '/');
    }
    static async urlToFspath(url) {
        return (await Editor.Message.request('asset-db', 'query-path', url));
    }
}
exports.default = EditorAPI;
