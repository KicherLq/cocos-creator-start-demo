"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EditorAPI {
    static async assetInfoByUUID(uuid) {
        return (await Editor.Message.request('asset-db', 'query-asset-info', uuid));
    }
    static isUUID(uuid) {
        return Editor.Utils.UUID.isUUID(uuid);
    }
    static generateUUID() {
        return Editor.Utils.UUID.decompressUUID(Editor.Utils.UUID.generate());
    }
    static compressUuid(uuid) {
        return Editor.Utils.UUID.compressUUID(uuid, false);
    }
    static decompressUUID(compressedUUID) {
        return Editor.Utils.UUID.decompressUUID(compressedUUID);
    }
    static async fspathToUrl(path) {
        return (await Editor.Message.request('asset-db', 'query-url', path)) || '';
    }
    static async urlToFspath(url) {
        return (await Editor.Message.request('asset-db', 'query-path', url)) || '';
    }
}
exports.default = EditorAPI;
