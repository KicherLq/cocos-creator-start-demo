"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtensionData = exports.ChatExtensionData = exports.RuleExtensionData = exports.PersonalInfoExtData = exports.ResourceExtensionData = exports.GameExtensionData = exports.HallExtensionData = exports.HallGameSlotProp = exports.HallMoregameSlotProp = exports.HallCustomSlotProp = exports.HallRoomSlotProp = exports.HallAreaSlotProp = exports.HallSlotProp = exports.SlotType = exports.HallSettingData = void 0;
class HallSettingData {
    constructor() {
        this.name = "";
        this.layoutCols = null;
        this.layoutType = "";
        this.platfromType = "";
        this.initViewType = 0;
        this.initRoomId = 0;
        this.showMoregame = false;
        this.showQuickStart = true;
        this.showRule = false;
        this.showRole = true;
        this.rolePrefabBoy = "";
        this.rolePrefabGirl = "";
        this.enableMusic = false;
        this.musicClip = "";
        this.backgroundPrefab = "";
        this.backgroundBottomImage = "";
        this.backtoFirstLayer = false;
        this.areaSpace = 100;
        this.isAreaCenterPostion = false;
        this.skewX = 0;
        this.limit_bout = 0;
        this.limit_days = 0;
    }
}
exports.HallSettingData = HallSettingData;
var SlotType;
(function (SlotType) {
    SlotType[SlotType["Area"] = 1] = "Area";
    SlotType[SlotType["Room"] = 2] = "Room";
    SlotType[SlotType["Custom"] = 3] = "Custom";
    SlotType[SlotType["Moregame"] = 4] = "Moregame";
    SlotType[SlotType["Game"] = 5] = "Game";
})(SlotType = exports.SlotType || (exports.SlotType = {}));
class HallSlotProp {
    constructor() {
        this.slotType = 0;
        this.col = 0;
        this.row = 0;
        this.tag = "";
        this.backgroundType = 0;
        this.backgroundImage = "";
        this.backgroundPrefab = "";
        this.backgroundUrl = "";
        this.nameImageAsset = "";
        this.markText = "";
        this.lock = false;
    }
}
exports.HallSlotProp = HallSlotProp;
class HallAreaSlotProp extends HallSlotProp {
    constructor() {
        super(...arguments);
        this.areaTypeId = 0;
    }
}
exports.HallAreaSlotProp = HallAreaSlotProp;
class HallRoomSlotProp extends HallSlotProp {
    constructor() {
        super(...arguments);
        this.roomTypeId = 0;
    }
}
exports.HallRoomSlotProp = HallRoomSlotProp;
class HallCustomSlotProp extends HallSlotProp {
    constructor() {
        super(...arguments);
        this.jumpId = 0;
    }
}
exports.HallCustomSlotProp = HallCustomSlotProp;
class HallMoregameSlotProp extends HallSlotProp {
    constructor() {
        super(...arguments);
        this.abbr = "";
    }
}
exports.HallMoregameSlotProp = HallMoregameSlotProp;
class HallGameSlotProp extends HallSlotProp {
    constructor() {
        super(...arguments);
        this.abbr = "";
        this.areaTypeId = 0;
        this.filterAreasTypeIds = [];
    }
}
exports.HallGameSlotProp = HallGameSlotProp;
class HallExtensionData {
    constructor() {
        this.setting = new HallSettingData;
        // 节点数据
        this.slots = [];
    }
}
exports.HallExtensionData = HallExtensionData;
class GameExtensionData {
    constructor() {
        this.frame1 = false;
        this.gameType = 0;
        this.currencyType = 0;
        this.enableGameSocketProxy = true;
        this.enableRoomSocketProxy = true;
        this.resolutionValue = 100;
    }
}
exports.GameExtensionData = GameExtensionData;
class ResourceExtensionData {
}
exports.ResourceExtensionData = ResourceExtensionData;
class PersonalInfoExtData {
    constructor() {
        this.showBout = true;
        this.showDeposit = true;
        this.showSafeBox = true;
        this.showScore = false;
        this.showPrestige = true;
        this.showJindou = false;
        this.customPrefab1 = "";
        this.customPrefab2 = "";
        this.customPrefab3 = "";
    }
}
exports.PersonalInfoExtData = PersonalInfoExtData;
class RuleExtensionData {
    constructor() {
        this.rules = ["", "", ""];
    }
}
exports.RuleExtensionData = RuleExtensionData;
class ChatExtensionData {
}
exports.ChatExtensionData = ChatExtensionData;
class ExtensionData {
    constructor() {
        this.game = new GameExtensionData;
        this.personalInfo = new PersonalInfoExtData;
        this.resouce = new ResourceExtensionData;
        this.chat = new ChatExtensionData;
        this.rules = [new RuleExtensionData, new RuleExtensionData, new RuleExtensionData, new RuleExtensionData, new RuleExtensionData, new RuleExtensionData];
        this.hall = [new HallExtensionData];
    }
}
exports.ExtensionData = ExtensionData;
//# sourceMappingURL=data:application/json;charset=utf8;base64,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QyxJQUFJLGlCQUFpQixFQUFDLElBQUksaUJBQWlCLEVBQUMsSUFBSSxpQkFBaUIsQ0FBQyxDQUFBO1FBQ2xLLFNBQUksR0FBeUIsQ0FBQyxJQUFJLGlCQUFpQixDQUFDLENBQUE7SUFDeEQsQ0FBQztDQUFBO0FBUEQsc0NBT0MiLCJmaWxlIjoiZXh0ZW5zaW9uZGF0YS5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBIYWxsU2V0dGluZ0RhdGEge1xyXG4gICAgbmFtZSAgICAgICAgICAgICA9IFwiXCJcclxuICAgIGxheW91dENvbHMgICAgICAgPSBudWxsXHJcbiAgICBsYXlvdXRUeXBlICAgICAgID0gXCJcIlxyXG4gICAgcGxhdGZyb21UeXBlICAgICA9IFwiXCJcclxuICAgIGluaXRWaWV3VHlwZSAgICAgPSAwXHJcbiAgICBpbml0Um9vbUlkICAgICAgID0gMFxyXG4gICAgc2hvd01vcmVnYW1lICAgICA9IGZhbHNlXHJcbiAgICBzaG93UXVpY2tTdGFydCAgID0gdHJ1ZVxyXG4gICAgc2hvd1J1bGUgICAgICAgICA9IGZhbHNlXHJcbiAgICBzaG93Um9sZSAgICAgICAgID0gdHJ1ZVxyXG4gICAgcm9sZVByZWZhYkJveSAgICA9IFwiXCJcclxuICAgIHJvbGVQcmVmYWJHaXJsICAgPSBcIlwiXHJcbiAgICBlbmFibGVNdXNpYyAgICAgID0gZmFsc2VcclxuICAgIG11c2ljQ2xpcCAgICAgICAgPSBcIlwiXHJcbiAgICBiYWNrZ3JvdW5kUHJlZmFiID0gXCJcIlxyXG4gICAgYmFja2dyb3VuZEJvdHRvbUltYWdlID0gXCJcIlxyXG4gICAgYmFja3RvRmlyc3RMYXllciA9IGZhbHNlXHJcbiAgICBhcmVhU3BhY2UgICAgICAgID0gMTAwXHJcbiAgICBpc0FyZWFDZW50ZXJQb3N0aW9uID0gZmFsc2VcclxuICAgIHNrZXdYID0gMFxyXG4gICAgbGltaXRfYm91dCA9IDBcclxuICAgIGxpbWl0X2RheXMgPSAwXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFNsb3RUeXBlIHtcclxuICAgIEFyZWEgPSAxLFxyXG4gICAgUm9vbSxcclxuICAgIEN1c3RvbSxcclxuICAgIE1vcmVnYW1lLFxyXG4gICAgR2FtZSxcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEhhbGxTbG90UHJvcCB7XHJcbiAgICBzbG90VHlwZSAgICAgICAgID0gMFxyXG4gICAgY29sICAgICAgICAgICAgICA9IDBcclxuICAgIHJvdyAgICAgICAgICAgICAgPSAwXHJcbiAgICB0YWcgICAgICAgICAgICAgID0gXCJcIlxyXG4gICAgYmFja2dyb3VuZFR5cGUgICA9IDBcclxuICAgIGJhY2tncm91bmRJbWFnZSAgPSBcIlwiXHJcbiAgICBiYWNrZ3JvdW5kUHJlZmFiID0gXCJcIlxyXG4gICAgYmFja2dyb3VuZFVybCAgICA9IFwiXCJcclxuICAgIG5hbWVJbWFnZUFzc2V0ICAgPSBcIlwiXHJcbiAgICBtYXJrVGV4dCAgICAgICAgID0gXCJcIlxyXG4gICAgbG9jayAgICAgICAgICAgICA9IGZhbHNlXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBIYWxsQXJlYVNsb3RQcm9wIGV4dGVuZHMgSGFsbFNsb3RQcm9wIHtcclxuICAgIGFyZWFUeXBlSWQgICAgICAgICA9IDBcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEhhbGxSb29tU2xvdFByb3AgZXh0ZW5kcyBIYWxsU2xvdFByb3Age1xyXG4gICAgcm9vbVR5cGVJZCAgICAgICAgICA9IDBcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEhhbGxDdXN0b21TbG90UHJvcCBleHRlbmRzIEhhbGxTbG90UHJvcCB7XHJcbiAgICBqdW1wSWQgPSAwXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBIYWxsTW9yZWdhbWVTbG90UHJvcCBleHRlbmRzIEhhbGxTbG90UHJvcCB7XHJcbiAgICBhYmJyID0gXCJcIlxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgSGFsbEdhbWVTbG90UHJvcCBleHRlbmRzIEhhbGxTbG90UHJvcCB7XHJcbiAgICBhYmJyID0gXCJcIlxyXG4gICAgYXJlYVR5cGVJZCA9IDBcclxuICAgIGZpbHRlckFyZWFzVHlwZUlkcyA9IFtdXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBIYWxsRXh0ZW5zaW9uRGF0YSB7XHJcbiAgICBzZXR0aW5nIDogSGFsbFNldHRpbmdEYXRhID0gbmV3IEhhbGxTZXR0aW5nRGF0YVxyXG5cclxuICAgIC8vIOiKgueCueaVsOaNrlxyXG4gICAgc2xvdHMgOiBIYWxsU2xvdFByb3BbXSA9IFtdXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBHYW1lRXh0ZW5zaW9uRGF0YSB7XHJcbiAgICBmcmFtZTEgPSBmYWxzZVxyXG4gICAgZ2FtZVR5cGUgPSAwXHJcbiAgICBjdXJyZW5jeVR5cGUgPSAwXHJcbiAgICBlbmFibGVHYW1lU29ja2V0UHJveHkgPSB0cnVlXHJcbiAgICBlbmFibGVSb29tU29ja2V0UHJveHkgPSB0cnVlXHJcbiAgICByZXNvbHV0aW9uVmFsdWUgPSAxMDBcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFJlc291cmNlRXh0ZW5zaW9uRGF0YSB7XHJcbiAgICBnYW1lSWNvbiA6IHN0cmluZ1xyXG4gICAgcG9ydHJhaXRCb3lTIDogc3RyaW5nXHJcbiAgICBwb3J0cmFpdEJveU0gOiBzdHJpbmdcclxuICAgIHBvcnRyYWl0R2lybFMgOiBzdHJpbmdcclxuICAgIHBvcnRyYWl0R2lybE0gOiBzdHJpbmdcclxuICAgIGFyZWFUaXRsZUZvbnQgOiBzdHJpbmdbXVxyXG4gICAgcm9vbVRpdGxlRm9udDEgOiBzdHJpbmdbXVxyXG4gICAgcm9vbVRpdGxlRm9udDIgOiBzdHJpbmdbXVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUGVyc29uYWxJbmZvRXh0RGF0YSB7XHJcbiAgICBzaG93Qm91dCAgICAgOiBib29sZWFuID0gdHJ1ZVxyXG4gICAgc2hvd0RlcG9zaXQgIDogYm9vbGVhbiA9IHRydWVcclxuICAgIHNob3dTYWZlQm94ICA6IGJvb2xlYW4gPSB0cnVlXHJcbiAgICBzaG93U2NvcmUgICAgOiBib29sZWFuID0gZmFsc2VcclxuICAgIHNob3dQcmVzdGlnZSA6IGJvb2xlYW4gPSB0cnVlXHJcbiAgICBzaG93SmluZG91ICAgOiBib29sZWFuID0gZmFsc2VcclxuXHJcbiAgICBjdXN0b21QcmVmYWIxIDogc3RyaW5nID0gXCJcIlxyXG4gICAgY3VzdG9tUHJlZmFiMiA6IHN0cmluZyA9IFwiXCJcclxuICAgIGN1c3RvbVByZWZhYjMgOiBzdHJpbmcgPSBcIlwiXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBSdWxlRXh0ZW5zaW9uRGF0YSB7XHJcbiAgICBydWxlcyA6IHN0cmluZ1tdID0gW1wiXCIsXCJcIixcIlwiXVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ2hhdEV4dGVuc2lvbkRhdGEge1xyXG4gICAgbWFuUGhyYXNlIDogc3RyaW5nXHJcbiAgICBmZW1hbGVQaHJhc2UgOiBzdHJpbmdcclxuICAgIHJpZ2h0U2hvd0ZsYWcgOiBib29sZWFuXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBFeHRlbnNpb25EYXRhIHtcclxuICAgIGdhbWUgID0gbmV3IEdhbWVFeHRlbnNpb25EYXRhXHJcbiAgICBwZXJzb25hbEluZm8gPSBuZXcgUGVyc29uYWxJbmZvRXh0RGF0YVxyXG4gICAgcmVzb3VjZSAgPSBuZXcgUmVzb3VyY2VFeHRlbnNpb25EYXRhXHJcbiAgICBjaGF0ID0gbmV3IENoYXRFeHRlbnNpb25EYXRhXHJcbiAgICBydWxlczogUnVsZUV4dGVuc2lvbkRhdGFbXSA9IFtuZXcgUnVsZUV4dGVuc2lvbkRhdGEsbmV3IFJ1bGVFeHRlbnNpb25EYXRhLG5ldyBSdWxlRXh0ZW5zaW9uRGF0YSxuZXcgUnVsZUV4dGVuc2lvbkRhdGEsbmV3IFJ1bGVFeHRlbnNpb25EYXRhLG5ldyBSdWxlRXh0ZW5zaW9uRGF0YV1cclxuICAgIGhhbGwgOiBIYWxsRXh0ZW5zaW9uRGF0YVtdID0gW25ldyBIYWxsRXh0ZW5zaW9uRGF0YV1cclxufSJdfQ==
