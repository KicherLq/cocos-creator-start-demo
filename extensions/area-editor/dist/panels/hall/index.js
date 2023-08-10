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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ready = exports.close = exports.beforeClose = exports.listeners = exports.methods = exports.$ = exports.style = exports.template = void 0;
const extensiondata_1 = require("../../extensiondata");
const utils_1 = require("../../utils");
const styleconfig_1 = require("./styleconfig");
const os = require('os');
const fs = require('fs');
const path = require('path');
let hallConfig;
let slotDivMap = {};
let curSlotProp = null;
// html 文本
exports.template = fs.readFileSync(path.join(utils_1.EXTENSION_PATH, 'static', "template", "hall", 'index.html'), { encoding: 'utf-8' });
// 样式文本
exports.style = fs.readFileSync(path.join(utils_1.EXTENSION_PATH, 'static', "style", 'base-style.css'), { encoding: 'utf-8' }) +
    fs.readFileSync(path.join(utils_1.EXTENSION_PATH, 'static', "style", 'default', 'index.css'), { encoding: 'utf-8' });
// 渲染后 html 选择器
exports.$ = {
    panel: `#generate-panel`,
    textureWidth: '#texture-width',
    configChoose: '#ConfigChoose',
    saveBtn: '#save-btn',
    newBtn: '#new-btn',
    newfromBtn: '#newfrom-btn',
    delBtn: '#del-btn',
    checkMusic: '#checkMusic',
    musicAsset: '#musicAsset',
    checkMoregame: '#checkMoregame',
    checkQuickStart: '#checkQuickStart',
    checkShowRule: '#checkShowRule',
    checkShowRole: '#checkShowRole',
    checkBackToFirstLayer: '#checkBackToFirstLayer',
    rolePrefabAsset1: '#rolePrefabAsset1',
    rolePrefabAsset2: '#rolePrefabAsset2',
    backgroundAsset: '#backgroundAsset',
    backgroundBottomImage: '#backgroundBottomImage',
    checkAreaCenter: '#checkAreaCenter',
    inputAreaSpace: '#inputAreaSpace',
    inputSkewX: '#inputSkewX',
    prop: '#prop',
    areaProp: '#areaProp',
    roomProp: '#roomProp',
    customProp: '#customProp',
    moregameProp: '#moregameProp',
    gameProp: '#gameProp',
    shareProp: '#shareProp',
    propAssetType: '#propAssetType',
    propImageAsset: '#propImageAsset',
    propPrefabAsset: '#propPrefabAsset',
    propRemoteImageAsset: '#propRemoteImageAsset',
    propImageUrl: '#propImageUrl',
    propRemoteImage: '#propRemoteImage',
    divRolePrefab: '#divRolePrefab',
    divAreaLayout: '#divAreaLayout',
    col1: '#col1',
    col2: '#col2',
    col3: '#col3',
    inputName: '#inputName',
    showStyle: '#show-style',
    limit_platform_tcy: '#limit_platform_tcy',
    limit_platform_platformset: '#limit_platform_platformset',
    limit_platform_platformsettcy: '#limit_platform_platformsettcy',
    limit_platform_minigame: '#limit_platform_minigame',
    limit_platform_minigameios: '#limit_platform_minigameios',
    limit_bout: '#limit_bout',
    limit_createdays: '#limit_createdays',
    limit_totalpay: '#limit_totalpay',
    dragArea: '#dragArea',
    dragRoom: '#dragRoom',
    dragCustom: '#dragCustom',
    dragMoregame: '#dragMoregame',
    dragGame: '#dragGame',
    fieldType: '#field-type',
    // 区域属性
    areaPropAreaTypeId: '#areaPropAreaTypeId',
    areaPropDefaultArea: '#areaPropDefaultArea',
    areaPropScoreArea: '#areaPropScoreArea',
    // 房间属性
    roomPropAreaTypeId: '#roomPropAreaTypeId',
    roomPropRoomTypeId: '#roomPropRoomTypeId',
    // 自定义属性
    customPropJumpId: '#customPropJumpId',
    // 联运属性
    moregamePropUrl: '#moregamePropUrl',
    moregamePropSlotSize: '#moregamePropSlotSize',
    // 游戏属性
    gamePropAbbr: '#gamePropAbbr',
};
// 面板上的方法
exports.methods = {};
// 面板上触发的事件
exports.listeners = {
    /**
     * 面板隐藏的时候触发
     */
    hide() {
        // console.log(this.hidden);
    },
    /**
     * 面板显示的时候触发
     */
    show() {
        // console.log(this.hidden);
    },
    /**
     * 面板大小更改的时候触发
     */
    resize() {
        // console.log(this.clientHeight);
        // console.log(this.clientWidth);
    }
};
// 尝试关闭面板的时候触发
function beforeClose() {
    return __awaiter(this, void 0, void 0, function* () { });
}
exports.beforeClose = beforeClose;
// 当面板实际关闭后触发
function close() {
    return __awaiter(this, void 0, void 0, function* () { });
}
exports.close = close;
// 当面板渲染成功后触发
function ready() {
    return __awaiter(this, void 0, void 0, function* () {
        initCommonSetting.call(this);
        initCommonPropSetting.call(this);
        initAreaPropSetting.call(this);
        initRoomPropSetting.call(this);
        initCustomPropSetting.call(this);
        initMoregamePropSetting.call(this);
        initGamePropSetting.call(this);
        // 隐藏属性面板
        hideProperties.call(this);
        // 响应拖放
        this.$.dragArea.ondragstart = (e) => {
            e.dataTransfer.setData('value', "area");
        };
        this.$.dragRoom.ondragstart = (e) => {
            e.dataTransfer.setData('value', "room");
        };
        this.$.dragCustom.ondragstart = (e) => {
            e.dataTransfer.setData('value', "custom");
        };
        this.$.dragMoregame.ondragstart = (e) => {
            e.dataTransfer.setData('value', "moregame");
        };
        this.$.dragGame.ondragstart = (e) => {
            e.dataTransfer.setData('value', "game");
        };
        this.$.saveBtn.onclick = () => __awaiter(this, void 0, void 0, function* () {
            utils_1.saveExtensionConfig();
            const config = {
                title: "提示",
                buttons: ["确定"]
            };
            yield Editor.Dialog.info("保存成功", config);
        });
        this.$.newBtn.onclick = () => {
            const econfig = utils_1.getExtensionConfig();
            if (econfig.hall.length >= 20) {
                console.log("maximum configs");
                return;
            }
            econfig.hall.push(new extensiondata_1.HallExtensionData);
            updateConfigSection.call(this);
        };
        this.$.newfromBtn.onclick = () => {
            const econfig = utils_1.getExtensionConfig();
            if (econfig.hall.length >= 20) {
                console.log("maximum configs");
                return;
            }
            // 是否有拷贝的数据源
            let data = utils_1.deepCopy(econfig.hall.find((x) => x.setting.name == hallConfig.setting.name));
            data.setting.name += "_x";
            econfig.hall.push(data);
            updateConfigSection.call(this);
        };
        this.$.delBtn.onclick = () => {
            const econfig = utils_1.getExtensionConfig();
            if (econfig.hall.length == 1) {
                console.log("minimum configs");
                return;
            }
            econfig.hall.splice(this.$.configChoose.value, 1);
            updateConfigSection.call(this);
            showConfigFile.call(this, 0);
        };
        this.$.configChoose.onchange = () => {
            console.log("switch to config", this.$.configChoose.value);
            showConfigFile.call(this, this.$.configChoose.value);
            hideProperties.call(this);
        };
        updateConfigSection.call(this);
        showConfigFile.call(this, 0);
    });
}
exports.ready = ready;
function updateConfigSection() {
    const econfig = utils_1.getExtensionConfig();
    for (let i = this.$.configChoose.children.length - 1; i >= 0; i--) {
        this.$.configChoose.children[i].remove();
    }
    for (let i = 0; i < econfig.hall.length; i++) {
        let node = document.createElement('ui-button');
        node.textContent = `配置${i + 1}`;
        this.$.configChoose.appendChild(node);
    }
}
function showConfigFile(idx) {
    const econfig = utils_1.getExtensionConfig();
    let config = econfig.hall[idx];
    if (config) {
        if (config == hallConfig) {
            return;
        }
        hallConfig = config;
        config.setting.layoutCols = styleconfig_1.StyleConfig[config.setting.layoutType];
        this.$.showStyle.value = config.setting.layoutType;
        let platfromTypes = config.setting.platfromType.split(',');
        this.$.limit_platform_tcy.value = false;
        this.$.limit_platform_platformset.value = false;
        this.$.limit_platform_platformsettcy.value = false;
        this.$.limit_platform_minigame.value = false;
        this.$.limit_platform_minigameios.value = false;
        if (platfromTypes.includes("tcy")) {
            this.$.limit_platform_tcy.value = true;
        }
        if (platfromTypes.includes("platformset")) {
            this.$.limit_platform_platformset.value = true;
        }
        if (platfromTypes.includes("platformsettcy")) {
            this.$.limit_platform_platformsettcy.value = true;
        }
        if (platfromTypes.includes("minigame")) {
            this.$.limit_platform_minigame.value = true;
        }
        if (platfromTypes.includes("minigameios")) {
            this.$.limit_platform_minigameios.value = true;
        }
        this.$.limit_bout.value = config.setting.limit_bout || 0;
        this.$.limit_createdays.value = config.setting.limit_days || 0;
        createEntrySlots.call(this, styleconfig_1.StyleConfig[config.setting.layoutType]);
        this.$.inputName.value = config.setting.name;
        this.$.checkMoregame.value = config.setting.showMoregame;
        this.$.checkQuickStart.value = config.setting.showQuickStart;
        this.$.checkShowRule.value = config.setting.showRule;
        this.$.checkShowRole.value = config.setting.showRole;
        this.$.checkBackToFirstLayer.value = config.setting.backtoFirstLayer;
        this.$.divRolePrefab.hidden = !this.$.checkShowRole.value;
        this.$.divAreaLayout.hidden = this.$.checkShowRole.value;
        this.$.rolePrefabAsset1.value = hallConfig.setting.rolePrefabBoy || "";
        this.$.rolePrefabAsset2.value = hallConfig.setting.rolePrefabGirl || "";
        this.$.inputAreaSpace.value = hallConfig.setting.areaSpace || 100;
        this.$.checkAreaCenter.value = hallConfig.setting.isAreaCenterPostion || false;
        this.$.checkMusic.value = hallConfig.setting.enableMusic;
        this.$.musicAsset.value = hallConfig.setting.musicClip;
        this.$.musicAsset.hidden = !this.$.checkMusic.value;
        this.$.backgroundAsset.value = hallConfig.setting.backgroundPrefab;
        this.$.backgroundBottomImage.value = hallConfig.setting.backgroundBottomImage;
        this.$.inputSkewX.value = hallConfig.setting.skewX;
        hallConfig.slots.forEach((prop) => {
            let $div = slotDivMap[`slot-${prop.col}:${prop.row}`];
            if ($div) {
                showSlot.call(this, $div, prop);
            }
        });
    }
}
function createEntrySlots(config) {
    let cols = [this.$.col1, this.$.col2, this.$.col3];
    cols.forEach(($col) => {
        for (let i = $col.children.length - 1; i >= 0; i--) {
            $col.children[i].remove();
        }
    });
    slotDivMap = {};
    // 重新创建节点
    if (config) {
        let c = 0;
        cols.forEach(($col) => {
            for (let r = 0; r < config[c]; r++) {
                let $div = document.createElement("div");
                $div.className = `slot${config[c]}`;
                $col.appendChild($div);
                let key = `slot-${c}:${r}`;
                slotDivMap[key] = $div;
                createEntrySlotsForColRow.call(this, $div, c, r);
            }
            c++;
        });
    }
}
function createEntrySlotsForColRow($div, colIndex, rowIndex) {
    let nodeDragArea = document.createElement('ui-drag-area');
    nodeDragArea.className = "dragarea";
    nodeDragArea.setAttribute("droppable", "type-a");
    nodeDragArea.textContent = "拖动节点到这里";
    nodeDragArea.id = `dropArea${colIndex}:${rowIndex}`;
    $div.appendChild(nodeDragArea);
    let nodeAddIcon = document.createElement('ui-addicon');
    nodeAddIcon.setAttribute("color", "true");
    nodeAddIcon.setAttribute("value", "add");
    $div.appendChild(nodeAddIcon);
    nodeDragArea.ondrop = (e) => {
        let dropWhat = e.dataTransfer.getData('value');
        let slotProp;
        switch (dropWhat) {
            case "area":
                slotProp = new extensiondata_1.HallAreaSlotProp;
                slotProp.slotType = extensiondata_1.SlotType.Area;
                break;
            case "room":
                slotProp = new extensiondata_1.HallRoomSlotProp;
                slotProp.slotType = extensiondata_1.SlotType.Room;
                break;
            case "moregame":
                slotProp = new extensiondata_1.HallMoregameSlotProp;
                slotProp.slotType = extensiondata_1.SlotType.Moregame;
                break;
            case "game":
                slotProp = new extensiondata_1.HallGameSlotProp;
                slotProp.slotType = extensiondata_1.SlotType.Game;
                break;
            case "custom":
                slotProp = new extensiondata_1.HallCustomSlotProp;
                slotProp.slotType = extensiondata_1.SlotType.Custom;
                break;
        }
        slotProp.col = colIndex;
        slotProp.row = rowIndex;
        hallConfig.slots.push(slotProp);
        showSlot.call(this, $div, slotProp);
    };
}
function showSlot($div, slotProp) {
    let nodeAddIcon = $div.getElementsByTagName("ui-addicon")[0];
    if (nodeAddIcon) {
        nodeAddIcon.remove();
    }
    let nodeDragArea = $div.getElementsByTagName("ui-drag-area")[0];
    if (nodeDragArea) {
        nodeDragArea.remove();
    }
    let dropWhat = "";
    switch (slotProp.slotType) {
        case extensiondata_1.SlotType.Area:
            dropWhat = "area";
            break;
        case extensiondata_1.SlotType.Room:
            dropWhat = "room";
            break;
        case extensiondata_1.SlotType.Custom:
            dropWhat = "custom";
            break;
        case extensiondata_1.SlotType.Moregame:
            dropWhat = "moregame";
            break;
        case extensiondata_1.SlotType.Game:
            dropWhat = "game";
            break;
    }
    // 创建按钮
    let $slotButton = document.createElement('ui-button');
    $slotButton.className = `${dropWhat}-slot`;
    $slotButton.textContent = '';
    $div.appendChild($slotButton);
    // 删除按钮
    let $delButton = document.createElement('ui-button');
    let $delIcon = document.createElement('ui-icon');
    $delIcon.setAttribute("color", "normal");
    $delIcon.setAttribute("value", "del");
    $delButton.appendChild($delIcon);
    $slotButton.appendChild($delButton);
    // 信息显示
    let $label1 = document.createElement('ui-label');
    $label1.setAttribute("value", dropWhat);
    $label1.setAttribute("style", "align-items: center; display: flex; justify-content: center;");
    $slotButton.appendChild($label1);
    let $label2 = document.createElement('ui-label');
    $label2.setAttribute("value", "");
    $label2.setAttribute("style", "align-items: center; display: flex; justify-content: center;");
    $slotButton.appendChild($label2);
    $label2.hidden = true;
    let deleted = false;
    $delButton.onclick = () => {
        deleted = true;
        let idx = hallConfig.slots.indexOf(slotProp);
        console.log("remove idx", idx);
        hallConfig.slots.splice(idx, 1);
        hideProperties.call(this);
        $slotButton.remove();
        createEntrySlotsForColRow.call(this, $div, slotProp.col, slotProp.row);
    };
    // 点击显示属性
    $slotButton.onclick = () => {
        if (deleted) {
            return;
        }
        for (let i = 0; i < this.$.prop.children.length; i++) {
            this.$.prop.children[i].hidden = true;
        }
        this.$.shareProp.hidden = false;
        curSlotProp = slotProp;
        showCommonProperties.call(this);
        switch (dropWhat) {
            case "area":
                showAreaProperties.call(this);
                break;
            case "room":
                showRoomProperties.call(this);
                break;
            case "custom":
                showCustomProperties.call(this);
                break;
            case "moregame":
                showMoregameProperties.call(this);
                break;
            case "game":
                showGameProperties.call(this);
                break;
        }
    };
}
function initCommonSetting() {
    this.$.inputName.onkeyup = () => {
        this.$.inputName.setAttribute("value", this.$.inputName.value.replace(/[^a-zA-Z_0-9]/g, ''));
        hallConfig.setting.name = this.$.inputName.value;
    };
    let id = 0;
    for (let item in styleconfig_1.StyleConfig) {
        id = id + 1;
        let node = document.createElement('option');
        node.value = item;
        node.label = item;
        this.$.showStyle.appendChild(node);
    }
    this.$.checkMusic.onchange = () => {
        this.$.musicAsset.hidden = !this.$.checkMusic.value;
        hallConfig.setting.enableMusic = this.$.checkMusic.value;
    };
    this.$.showStyle.onchange = () => {
        hallConfig.setting.layoutType = this.$.showStyle.value;
        hallConfig.setting.layoutCols = styleconfig_1.StyleConfig[this.$.showStyle.value];
        hallConfig.slots = [];
        // 根据入口配置创建入口位置
        let config = styleconfig_1.StyleConfig[this.$.showStyle.value];
        if (config) {
            createEntrySlots.call(this, config);
        }
    };
    let updatePlatformType = () => {
        let t = [];
        if (this.$.limit_platform_tcy.value) {
            t.push("tcy");
        }
        if (this.$.limit_platform_platformset.value) {
            t.push("platformset");
        }
        if (this.$.limit_platform_platformsettcy.value) {
            t.push("platformsettcy");
        }
        if (this.$.limit_platform_minigame.value) {
            t.push("minigame");
        }
        if (this.$.limit_platform_minigameios.value) {
            t.push("minigameios");
        }
        return t.join(",");
    };
    this.$.limit_platform_tcy.onchange = () => {
        hallConfig.setting.platfromType = updatePlatformType();
    };
    this.$.limit_platform_platformset.onchange = () => {
        hallConfig.setting.platfromType = updatePlatformType();
    };
    this.$.limit_platform_platformsettcy.onchange = () => {
        hallConfig.setting.platfromType = updatePlatformType();
    };
    this.$.limit_platform_minigame.onchange = () => {
        hallConfig.setting.platfromType = updatePlatformType();
    };
    this.$.limit_platform_minigameios.onchange = () => {
        hallConfig.setting.platfromType = updatePlatformType();
    };
    this.$.limit_bout.onchange = () => {
        hallConfig.setting.limit_bout = this.$.limit_bout.value;
    };
    this.$.limit_createdays.onchange = () => {
        hallConfig.setting.limit_days = this.$.limit_createdays.value;
    };
    this.$.checkMoregame.onchange = () => {
        hallConfig.setting.showMoregame = this.$.checkMoregame.value;
    };
    this.$.checkQuickStart.onchange = () => {
        hallConfig.setting.showQuickStart = this.$.checkQuickStart.value;
    };
    this.$.checkShowRule.onchange = () => {
        hallConfig.setting.showRule = this.$.checkShowRule.value;
    };
    this.$.checkShowRole.onchange = () => {
        hallConfig.setting.showRole = this.$.checkShowRole.value;
        this.$.divRolePrefab.hidden = !this.$.checkShowRole.value;
        this.$.divAreaLayout.hidden = this.$.checkShowRole.value;
    };
    this.$.checkShowRule.onchange = () => {
        hallConfig.setting.showRule = this.$.checkShowRule.value;
    };
    this.$.checkBackToFirstLayer.onchange = () => {
        hallConfig.setting.backtoFirstLayer = this.$.checkBackToFirstLayer.value;
    };
    this.$.rolePrefabAsset1.onchange = () => {
        hallConfig.setting.rolePrefabBoy = this.$.rolePrefabAsset1.value;
    };
    this.$.rolePrefabAsset2.onchange = () => {
        hallConfig.setting.rolePrefabGirl = this.$.rolePrefabAsset2.value;
    };
    this.$.checkAreaCenter.onchange = () => {
        hallConfig.setting.isAreaCenterPostion = this.$.checkAreaCenter.value;
    };
    this.$.inputAreaSpace.onchange = () => {
        hallConfig.setting.areaSpace = this.$.inputAreaSpace.value;
    };
    this.$.musicAsset.onchange = () => {
        hallConfig.setting.musicClip = this.$.musicAsset.value;
    };
    this.$.backgroundAsset.onchange = () => {
        hallConfig.setting.backgroundPrefab = this.$.backgroundAsset.value;
    };
    this.$.backgroundBottomImage.onchange = () => {
        hallConfig.setting.backgroundBottomImage = this.$.backgroundBottomImage.value;
    };
    this.$.inputSkewX.onchange = () => {
        hallConfig.setting.skewX = this.$.inputSkewX.value;
    };
}
function initCommonPropSetting() {
    this.$.propPrefabAsset.hidden = true;
    this.$.propRemoteImageAsset.hidden = true;
    this.$.propAssetType.onchange = () => {
        this.$.propImageAsset.hidden = true;
        this.$.propPrefabAsset.hidden = true;
        this.$.propRemoteImageAsset.hidden = true;
        if (this.$.propAssetType.value == "image") {
            this.$.propImageAsset.hidden = false;
            if (curSlotProp) {
                curSlotProp.backgroundType = 0;
            }
        }
        if (this.$.propAssetType.value == "prefab") {
            this.$.propPrefabAsset.hidden = false;
            if (curSlotProp) {
                curSlotProp.backgroundType = 1;
            }
        }
        if (this.$.propAssetType.value == "remoteimage") {
            this.$.propRemoteImageAsset.hidden = false;
            if (curSlotProp) {
                curSlotProp.backgroundType = 2;
            }
        }
    };
    this.$.propImageAsset.onchange = () => {
        if (curSlotProp) {
            curSlotProp.backgroundImage = this.$.propImageAsset.value;
        }
    };
    this.$.propPrefabAsset.onchange = () => {
        if (curSlotProp) {
            curSlotProp.backgroundPrefab = this.$.propPrefabAsset.value;
        }
    };
    this.$.propImageUrl.onchange = () => {
        this.$.propRemoteImage.setAttribute("value", this.$.propImageUrl.value);
        if (curSlotProp) {
            curSlotProp.backgroundUrl = this.$.propImageUrl.value;
        }
    };
}
function initAreaPropSetting() {
    this.$.areaPropAreaTypeId.onchange = () => {
        if (curSlotProp) {
            curSlotProp.areaTypeId = this.$.areaPropAreaTypeId.value;
        }
    };
    this.$.areaPropDefaultArea.onchange = () => {
        if (curSlotProp) {
            curSlotProp.isDefaultArea = this.$.areaPropDefaultArea.value ? 1 : 0;
        }
    };
    this.$.areaPropScoreArea.onchange = () => {
        if (curSlotProp) {
            curSlotProp.isScoreArea = this.$.areaPropScoreArea.value ? 1 : 0;
        }
    };
}
function initRoomPropSetting() {
    this.$.roomPropRoomTypeId.onchange = () => {
        if (curSlotProp) {
            curSlotProp.roomTypeId = this.$.roomPropRoomTypeId.value;
        }
    };
    this.$.roomPropAreaTypeId.onchange = () => {
        if (curSlotProp) {
            curSlotProp.areaTypeId = this.$.roomPropAreaTypeId.value;
        }
    };
}
function initCustomPropSetting() {
    this.$.customPropJumpId.onchange = () => {
        if (curSlotProp) {
            curSlotProp.jumpId = this.$.customPropJumpId.value;
        }
    };
}
function initMoregamePropSetting() {
    this.$.moregamePropUrl.onchange = () => {
        if (curSlotProp) {
            curSlotProp.abbr = this.$.moregamePropUrl.value;
        }
    };
    this.$.moregamePropSlotSize.onchange = () => {
        if (curSlotProp) {
            curSlotProp.slotSize = parseInt(this.$.moregamePropSlotSize.value);
        }
    };
}
function initGamePropSetting() {
    this.$.gamePropAbbr.onchange = () => {
        if (curSlotProp) {
            curSlotProp.abbr = this.$.gamePropAbbr.value;
        }
    };
}
function hideProperties() {
    this.$.prop.header = "节点属性";
    for (let i = 0; i < this.$.prop.children.length; i++) {
        this.$.prop.children[i].hidden = true;
    }
}
function showCommonProperties() {
    this.$.propImageAsset.hidden = true;
    this.$.propPrefabAsset.hidden = true;
    this.$.propRemoteImageAsset.hidden = true;
    this.$.propAssetType.value = "image";
    switch (curSlotProp.backgroundType) {
        case 0:
            // 图片
            this.$.propImageAsset.hidden = false;
            this.$.propAssetType.value = "image";
            break;
        case 1:
            // 预制体
            this.$.propPrefabAsset.hidden = false;
            this.$.propAssetType.value = "prefab";
            break;
        case 2:
            // WEB图片
            this.$.propRemoteImageAsset.hidden = false;
            this.$.propAssetType.value = "remoteimage";
            break;
    }
    this.$.propImageAsset.value = curSlotProp.backgroundImage || "";
    this.$.propPrefabAsset.value = curSlotProp.backgroundPrefab || "";
    if (curSlotProp.backgroundUrl) {
        this.$.propImageUrl.value = curSlotProp.backgroundUrl;
        this.$.propRemoteImage.setAttribute("value", this.$.propImageUrl.value);
    }
    else {
        this.$.propImageUrl.value = "";
        this.$.propRemoteImage.setAttribute("value", "");
    }
}
/**
 * 大区入口属性
 */
function showAreaProperties() {
    this.$.prop.header = "节点属性-区域";
    this.$.areaProp.hidden = false;
    this.$.areaPropAreaTypeId.value = curSlotProp.areaTypeId;
    this.$.areaPropDefaultArea.value = curSlotProp.isDefaultArea ? true : false;
    this.$.areaPropScoreArea.value = curSlotProp.isScoreArea ? true : false;
}
/**
 * 房间入口属性
 */
function showRoomProperties() {
    this.$.prop.header = "节点属性-房间";
    this.$.roomProp.hidden = false;
    this.$.roomPropRoomTypeId.value = curSlotProp.roomTypeId || 0;
    this.$.roomPropAreaTypeId.value = curSlotProp.areaTypeId || 0;
}
/**
 * 自定义入口属性
 */
function showCustomProperties() {
    this.$.prop.header = "节点属性-自定义";
    this.$.customProp.hidden = false;
    this.$.customPropJumpId.value = curSlotProp.jumpId;
}
/**
 * 联运游戏属性
 */
function showMoregameProperties() {
    this.$.prop.header = "节点属性-联运";
    this.$.moregameProp.hidden = false;
    this.$.moregamePropUrl.value = curSlotProp.abbr;
    this.$.moregamePropSlotSize.value = curSlotProp.slotSize || 0;
}
/**
 * 游戏跳转属性
 */
function showGameProperties() {
    this.$.prop.header = "节点属性-游戏";
    this.$.gameProp.hidden = false;
    this.$.gamePropAbbr.value = curSlotProp.abbr;
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,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L2luZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSGFsbEFyZWFTbG90UHJvcCwgSGFsbEN1c3RvbVNsb3RQcm9wLCBIYWxsRXh0ZW5zaW9uRGF0YSwgSGFsbEdhbWVTbG90UHJvcCwgSGFsbE1vcmVnYW1lU2xvdFByb3AsIEhhbGxSb29tU2xvdFByb3AsIEhhbGxTbG90UHJvcCwgU2xvdFR5cGUgfSBmcm9tICcuLi8uLi9leHRlbnNpb25kYXRhJztcbmltcG9ydCB7IEVYVEVOU0lPTl9QQVRILCBleGVDb21tYW5kLCBnZXRFeHRlbnNpb25Db25maWcsIGdldEdhbWVQYWNrcywgQXNzZXREQiwgc2F2ZUV4dGVuc2lvbkNvbmZpZywgZGVlcENvcHkgfSBmcm9tICcuLi8uLi91dGlscyc7XG5pbXBvcnQgeyBTdHlsZUNvbmZpZyB9IGZyb20gJy4vc3R5bGVjb25maWcnO1xuXG5jb25zdCBvcyA9IHJlcXVpcmUoJ29zJyk7XG5jb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuXG5sZXQgaGFsbENvbmZpZyA6IEhhbGxFeHRlbnNpb25EYXRhXG5sZXQgc2xvdERpdk1hcCA9IHt9XG5sZXQgY3VyU2xvdFByb3AgOiBhbnkgPSBudWxsXG5cbi8vIGh0bWwg5paH5pysXG5leHBvcnQgY29uc3QgdGVtcGxhdGUgPSAgZnMucmVhZEZpbGVTeW5jKHBhdGguam9pbihFWFRFTlNJT05fUEFUSCwgJ3N0YXRpYycsXCJ0ZW1wbGF0ZVwiLFwiaGFsbFwiLCdpbmRleC5odG1sJyksIHsgZW5jb2Rpbmc6ICd1dGYtOCcgfSlcblxuLy8g5qC35byP5paH5pysXG5leHBvcnQgY29uc3Qgc3R5bGUgPVxuICAgIGZzLnJlYWRGaWxlU3luYyhwYXRoLmpvaW4oRVhURU5TSU9OX1BBVEgsJ3N0YXRpYycsXCJzdHlsZVwiLCdiYXNlLXN0eWxlLmNzcycpLCB7IGVuY29kaW5nOiAndXRmLTgnIH0pICtcbiAgICBmcy5yZWFkRmlsZVN5bmMocGF0aC5qb2luKEVYVEVOU0lPTl9QQVRILCAnc3RhdGljJyxcInN0eWxlXCIsJ2RlZmF1bHQnLCdpbmRleC5jc3MnKSwgeyBlbmNvZGluZzogJ3V0Zi04JyB9KVxuXG4vLyDmuLLmn5PlkI4gaHRtbCDpgInmi6nlmahcbmV4cG9ydCBjb25zdCAkID0ge1xuICAgIHBhbmVsOiBgI2dlbmVyYXRlLXBhbmVsYCxcbiAgICB0ZXh0dXJlV2lkdGg6ICcjdGV4dHVyZS13aWR0aCcsXG5cbiAgICBjb25maWdDaG9vc2UgOiAnI0NvbmZpZ0Nob29zZScsXG5cbiAgICBzYXZlQnRuOiAnI3NhdmUtYnRuJyxcbiAgICBuZXdCdG4gOiAnI25ldy1idG4nLFxuICAgIG5ld2Zyb21CdG4gOiAnI25ld2Zyb20tYnRuJyxcbiAgICBkZWxCdG4gOiAnI2RlbC1idG4nLFxuXG4gICAgY2hlY2tNdXNpYyA6ICcjY2hlY2tNdXNpYycsXG4gICAgbXVzaWNBc3NldCA6ICcjbXVzaWNBc3NldCcsXG4gICAgY2hlY2tNb3JlZ2FtZSA6ICcjY2hlY2tNb3JlZ2FtZScsXG4gICAgY2hlY2tRdWlja1N0YXJ0IDogJyNjaGVja1F1aWNrU3RhcnQnLFxuICAgIGNoZWNrU2hvd1J1bGUgOiAnI2NoZWNrU2hvd1J1bGUnLFxuICAgIGNoZWNrU2hvd1JvbGUgOiAnI2NoZWNrU2hvd1JvbGUnLFxuICAgIGNoZWNrQmFja1RvRmlyc3RMYXllciA6ICcjY2hlY2tCYWNrVG9GaXJzdExheWVyJyxcbiAgICByb2xlUHJlZmFiQXNzZXQxIDogJyNyb2xlUHJlZmFiQXNzZXQxJyxcbiAgICByb2xlUHJlZmFiQXNzZXQyIDogJyNyb2xlUHJlZmFiQXNzZXQyJyxcbiAgICBiYWNrZ3JvdW5kQXNzZXQgOiAnI2JhY2tncm91bmRBc3NldCcsXG4gICAgYmFja2dyb3VuZEJvdHRvbUltYWdlOiAnI2JhY2tncm91bmRCb3R0b21JbWFnZScsXG4gICAgY2hlY2tBcmVhQ2VudGVyIDogJyNjaGVja0FyZWFDZW50ZXInLFxuICAgIGlucHV0QXJlYVNwYWNlIDogJyNpbnB1dEFyZWFTcGFjZScsXG4gICAgaW5wdXRTa2V3WCA6ICcjaW5wdXRTa2V3WCcsXG4gICAgXG4gICAgcHJvcCA6ICcjcHJvcCcsXG4gICAgYXJlYVByb3AgOiAnI2FyZWFQcm9wJyxcbiAgICByb29tUHJvcCA6ICcjcm9vbVByb3AnLFxuICAgIGN1c3RvbVByb3AgOiAnI2N1c3RvbVByb3AnLFxuICAgIG1vcmVnYW1lUHJvcCA6ICcjbW9yZWdhbWVQcm9wJyxcbiAgICBnYW1lUHJvcCA6ICcjZ2FtZVByb3AnLFxuICAgIHNoYXJlUHJvcCA6ICcjc2hhcmVQcm9wJyxcblxuICAgIHByb3BBc3NldFR5cGUgOiAnI3Byb3BBc3NldFR5cGUnLFxuICAgIHByb3BJbWFnZUFzc2V0IDogJyNwcm9wSW1hZ2VBc3NldCcsXG4gICAgcHJvcFByZWZhYkFzc2V0IDogJyNwcm9wUHJlZmFiQXNzZXQnLFxuICAgIHByb3BSZW1vdGVJbWFnZUFzc2V0IDogJyNwcm9wUmVtb3RlSW1hZ2VBc3NldCcsXG4gICAgcHJvcEltYWdlVXJsIDogJyNwcm9wSW1hZ2VVcmwnLFxuICAgIHByb3BSZW1vdGVJbWFnZSA6ICcjcHJvcFJlbW90ZUltYWdlJyxcbiAgICBkaXZSb2xlUHJlZmFiIDogJyNkaXZSb2xlUHJlZmFiJyxcbiAgICBkaXZBcmVhTGF5b3V0IDogJyNkaXZBcmVhTGF5b3V0JyxcblxuICAgIGNvbDEgOiAnI2NvbDEnLFxuICAgIGNvbDIgOiAnI2NvbDInLFxuICAgIGNvbDMgOiAnI2NvbDMnLFxuXG4gICAgaW5wdXROYW1lIDogJyNpbnB1dE5hbWUnLFxuICAgIHNob3dTdHlsZSA6ICcjc2hvdy1zdHlsZScsXG5cbiAgICBsaW1pdF9wbGF0Zm9ybV90Y3kgOiAnI2xpbWl0X3BsYXRmb3JtX3RjeScsXG4gICAgbGltaXRfcGxhdGZvcm1fcGxhdGZvcm1zZXQgOiAnI2xpbWl0X3BsYXRmb3JtX3BsYXRmb3Jtc2V0JyxcbiAgICBsaW1pdF9wbGF0Zm9ybV9wbGF0Zm9ybXNldHRjeSA6ICcjbGltaXRfcGxhdGZvcm1fcGxhdGZvcm1zZXR0Y3knLFxuICAgIGxpbWl0X3BsYXRmb3JtX21pbmlnYW1lIDogJyNsaW1pdF9wbGF0Zm9ybV9taW5pZ2FtZScsXG4gICAgbGltaXRfcGxhdGZvcm1fbWluaWdhbWVpb3MgOiAnI2xpbWl0X3BsYXRmb3JtX21pbmlnYW1laW9zJyxcbiAgICBsaW1pdF9ib3V0IDogJyNsaW1pdF9ib3V0JyxcbiAgICBsaW1pdF9jcmVhdGVkYXlzIDogJyNsaW1pdF9jcmVhdGVkYXlzJyxcbiAgICBsaW1pdF90b3RhbHBheSA6ICcjbGltaXRfdG90YWxwYXknLFxuXG4gICAgZHJhZ0FyZWEgOiAnI2RyYWdBcmVhJyxcbiAgICBkcmFnUm9vbSA6ICcjZHJhZ1Jvb20nLFxuICAgIGRyYWdDdXN0b20gOiAnI2RyYWdDdXN0b20nLFxuICAgIGRyYWdNb3JlZ2FtZSA6ICcjZHJhZ01vcmVnYW1lJyxcbiAgICBkcmFnR2FtZSA6ICcjZHJhZ0dhbWUnLFxuICAgIFxuICAgIGZpZWxkVHlwZSA6ICcjZmllbGQtdHlwZScsXG5cbiAgICAvLyDljLrln5/lsZ7mgKdcbiAgICBhcmVhUHJvcEFyZWFUeXBlSWQgOiAnI2FyZWFQcm9wQXJlYVR5cGVJZCcsXG4gICAgYXJlYVByb3BEZWZhdWx0QXJlYSA6ICcjYXJlYVByb3BEZWZhdWx0QXJlYScsXG4gICAgYXJlYVByb3BTY29yZUFyZWEgOiAnI2FyZWFQcm9wU2NvcmVBcmVhJyxcblxuICAgIC8vIOaIv+mXtOWxnuaAp1xuICAgIHJvb21Qcm9wQXJlYVR5cGVJZCA6ICcjcm9vbVByb3BBcmVhVHlwZUlkJyxcbiAgICByb29tUHJvcFJvb21UeXBlSWQgOiAnI3Jvb21Qcm9wUm9vbVR5cGVJZCcsXG4gICAgXG4gICAgLy8g6Ieq5a6a5LmJ5bGe5oCnXG4gICAgY3VzdG9tUHJvcEp1bXBJZCA6ICcjY3VzdG9tUHJvcEp1bXBJZCcsXG5cbiAgICAvLyDogZTov5DlsZ7mgKdcbiAgICBtb3JlZ2FtZVByb3BVcmwgOiAnI21vcmVnYW1lUHJvcFVybCcsXG4gICAgbW9yZWdhbWVQcm9wU2xvdFNpemUgOiAnI21vcmVnYW1lUHJvcFNsb3RTaXplJyxcblxuICAgIC8vIOa4uOaIj+WxnuaAp1xuICAgIGdhbWVQcm9wQWJiciA6ICcjZ2FtZVByb3BBYmJyJyxcbn07XG5cbi8vIOmdouadv+S4iueahOaWueazlVxuZXhwb3J0IGNvbnN0IG1ldGhvZHMgPSB7fTtcblxuLy8g6Z2i5p2/5LiK6Kem5Y+R55qE5LqL5Lu2XG5leHBvcnQgY29uc3QgbGlzdGVuZXJzID0ge1xuICAgIC8qKlxuICAgICAqIOmdouadv+makOiXj+eahOaXtuWAmeinpuWPkVxuICAgICAqL1xuICAgIGhpZGUoKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuaGlkZGVuKTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIOmdouadv+aYvuekuueahOaXtuWAmeinpuWPkVxuICAgICAqL1xuICAgIHNob3coKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuaGlkZGVuKTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIOmdouadv+Wkp+Wwj+abtOaUueeahOaXtuWAmeinpuWPkVxuICAgICAqL1xuICAgIHJlc2l6ZSgpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5jbGllbnRIZWlnaHQpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmNsaWVudFdpZHRoKTtcbiAgICB9XG59O1xuXG4vLyDlsJ3or5XlhbPpl63pnaLmnb/nmoTml7blgJnop6blj5FcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBiZWZvcmVDbG9zZSgpIHt9XG5cbi8vIOW9k+mdouadv+WunumZheWFs+mXreWQjuinpuWPkVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNsb3NlKCkge31cblxuLy8g5b2T6Z2i5p2/5riy5p+T5oiQ5Yqf5ZCO6Kem5Y+RXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVhZHkoKSB7XG4gICAgaW5pdENvbW1vblNldHRpbmcuY2FsbCh0aGlzKVxuICAgIGluaXRDb21tb25Qcm9wU2V0dGluZy5jYWxsKHRoaXMpXG4gICAgaW5pdEFyZWFQcm9wU2V0dGluZy5jYWxsKHRoaXMpXG4gICAgaW5pdFJvb21Qcm9wU2V0dGluZy5jYWxsKHRoaXMpXG4gICAgaW5pdEN1c3RvbVByb3BTZXR0aW5nLmNhbGwodGhpcylcbiAgICBpbml0TW9yZWdhbWVQcm9wU2V0dGluZy5jYWxsKHRoaXMpXG4gICAgaW5pdEdhbWVQcm9wU2V0dGluZy5jYWxsKHRoaXMpXG5cbiAgICAvLyDpmpDol4/lsZ7mgKfpnaLmnb9cbiAgICBoaWRlUHJvcGVydGllcy5jYWxsKHRoaXMpXG5cbiAgICAvLyDlk43lupTmi5bmlL5cbiAgICB0aGlzLiQuZHJhZ0FyZWEub25kcmFnc3RhcnQgPSAoZSkgPT4ge1xuICAgICAgICBlLmRhdGFUcmFuc2Zlci5zZXREYXRhKCd2YWx1ZScsXCJhcmVhXCIpO1xuICAgIH1cblxuICAgIHRoaXMuJC5kcmFnUm9vbS5vbmRyYWdzdGFydCA9IChlKSA9PiB7XG4gICAgICAgIGUuZGF0YVRyYW5zZmVyLnNldERhdGEoJ3ZhbHVlJyxcInJvb21cIik7XG4gICAgfVxuXG4gICAgdGhpcy4kLmRyYWdDdXN0b20ub25kcmFnc3RhcnQgPSAoZSkgPT4ge1xuICAgICAgICBlLmRhdGFUcmFuc2Zlci5zZXREYXRhKCd2YWx1ZScsXCJjdXN0b21cIik7XG4gICAgfVxuXG4gICAgdGhpcy4kLmRyYWdNb3JlZ2FtZS5vbmRyYWdzdGFydCA9IChlKSA9PiB7XG4gICAgICAgIGUuZGF0YVRyYW5zZmVyLnNldERhdGEoJ3ZhbHVlJyxcIm1vcmVnYW1lXCIpO1xuICAgIH1cblxuICAgIHRoaXMuJC5kcmFnR2FtZS5vbmRyYWdzdGFydCA9IChlKSA9PiB7XG4gICAgICAgIGUuZGF0YVRyYW5zZmVyLnNldERhdGEoJ3ZhbHVlJyxcImdhbWVcIik7XG4gICAgfVxuXG4gICAgdGhpcy4kLnNhdmVCdG4ub25jbGljayA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgc2F2ZUV4dGVuc2lvbkNvbmZpZygpXG5cbiAgICAgICAgY29uc3QgY29uZmlnOiBhbnkgPSB7XG4gICAgICAgICAgICB0aXRsZTogXCLmj5DnpLpcIixcbiAgICAgICAgICAgIGJ1dHRvbnMgOiBbXCLnoa7lrppcIl1cbiAgICAgICAgfTtcblxuICAgICAgICBhd2FpdCBFZGl0b3IuRGlhbG9nLmluZm8oXCLkv53lrZjmiJDlip9cIiwgY29uZmlnKTtcbiAgICB9XG5cbiAgICB0aGlzLiQubmV3QnRuLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGVjb25maWcgPSBnZXRFeHRlbnNpb25Db25maWcoKVxuXG4gICAgICAgIGlmIChlY29uZmlnLmhhbGwubGVuZ3RoID49IDIwKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIm1heGltdW0gY29uZmlnc1wiKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBlY29uZmlnLmhhbGwucHVzaChuZXcgSGFsbEV4dGVuc2lvbkRhdGEpXG4gICAgICAgIHVwZGF0ZUNvbmZpZ1NlY3Rpb24uY2FsbCh0aGlzKSAgICAgICAgXG4gICAgfVxuXG4gICAgdGhpcy4kLm5ld2Zyb21CdG4ub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgZWNvbmZpZyA9IGdldEV4dGVuc2lvbkNvbmZpZygpXG5cbiAgICAgICAgaWYgKGVjb25maWcuaGFsbC5sZW5ndGggPj0gMjApIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibWF4aW11bSBjb25maWdzXCIpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIOaYr+WQpuacieaLt+i0neeahOaVsOaNrua6kFxuICAgICAgICBsZXQgZGF0YSA9IGRlZXBDb3B5KGVjb25maWcuaGFsbC5maW5kKCh4KSA9PiB4LnNldHRpbmcubmFtZSA9PSBoYWxsQ29uZmlnLnNldHRpbmcubmFtZSkpXG4gICAgICAgIGRhdGEuc2V0dGluZy5uYW1lICs9IFwiX3hcIlxuICAgICAgICBlY29uZmlnLmhhbGwucHVzaChkYXRhKVxuICAgICAgICBcbiAgICAgICAgdXBkYXRlQ29uZmlnU2VjdGlvbi5jYWxsKHRoaXMpICAgICAgICBcbiAgICB9XG4gICAgXG4gICAgdGhpcy4kLmRlbEJ0bi5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBlY29uZmlnID0gZ2V0RXh0ZW5zaW9uQ29uZmlnKClcblxuICAgICAgICBpZiAoZWNvbmZpZy5oYWxsLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIm1pbmltdW0gY29uZmlnc1wiKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBlY29uZmlnLmhhbGwuc3BsaWNlKHRoaXMuJC5jb25maWdDaG9vc2UudmFsdWUsMSlcblxuICAgICAgICB1cGRhdGVDb25maWdTZWN0aW9uLmNhbGwodGhpcylcbiAgICAgICAgc2hvd0NvbmZpZ0ZpbGUuY2FsbCh0aGlzLDApXG4gICAgfVxuXG4gICAgdGhpcy4kLmNvbmZpZ0Nob29zZS5vbmNoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJzd2l0Y2ggdG8gY29uZmlnXCIsdGhpcy4kLmNvbmZpZ0Nob29zZS52YWx1ZSlcbiAgICAgICAgc2hvd0NvbmZpZ0ZpbGUuY2FsbCh0aGlzLHRoaXMuJC5jb25maWdDaG9vc2UudmFsdWUpXG5cbiAgICAgICAgaGlkZVByb3BlcnRpZXMuY2FsbCh0aGlzKVxuICAgIH1cblxuICAgIHVwZGF0ZUNvbmZpZ1NlY3Rpb24uY2FsbCh0aGlzKVxuICAgIHNob3dDb25maWdGaWxlLmNhbGwodGhpcywwKVxufVxuXG5mdW5jdGlvbiB1cGRhdGVDb25maWdTZWN0aW9uKCkge1xuICAgIGNvbnN0IGVjb25maWcgPSBnZXRFeHRlbnNpb25Db25maWcoKVxuXG4gICAgZm9yIChsZXQgaSA9IHRoaXMuJC5jb25maWdDaG9vc2UuY2hpbGRyZW4ubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgdGhpcy4kLmNvbmZpZ0Nob29zZS5jaGlsZHJlbltpXS5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVjb25maWcuaGFsbC5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VpLWJ1dHRvbicpXG4gICAgICAgIG5vZGUudGV4dENvbnRlbnQgPSBg6YWN572uJHtpKzF9YFxuICAgICAgICB0aGlzLiQuY29uZmlnQ2hvb3NlLmFwcGVuZENoaWxkKG5vZGUpXG4gICAgfVxufVxuXG5mdW5jdGlvbiBzaG93Q29uZmlnRmlsZShpZHgpIHtcbiAgICBjb25zdCBlY29uZmlnID0gZ2V0RXh0ZW5zaW9uQ29uZmlnKClcbiAgICBsZXQgY29uZmlnID0gZWNvbmZpZy5oYWxsW2lkeF1cblxuICAgIGlmIChjb25maWcpIHtcbiAgICAgICAgaWYgKGNvbmZpZyA9PSBoYWxsQ29uZmlnKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIGhhbGxDb25maWcgPSBjb25maWdcblxuICAgICAgICBjb25maWcuc2V0dGluZy5sYXlvdXRDb2xzID0gU3R5bGVDb25maWdbY29uZmlnLnNldHRpbmcubGF5b3V0VHlwZV1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuJC5zaG93U3R5bGUudmFsdWUgPSBjb25maWcuc2V0dGluZy5sYXlvdXRUeXBlXG5cbiAgICAgICAgbGV0IHBsYXRmcm9tVHlwZXMgPSBjb25maWcuc2V0dGluZy5wbGF0ZnJvbVR5cGUuc3BsaXQoJywnKVxuXG4gICAgICAgIHRoaXMuJC5saW1pdF9wbGF0Zm9ybV90Y3kudmFsdWUgPSBmYWxzZVxuICAgICAgICB0aGlzLiQubGltaXRfcGxhdGZvcm1fcGxhdGZvcm1zZXQudmFsdWUgPSBmYWxzZVxuICAgICAgICB0aGlzLiQubGltaXRfcGxhdGZvcm1fcGxhdGZvcm1zZXR0Y3kudmFsdWUgPSBmYWxzZVxuICAgICAgICB0aGlzLiQubGltaXRfcGxhdGZvcm1fbWluaWdhbWUudmFsdWUgPSBmYWxzZVxuICAgICAgICB0aGlzLiQubGltaXRfcGxhdGZvcm1fbWluaWdhbWVpb3MudmFsdWUgPSBmYWxzZVxuICAgICAgICBcbiAgICAgICAgaWYgKHBsYXRmcm9tVHlwZXMuaW5jbHVkZXMoXCJ0Y3lcIikpIHtcbiAgICAgICAgICAgIHRoaXMuJC5saW1pdF9wbGF0Zm9ybV90Y3kudmFsdWUgPSB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBsYXRmcm9tVHlwZXMuaW5jbHVkZXMoXCJwbGF0Zm9ybXNldFwiKSkge1xuICAgICAgICAgICAgdGhpcy4kLmxpbWl0X3BsYXRmb3JtX3BsYXRmb3Jtc2V0LnZhbHVlID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIGlmIChwbGF0ZnJvbVR5cGVzLmluY2x1ZGVzKFwicGxhdGZvcm1zZXR0Y3lcIikpIHtcbiAgICAgICAgICAgIHRoaXMuJC5saW1pdF9wbGF0Zm9ybV9wbGF0Zm9ybXNldHRjeS52YWx1ZSA9IHRydWVcbiAgICAgICAgfVxuICAgICAgICBpZiAocGxhdGZyb21UeXBlcy5pbmNsdWRlcyhcIm1pbmlnYW1lXCIpKSB7XG4gICAgICAgICAgICB0aGlzLiQubGltaXRfcGxhdGZvcm1fbWluaWdhbWUudmFsdWUgPSB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBsYXRmcm9tVHlwZXMuaW5jbHVkZXMoXCJtaW5pZ2FtZWlvc1wiKSkge1xuICAgICAgICAgICAgdGhpcy4kLmxpbWl0X3BsYXRmb3JtX21pbmlnYW1laW9zLnZhbHVlID0gdHJ1ZVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy4kLmxpbWl0X2JvdXQudmFsdWUgPSBjb25maWcuc2V0dGluZy5saW1pdF9ib3V0IHx8IDBcbiAgICAgICAgdGhpcy4kLmxpbWl0X2NyZWF0ZWRheXMudmFsdWUgPSBjb25maWcuc2V0dGluZy5saW1pdF9kYXlzIHx8IDBcbiAgICAgICAgXG4gICAgICAgIGNyZWF0ZUVudHJ5U2xvdHMuY2FsbCh0aGlzLFN0eWxlQ29uZmlnW2NvbmZpZy5zZXR0aW5nLmxheW91dFR5cGVdKVxuICAgIFxuICAgICAgICB0aGlzLiQuaW5wdXROYW1lLnZhbHVlID0gY29uZmlnLnNldHRpbmcubmFtZVxuICAgICAgICB0aGlzLiQuY2hlY2tNb3JlZ2FtZS52YWx1ZSA9IGNvbmZpZy5zZXR0aW5nLnNob3dNb3JlZ2FtZVxuICAgICAgICB0aGlzLiQuY2hlY2tRdWlja1N0YXJ0LnZhbHVlID0gY29uZmlnLnNldHRpbmcuc2hvd1F1aWNrU3RhcnRcbiAgICAgICAgdGhpcy4kLmNoZWNrU2hvd1J1bGUudmFsdWUgPSBjb25maWcuc2V0dGluZy5zaG93UnVsZVxuICAgICAgICB0aGlzLiQuY2hlY2tTaG93Um9sZS52YWx1ZSA9IGNvbmZpZy5zZXR0aW5nLnNob3dSb2xlXG4gICAgICAgIHRoaXMuJC5jaGVja0JhY2tUb0ZpcnN0TGF5ZXIudmFsdWUgPSBjb25maWcuc2V0dGluZy5iYWNrdG9GaXJzdExheWVyXG4gICAgICAgIHRoaXMuJC5kaXZSb2xlUHJlZmFiLmhpZGRlbiA9ICF0aGlzLiQuY2hlY2tTaG93Um9sZS52YWx1ZVxuICAgICAgICB0aGlzLiQuZGl2QXJlYUxheW91dC5oaWRkZW4gPSB0aGlzLiQuY2hlY2tTaG93Um9sZS52YWx1ZVxuICAgICAgICB0aGlzLiQucm9sZVByZWZhYkFzc2V0MS52YWx1ZSA9IGhhbGxDb25maWcuc2V0dGluZy5yb2xlUHJlZmFiQm95IHx8IFwiXCJcbiAgICAgICAgdGhpcy4kLnJvbGVQcmVmYWJBc3NldDIudmFsdWUgPSBoYWxsQ29uZmlnLnNldHRpbmcucm9sZVByZWZhYkdpcmwgfHwgXCJcIlxuICAgICAgICB0aGlzLiQuaW5wdXRBcmVhU3BhY2UudmFsdWUgPSBoYWxsQ29uZmlnLnNldHRpbmcuYXJlYVNwYWNlIHx8IDEwMFxuICAgICAgICB0aGlzLiQuY2hlY2tBcmVhQ2VudGVyLnZhbHVlID0gaGFsbENvbmZpZy5zZXR0aW5nLmlzQXJlYUNlbnRlclBvc3Rpb24gfHwgZmFsc2VcbiAgICAgICAgdGhpcy4kLmNoZWNrTXVzaWMudmFsdWUgPSBoYWxsQ29uZmlnLnNldHRpbmcuZW5hYmxlTXVzaWNcbiAgICAgICAgdGhpcy4kLm11c2ljQXNzZXQudmFsdWUgPSBoYWxsQ29uZmlnLnNldHRpbmcubXVzaWNDbGlwXG4gICAgICAgIHRoaXMuJC5tdXNpY0Fzc2V0LmhpZGRlbiA9ICF0aGlzLiQuY2hlY2tNdXNpYy52YWx1ZVxuICAgICAgICB0aGlzLiQuYmFja2dyb3VuZEFzc2V0LnZhbHVlID0gaGFsbENvbmZpZy5zZXR0aW5nLmJhY2tncm91bmRQcmVmYWJcbiAgICAgICAgdGhpcy4kLmJhY2tncm91bmRCb3R0b21JbWFnZS52YWx1ZSA9IGhhbGxDb25maWcuc2V0dGluZy5iYWNrZ3JvdW5kQm90dG9tSW1hZ2VcbiAgICAgICAgdGhpcy4kLmlucHV0U2tld1gudmFsdWUgPSBoYWxsQ29uZmlnLnNldHRpbmcuc2tld1hcblxuICAgICAgICBoYWxsQ29uZmlnLnNsb3RzLmZvckVhY2goKHByb3ApID0+IHtcbiAgICAgICAgICAgIGxldCAkZGl2ID0gc2xvdERpdk1hcFtgc2xvdC0ke3Byb3AuY29sfToke3Byb3Aucm93fWBdXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICgkZGl2KSB7XG4gICAgICAgICAgICAgICAgc2hvd1Nsb3QuY2FsbCh0aGlzLCRkaXYscHJvcClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUVudHJ5U2xvdHMoY29uZmlnKSB7XG4gICAgbGV0IGNvbHMgPSBbdGhpcy4kLmNvbDEsdGhpcy4kLmNvbDIsdGhpcy4kLmNvbDNdXG5cbiAgICBjb2xzLmZvckVhY2goKCRjb2wpID0+IHtcbiAgICAgICAgZm9yIChsZXQgaSA9ICRjb2wuY2hpbGRyZW4ubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgICRjb2wuY2hpbGRyZW5baV0ucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgc2xvdERpdk1hcCA9IHt9XG5cbiAgICAvLyDph43mlrDliJvlu7roioLngrlcbiAgICBpZiAoY29uZmlnKSB7XG4gICAgICAgIGxldCBjID0gMFxuICAgICAgICBjb2xzLmZvckVhY2goKCRjb2wpID0+IHtcbiAgICAgICAgICAgIGZvciAobGV0IHIgPSAwOyByIDwgY29uZmlnW2NdOyByKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgJGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICAgICAgICAgICAgICAkZGl2LmNsYXNzTmFtZSA9IGBzbG90JHtjb25maWdbY119YFxuICAgICAgICAgICAgICAgICRjb2wuYXBwZW5kQ2hpbGQoJGRpdilcbiAgICBcbiAgICAgICAgICAgICAgICBsZXQga2V5ID0gYHNsb3QtJHtjfToke3J9YFxuICAgICAgICAgICAgICAgIHNsb3REaXZNYXBba2V5XSA9ICRkaXZcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBjcmVhdGVFbnRyeVNsb3RzRm9yQ29sUm93LmNhbGwodGhpcywkZGl2LGMscilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGMrK1xuICAgICAgICB9KVxuICAgIH0gICBcbn1cblxuZnVuY3Rpb24gY3JlYXRlRW50cnlTbG90c0ZvckNvbFJvdygkZGl2LGNvbEluZGV4LHJvd0luZGV4KSB7XG4gICAgbGV0IG5vZGVEcmFnQXJlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VpLWRyYWctYXJlYScpO1xuICAgIG5vZGVEcmFnQXJlYS5jbGFzc05hbWUgPSBcImRyYWdhcmVhXCJcbiAgICBub2RlRHJhZ0FyZWEuc2V0QXR0cmlidXRlKFwiZHJvcHBhYmxlXCIsXCJ0eXBlLWFcIilcbiAgICBub2RlRHJhZ0FyZWEudGV4dENvbnRlbnQgPSBcIuaLluWKqOiKgueCueWIsOi/memHjFwiXG4gICAgbm9kZURyYWdBcmVhLmlkID0gYGRyb3BBcmVhJHtjb2xJbmRleH06JHtyb3dJbmRleH1gXG4gICAgJGRpdi5hcHBlbmRDaGlsZChub2RlRHJhZ0FyZWEpXG5cbiAgICBsZXQgbm9kZUFkZEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1aS1hZGRpY29uJyk7XG4gICAgbm9kZUFkZEljb24uc2V0QXR0cmlidXRlKFwiY29sb3JcIixcInRydWVcIilcbiAgICBub2RlQWRkSWNvbi5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLFwiYWRkXCIpXG4gICAgJGRpdi5hcHBlbmRDaGlsZChub2RlQWRkSWNvbilcblxuICAgIG5vZGVEcmFnQXJlYS5vbmRyb3AgPSAoZSkgPT4ge1xuICAgICAgICBsZXQgZHJvcFdoYXQgPSBlLmRhdGFUcmFuc2Zlci5nZXREYXRhKCd2YWx1ZScpO1xuICAgICAgICBsZXQgc2xvdFByb3BcblxuICAgICAgICBzd2l0Y2goZHJvcFdoYXQpIHtcbiAgICAgICAgICAgIGNhc2UgXCJhcmVhXCI6XG4gICAgICAgICAgICAgICAgc2xvdFByb3AgPSBuZXcgSGFsbEFyZWFTbG90UHJvcFxuICAgICAgICAgICAgICAgIHNsb3RQcm9wLnNsb3RUeXBlID0gU2xvdFR5cGUuQXJlYVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlIFwicm9vbVwiOlxuICAgICAgICAgICAgICAgIHNsb3RQcm9wID0gbmV3IEhhbGxSb29tU2xvdFByb3BcbiAgICAgICAgICAgICAgICBzbG90UHJvcC5zbG90VHlwZSA9IFNsb3RUeXBlLlJvb21cbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSBcIm1vcmVnYW1lXCI6XG4gICAgICAgICAgICAgICAgc2xvdFByb3AgPSBuZXcgSGFsbE1vcmVnYW1lU2xvdFByb3BcbiAgICAgICAgICAgICAgICBzbG90UHJvcC5zbG90VHlwZSA9IFNsb3RUeXBlLk1vcmVnYW1lXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgXCJnYW1lXCI6XG4gICAgICAgICAgICAgICAgc2xvdFByb3AgPSBuZXcgSGFsbEdhbWVTbG90UHJvcFxuICAgICAgICAgICAgICAgIHNsb3RQcm9wLnNsb3RUeXBlID0gU2xvdFR5cGUuR2FtZVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlIFwiY3VzdG9tXCI6XG4gICAgICAgICAgICAgICAgc2xvdFByb3AgPSBuZXcgSGFsbEN1c3RvbVNsb3RQcm9wXG4gICAgICAgICAgICAgICAgc2xvdFByb3Auc2xvdFR5cGUgPSBTbG90VHlwZS5DdXN0b21cbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICB9XG5cbiAgICAgICAgc2xvdFByb3AuY29sID0gY29sSW5kZXhcbiAgICAgICAgc2xvdFByb3Aucm93ID0gcm93SW5kZXhcbiAgICAgICAgaGFsbENvbmZpZy5zbG90cy5wdXNoKHNsb3RQcm9wKVxuXG4gICAgICAgIHNob3dTbG90LmNhbGwodGhpcywkZGl2LHNsb3RQcm9wKVxuICAgIH1cbn1cblxuZnVuY3Rpb24gc2hvd1Nsb3QoJGRpdixzbG90UHJvcCkge1xuICAgIGxldCBub2RlQWRkSWNvbiA9ICRkaXYuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJ1aS1hZGRpY29uXCIpWzBdXG5cbiAgICBpZiAobm9kZUFkZEljb24pIHtcbiAgICAgICAgbm9kZUFkZEljb24ucmVtb3ZlKClcbiAgICB9XG4gICAgXG4gICAgbGV0IG5vZGVEcmFnQXJlYSA9ICRkaXYuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJ1aS1kcmFnLWFyZWFcIilbMF1cblxuICAgIGlmIChub2RlRHJhZ0FyZWEpIHtcbiAgICAgICAgbm9kZURyYWdBcmVhLnJlbW92ZSgpXG4gICAgfVxuICAgIFxuICAgIGxldCBkcm9wV2hhdCA9IFwiXCJcblxuICAgIHN3aXRjaChzbG90UHJvcC5zbG90VHlwZSkge1xuICAgICAgICBjYXNlIFNsb3RUeXBlLkFyZWE6XG4gICAgICAgICAgICBkcm9wV2hhdCA9IFwiYXJlYVwiXG4gICAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIFNsb3RUeXBlLlJvb206XG4gICAgICAgICAgICBkcm9wV2hhdCA9IFwicm9vbVwiXG4gICAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIFNsb3RUeXBlLkN1c3RvbTpcbiAgICAgICAgICAgIGRyb3BXaGF0ID0gXCJjdXN0b21cIlxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSBTbG90VHlwZS5Nb3JlZ2FtZTpcbiAgICAgICAgICAgIGRyb3BXaGF0ID0gXCJtb3JlZ2FtZVwiXG4gICAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIFNsb3RUeXBlLkdhbWU6XG4gICAgICAgICAgICBkcm9wV2hhdCA9IFwiZ2FtZVwiXG4gICAgICAgICAgICBicmVha1xuICAgIH1cblxuICAgIC8vIOWIm+W7uuaMiemSrlxuICAgIGxldCAkc2xvdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VpLWJ1dHRvbicpO1xuICAgICRzbG90QnV0dG9uLmNsYXNzTmFtZSA9IGAke2Ryb3BXaGF0fS1zbG90YFxuICAgICRzbG90QnV0dG9uLnRleHRDb250ZW50ID0gJydcbiAgICAkZGl2LmFwcGVuZENoaWxkKCRzbG90QnV0dG9uKVxuXG4gICAgLy8g5Yig6Zmk5oyJ6ZKuXG4gICAgbGV0ICRkZWxCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1aS1idXR0b24nKTtcbiAgICBsZXQgJGRlbEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1aS1pY29uJyk7XG4gICAgJGRlbEljb24uc2V0QXR0cmlidXRlKFwiY29sb3JcIixcIm5vcm1hbFwiKVxuICAgICRkZWxJY29uLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsXCJkZWxcIilcbiAgICAkZGVsQnV0dG9uLmFwcGVuZENoaWxkKCRkZWxJY29uKVxuICAgICRzbG90QnV0dG9uLmFwcGVuZENoaWxkKCRkZWxCdXR0b24pXG5cbiAgICAvLyDkv6Hmga/mmL7npLpcbiAgICBsZXQgJGxhYmVsMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VpLWxhYmVsJyk7XG4gICAgJGxhYmVsMS5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLGRyb3BXaGF0KVxuICAgICRsYWJlbDEuc2V0QXR0cmlidXRlKFwic3R5bGVcIixcImFsaWduLWl0ZW1zOiBjZW50ZXI7IGRpc3BsYXk6IGZsZXg7IGp1c3RpZnktY29udGVudDogY2VudGVyO1wiKVxuICAgICRzbG90QnV0dG9uLmFwcGVuZENoaWxkKCRsYWJlbDEpXG5cbiAgICBsZXQgJGxhYmVsMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VpLWxhYmVsJyk7XG4gICAgJGxhYmVsMi5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLFwiXCIpXG4gICAgJGxhYmVsMi5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLFwiYWxpZ24taXRlbXM6IGNlbnRlcjsgZGlzcGxheTogZmxleDsganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XCIpXG4gICAgJHNsb3RCdXR0b24uYXBwZW5kQ2hpbGQoJGxhYmVsMilcbiAgICAkbGFiZWwyLmhpZGRlbiA9IHRydWVcblxuICAgIGxldCBkZWxldGVkID0gZmFsc2VcblxuICAgICRkZWxCdXR0b24ub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgZGVsZXRlZCA9IHRydWVcblxuICAgICAgICBsZXQgaWR4ID0gaGFsbENvbmZpZy5zbG90cy5pbmRleE9mKHNsb3RQcm9wKVxuICAgICAgICBjb25zb2xlLmxvZyhcInJlbW92ZSBpZHhcIixpZHgpXG4gICAgICAgIGhhbGxDb25maWcuc2xvdHMuc3BsaWNlKGlkeCwxKVxuXG4gICAgICAgIGhpZGVQcm9wZXJ0aWVzLmNhbGwodGhpcylcbiAgICAgICAgJHNsb3RCdXR0b24ucmVtb3ZlKClcblxuICAgICAgICBjcmVhdGVFbnRyeVNsb3RzRm9yQ29sUm93LmNhbGwodGhpcywkZGl2LHNsb3RQcm9wLmNvbCxzbG90UHJvcC5yb3cpXG4gICAgfVxuXG4gICAgLy8g54K55Ye75pi+56S65bGe5oCnXG4gICAgJHNsb3RCdXR0b24ub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgaWYgKGRlbGV0ZWQpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuJC5wcm9wLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLiQucHJvcC5jaGlsZHJlbltpXS5oaWRkZW4gPSB0cnVlXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLiQuc2hhcmVQcm9wLmhpZGRlbiA9IGZhbHNlXG4gICAgICAgIGN1clNsb3RQcm9wID0gc2xvdFByb3BcblxuICAgICAgICBzaG93Q29tbW9uUHJvcGVydGllcy5jYWxsKHRoaXMpXG5cbiAgICAgICAgc3dpdGNoKGRyb3BXaGF0KSB7XG4gICAgICAgICAgICBjYXNlIFwiYXJlYVwiOlxuICAgICAgICAgICAgICAgIHNob3dBcmVhUHJvcGVydGllcy5jYWxsKHRoaXMpXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgXCJyb29tXCI6XG4gICAgICAgICAgICAgICAgc2hvd1Jvb21Qcm9wZXJ0aWVzLmNhbGwodGhpcylcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSBcImN1c3RvbVwiOlxuICAgICAgICAgICAgICAgIHNob3dDdXN0b21Qcm9wZXJ0aWVzLmNhbGwodGhpcylcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSBcIm1vcmVnYW1lXCI6XG4gICAgICAgICAgICAgICAgc2hvd01vcmVnYW1lUHJvcGVydGllcy5jYWxsKHRoaXMpXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgXCJnYW1lXCI6XG4gICAgICAgICAgICAgICAgc2hvd0dhbWVQcm9wZXJ0aWVzLmNhbGwodGhpcylcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBpbml0Q29tbW9uU2V0dGluZygpIHtcbiAgICB0aGlzLiQuaW5wdXROYW1lLm9ua2V5dXAgPSAoKT0+IHtcbiAgICAgICAgdGhpcy4kLmlucHV0TmFtZS5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLHRoaXMuJC5pbnB1dE5hbWUudmFsdWUucmVwbGFjZSgvW15hLXpBLVpfMC05XS9nLCcnKSlcbiAgICAgICAgaGFsbENvbmZpZy5zZXR0aW5nLm5hbWUgPSB0aGlzLiQuaW5wdXROYW1lLnZhbHVlXG4gICAgfVxuXG4gICAgbGV0IGlkID0gMFxuXG4gICAgZm9yIChsZXQgaXRlbSBpbiBTdHlsZUNvbmZpZykge1xuICAgICAgICBpZCA9IGlkICsgMVxuXG4gICAgICAgIGxldCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG4gICAgICAgIG5vZGUudmFsdWUgPSBpdGVtO1xuICAgICAgICBub2RlLmxhYmVsID0gaXRlbVxuICAgICAgICB0aGlzLiQuc2hvd1N0eWxlLmFwcGVuZENoaWxkKG5vZGUpXG4gICAgfVxuXG4gICAgdGhpcy4kLmNoZWNrTXVzaWMub25jaGFuZ2UgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuJC5tdXNpY0Fzc2V0LmhpZGRlbiA9ICF0aGlzLiQuY2hlY2tNdXNpYy52YWx1ZVxuICAgICAgICBoYWxsQ29uZmlnLnNldHRpbmcuZW5hYmxlTXVzaWMgPSB0aGlzLiQuY2hlY2tNdXNpYy52YWx1ZVxuICAgIH1cblxuICAgIHRoaXMuJC5zaG93U3R5bGUub25jaGFuZ2UgPSAoKT0+IHtcbiAgICAgICAgaGFsbENvbmZpZy5zZXR0aW5nLmxheW91dFR5cGUgPSB0aGlzLiQuc2hvd1N0eWxlLnZhbHVlXG4gICAgICAgIGhhbGxDb25maWcuc2V0dGluZy5sYXlvdXRDb2xzID0gU3R5bGVDb25maWdbdGhpcy4kLnNob3dTdHlsZS52YWx1ZV1cbiAgICAgICAgaGFsbENvbmZpZy5zbG90cyA9IFtdXG5cbiAgICAgICAgLy8g5qC55o2u5YWl5Y+j6YWN572u5Yib5bu65YWl5Y+j5L2N572uXG4gICAgICAgIGxldCBjb25maWcgPSBTdHlsZUNvbmZpZ1t0aGlzLiQuc2hvd1N0eWxlLnZhbHVlXVxuXG4gICAgICAgIGlmIChjb25maWcpIHtcbiAgICAgICAgICAgIGNyZWF0ZUVudHJ5U2xvdHMuY2FsbCh0aGlzLGNvbmZpZylcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxldCB1cGRhdGVQbGF0Zm9ybVR5cGUgPSAoKSA9PiB7XG4gICAgICAgIGxldCB0ID0gW11cblxuICAgICAgICBpZiAodGhpcy4kLmxpbWl0X3BsYXRmb3JtX3RjeS52YWx1ZSkge1xuICAgICAgICAgICAgdC5wdXNoKFwidGN5XCIpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuJC5saW1pdF9wbGF0Zm9ybV9wbGF0Zm9ybXNldC52YWx1ZSkge1xuICAgICAgICAgICAgdC5wdXNoKFwicGxhdGZvcm1zZXRcIilcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy4kLmxpbWl0X3BsYXRmb3JtX3BsYXRmb3Jtc2V0dGN5LnZhbHVlKSB7XG4gICAgICAgICAgICB0LnB1c2goXCJwbGF0Zm9ybXNldHRjeVwiKVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLiQubGltaXRfcGxhdGZvcm1fbWluaWdhbWUudmFsdWUpIHtcbiAgICAgICAgICAgIHQucHVzaChcIm1pbmlnYW1lXCIpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuJC5saW1pdF9wbGF0Zm9ybV9taW5pZ2FtZWlvcy52YWx1ZSkge1xuICAgICAgICAgICAgdC5wdXNoKFwibWluaWdhbWVpb3NcIilcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0LmpvaW4oXCIsXCIpXG4gICAgfVxuXG4gICAgdGhpcy4kLmxpbWl0X3BsYXRmb3JtX3RjeS5vbmNoYW5nZSA9ICgpPT4ge1xuICAgICAgICBoYWxsQ29uZmlnLnNldHRpbmcucGxhdGZyb21UeXBlID0gdXBkYXRlUGxhdGZvcm1UeXBlKClcbiAgICB9XG4gICAgdGhpcy4kLmxpbWl0X3BsYXRmb3JtX3BsYXRmb3Jtc2V0Lm9uY2hhbmdlID0gKCk9PiB7XG4gICAgICAgIGhhbGxDb25maWcuc2V0dGluZy5wbGF0ZnJvbVR5cGUgPSB1cGRhdGVQbGF0Zm9ybVR5cGUoKVxuICAgIH1cbiAgICB0aGlzLiQubGltaXRfcGxhdGZvcm1fcGxhdGZvcm1zZXR0Y3kub25jaGFuZ2UgPSAoKT0+IHtcbiAgICAgICAgaGFsbENvbmZpZy5zZXR0aW5nLnBsYXRmcm9tVHlwZSA9IHVwZGF0ZVBsYXRmb3JtVHlwZSgpXG4gICAgfVxuICAgIHRoaXMuJC5saW1pdF9wbGF0Zm9ybV9taW5pZ2FtZS5vbmNoYW5nZSA9ICgpPT4ge1xuICAgICAgICBoYWxsQ29uZmlnLnNldHRpbmcucGxhdGZyb21UeXBlID0gdXBkYXRlUGxhdGZvcm1UeXBlKClcbiAgICB9XG4gICAgdGhpcy4kLmxpbWl0X3BsYXRmb3JtX21pbmlnYW1laW9zLm9uY2hhbmdlID0gKCk9PiB7XG4gICAgICAgIGhhbGxDb25maWcuc2V0dGluZy5wbGF0ZnJvbVR5cGUgPSB1cGRhdGVQbGF0Zm9ybVR5cGUoKVxuICAgIH1cblxuICAgIHRoaXMuJC5saW1pdF9ib3V0Lm9uY2hhbmdlID0gKCk9PiB7XG4gICAgICAgIGhhbGxDb25maWcuc2V0dGluZy5saW1pdF9ib3V0ID0gdGhpcy4kLmxpbWl0X2JvdXQudmFsdWVcbiAgICB9XG4gICAgdGhpcy4kLmxpbWl0X2NyZWF0ZWRheXMub25jaGFuZ2UgPSAoKT0+IHtcbiAgICAgICAgaGFsbENvbmZpZy5zZXR0aW5nLmxpbWl0X2RheXMgPSB0aGlzLiQubGltaXRfY3JlYXRlZGF5cy52YWx1ZVxuICAgIH1cblxuICAgIHRoaXMuJC5jaGVja01vcmVnYW1lLm9uY2hhbmdlID0gKCkgPT4ge1xuICAgICAgICBoYWxsQ29uZmlnLnNldHRpbmcuc2hvd01vcmVnYW1lID0gdGhpcy4kLmNoZWNrTW9yZWdhbWUudmFsdWVcbiAgICB9XG5cbiAgICB0aGlzLiQuY2hlY2tRdWlja1N0YXJ0Lm9uY2hhbmdlID0gKCkgPT4ge1xuICAgICAgICBoYWxsQ29uZmlnLnNldHRpbmcuc2hvd1F1aWNrU3RhcnQgPSB0aGlzLiQuY2hlY2tRdWlja1N0YXJ0LnZhbHVlXG4gICAgfVxuXG4gICAgdGhpcy4kLmNoZWNrU2hvd1J1bGUub25jaGFuZ2UgPSAoKSA9PiB7XG4gICAgICAgIGhhbGxDb25maWcuc2V0dGluZy5zaG93UnVsZSA9IHRoaXMuJC5jaGVja1Nob3dSdWxlLnZhbHVlXG4gICAgfVxuICAgIFxuICAgIHRoaXMuJC5jaGVja1Nob3dSb2xlLm9uY2hhbmdlID0gKCkgPT4ge1xuICAgICAgICBoYWxsQ29uZmlnLnNldHRpbmcuc2hvd1JvbGUgPSB0aGlzLiQuY2hlY2tTaG93Um9sZS52YWx1ZVxuICAgICAgICB0aGlzLiQuZGl2Um9sZVByZWZhYi5oaWRkZW4gPSAhdGhpcy4kLmNoZWNrU2hvd1JvbGUudmFsdWVcbiAgICAgICAgdGhpcy4kLmRpdkFyZWFMYXlvdXQuaGlkZGVuID0gdGhpcy4kLmNoZWNrU2hvd1JvbGUudmFsdWVcbiAgICB9XG5cbiAgICB0aGlzLiQuY2hlY2tTaG93UnVsZS5vbmNoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgaGFsbENvbmZpZy5zZXR0aW5nLnNob3dSdWxlID0gdGhpcy4kLmNoZWNrU2hvd1J1bGUudmFsdWVcbiAgICB9XG5cbiAgICB0aGlzLiQuY2hlY2tCYWNrVG9GaXJzdExheWVyLm9uY2hhbmdlID0gKCkgPT4ge1xuICAgICAgICBoYWxsQ29uZmlnLnNldHRpbmcuYmFja3RvRmlyc3RMYXllciA9IHRoaXMuJC5jaGVja0JhY2tUb0ZpcnN0TGF5ZXIudmFsdWVcbiAgICB9XG4gICAgXG4gICAgdGhpcy4kLnJvbGVQcmVmYWJBc3NldDEub25jaGFuZ2UgPSAoKSA9PiB7XG4gICAgICAgIGhhbGxDb25maWcuc2V0dGluZy5yb2xlUHJlZmFiQm95ID0gdGhpcy4kLnJvbGVQcmVmYWJBc3NldDEudmFsdWVcbiAgICB9XG5cbiAgICB0aGlzLiQucm9sZVByZWZhYkFzc2V0Mi5vbmNoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgaGFsbENvbmZpZy5zZXR0aW5nLnJvbGVQcmVmYWJHaXJsID0gdGhpcy4kLnJvbGVQcmVmYWJBc3NldDIudmFsdWVcbiAgICB9XG5cbiAgICB0aGlzLiQuY2hlY2tBcmVhQ2VudGVyLm9uY2hhbmdlID0gKCkgPT4ge1xuICAgICAgICBoYWxsQ29uZmlnLnNldHRpbmcuaXNBcmVhQ2VudGVyUG9zdGlvbiA9IHRoaXMuJC5jaGVja0FyZWFDZW50ZXIudmFsdWVcbiAgICB9XG5cbiAgICB0aGlzLiQuaW5wdXRBcmVhU3BhY2Uub25jaGFuZ2UgPSAoKSA9PiB7XG4gICAgICAgIGhhbGxDb25maWcuc2V0dGluZy5hcmVhU3BhY2UgPSB0aGlzLiQuaW5wdXRBcmVhU3BhY2UudmFsdWVcbiAgICB9XG5cbiAgICB0aGlzLiQubXVzaWNBc3NldC5vbmNoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgaGFsbENvbmZpZy5zZXR0aW5nLm11c2ljQ2xpcCA9IHRoaXMuJC5tdXNpY0Fzc2V0LnZhbHVlXG4gICAgfVxuXG4gICAgdGhpcy4kLmJhY2tncm91bmRBc3NldC5vbmNoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgaGFsbENvbmZpZy5zZXR0aW5nLmJhY2tncm91bmRQcmVmYWIgPSB0aGlzLiQuYmFja2dyb3VuZEFzc2V0LnZhbHVlXG4gICAgfVxuXG4gICAgdGhpcy4kLmJhY2tncm91bmRCb3R0b21JbWFnZS5vbmNoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgaGFsbENvbmZpZy5zZXR0aW5nLmJhY2tncm91bmRCb3R0b21JbWFnZSA9IHRoaXMuJC5iYWNrZ3JvdW5kQm90dG9tSW1hZ2UudmFsdWVcbiAgICB9XG4gXG4gICAgdGhpcy4kLmlucHV0U2tld1gub25jaGFuZ2UgPSAoKSA9PiB7XG4gICAgICAgIGhhbGxDb25maWcuc2V0dGluZy5za2V3WCA9IHRoaXMuJC5pbnB1dFNrZXdYLnZhbHVlXG4gICAgfVxufVxuXG5mdW5jdGlvbiBpbml0Q29tbW9uUHJvcFNldHRpbmcoKSB7XG4gICAgdGhpcy4kLnByb3BQcmVmYWJBc3NldC5oaWRkZW4gPSB0cnVlXG4gICAgdGhpcy4kLnByb3BSZW1vdGVJbWFnZUFzc2V0LmhpZGRlbiA9IHRydWVcblxuICAgIHRoaXMuJC5wcm9wQXNzZXRUeXBlLm9uY2hhbmdlID0gKCkgPT4ge1xuICAgICAgICB0aGlzLiQucHJvcEltYWdlQXNzZXQuaGlkZGVuID0gdHJ1ZVxuICAgICAgICB0aGlzLiQucHJvcFByZWZhYkFzc2V0LmhpZGRlbiA9IHRydWVcbiAgICAgICAgdGhpcy4kLnByb3BSZW1vdGVJbWFnZUFzc2V0LmhpZGRlbiA9IHRydWVcblxuICAgICAgICBpZiAodGhpcy4kLnByb3BBc3NldFR5cGUudmFsdWUgPT0gXCJpbWFnZVwiKSB7XG4gICAgICAgICAgICB0aGlzLiQucHJvcEltYWdlQXNzZXQuaGlkZGVuID0gZmFsc2VcblxuICAgICAgICAgICAgaWYgKGN1clNsb3RQcm9wKSB7XG4gICAgICAgICAgICAgICAgY3VyU2xvdFByb3AuYmFja2dyb3VuZFR5cGUgPSAwXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLiQucHJvcEFzc2V0VHlwZS52YWx1ZSA9PSBcInByZWZhYlwiKSB7XG4gICAgICAgICAgICB0aGlzLiQucHJvcFByZWZhYkFzc2V0LmhpZGRlbiA9IGZhbHNlXG5cbiAgICAgICAgICAgIGlmIChjdXJTbG90UHJvcCkge1xuICAgICAgICAgICAgICAgIGN1clNsb3RQcm9wLmJhY2tncm91bmRUeXBlID0gMVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuJC5wcm9wQXNzZXRUeXBlLnZhbHVlID09IFwicmVtb3RlaW1hZ2VcIikge1xuICAgICAgICAgICAgdGhpcy4kLnByb3BSZW1vdGVJbWFnZUFzc2V0LmhpZGRlbiA9IGZhbHNlXG5cbiAgICAgICAgICAgIGlmIChjdXJTbG90UHJvcCkge1xuICAgICAgICAgICAgICAgIGN1clNsb3RQcm9wLmJhY2tncm91bmRUeXBlID0gMlxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy4kLnByb3BJbWFnZUFzc2V0Lm9uY2hhbmdlID0gKCkgPT4ge1xuICAgICAgICBpZiAoY3VyU2xvdFByb3ApIHtcbiAgICAgICAgICAgIGN1clNsb3RQcm9wLmJhY2tncm91bmRJbWFnZSA9IHRoaXMuJC5wcm9wSW1hZ2VBc3NldC52YWx1ZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy4kLnByb3BQcmVmYWJBc3NldC5vbmNoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgaWYgKGN1clNsb3RQcm9wKSB7XG4gICAgICAgICAgICBjdXJTbG90UHJvcC5iYWNrZ3JvdW5kUHJlZmFiID0gdGhpcy4kLnByb3BQcmVmYWJBc3NldC52YWx1ZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy4kLnByb3BJbWFnZVVybC5vbmNoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgdGhpcy4kLnByb3BSZW1vdGVJbWFnZS5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLHRoaXMuJC5wcm9wSW1hZ2VVcmwudmFsdWUpXG5cbiAgICAgICAgaWYgKGN1clNsb3RQcm9wKSB7XG4gICAgICAgICAgICBjdXJTbG90UHJvcC5iYWNrZ3JvdW5kVXJsID0gdGhpcy4kLnByb3BJbWFnZVVybC52YWx1ZVxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBpbml0QXJlYVByb3BTZXR0aW5nKCkge1xuICAgIHRoaXMuJC5hcmVhUHJvcEFyZWFUeXBlSWQub25jaGFuZ2UgPSAoKSA9PiB7XG4gICAgICAgIGlmIChjdXJTbG90UHJvcCkge1xuICAgICAgICAgICAgY3VyU2xvdFByb3AuYXJlYVR5cGVJZCA9IHRoaXMuJC5hcmVhUHJvcEFyZWFUeXBlSWQudmFsdWVcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuJC5hcmVhUHJvcERlZmF1bHRBcmVhLm9uY2hhbmdlID0gKCkgPT4ge1xuICAgICAgICBpZiAoY3VyU2xvdFByb3ApIHtcbiAgICAgICAgICAgIGN1clNsb3RQcm9wLmlzRGVmYXVsdEFyZWEgPSB0aGlzLiQuYXJlYVByb3BEZWZhdWx0QXJlYS52YWx1ZSA/IDEgOiAwXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLiQuYXJlYVByb3BTY29yZUFyZWEub25jaGFuZ2UgPSAoKSA9PiB7XG4gICAgICAgIGlmIChjdXJTbG90UHJvcCkge1xuICAgICAgICAgICAgY3VyU2xvdFByb3AuaXNTY29yZUFyZWEgPSB0aGlzLiQuYXJlYVByb3BTY29yZUFyZWEudmFsdWU/IDEgOiAwXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGluaXRSb29tUHJvcFNldHRpbmcoKSB7XG4gICAgdGhpcy4kLnJvb21Qcm9wUm9vbVR5cGVJZC5vbmNoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgaWYgKGN1clNsb3RQcm9wKSB7XG4gICAgICAgICAgICBjdXJTbG90UHJvcC5yb29tVHlwZUlkID0gdGhpcy4kLnJvb21Qcm9wUm9vbVR5cGVJZC52YWx1ZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy4kLnJvb21Qcm9wQXJlYVR5cGVJZC5vbmNoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgaWYgKGN1clNsb3RQcm9wKSB7XG4gICAgICAgICAgICBjdXJTbG90UHJvcC5hcmVhVHlwZUlkID0gdGhpcy4kLnJvb21Qcm9wQXJlYVR5cGVJZC52YWx1ZVxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBpbml0Q3VzdG9tUHJvcFNldHRpbmcoKSB7XG4gICAgdGhpcy4kLmN1c3RvbVByb3BKdW1wSWQub25jaGFuZ2UgPSAoKSA9PiB7XG4gICAgICAgIGlmIChjdXJTbG90UHJvcCkge1xuICAgICAgICAgICAgY3VyU2xvdFByb3AuanVtcElkID0gdGhpcy4kLmN1c3RvbVByb3BKdW1wSWQudmFsdWVcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gaW5pdE1vcmVnYW1lUHJvcFNldHRpbmcoKSB7XG4gICAgdGhpcy4kLm1vcmVnYW1lUHJvcFVybC5vbmNoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgaWYgKGN1clNsb3RQcm9wKSB7XG4gICAgICAgICAgICBjdXJTbG90UHJvcC5hYmJyID0gdGhpcy4kLm1vcmVnYW1lUHJvcFVybC52YWx1ZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy4kLm1vcmVnYW1lUHJvcFNsb3RTaXplLm9uY2hhbmdlID0gKCkgPT4ge1xuICAgICAgICBpZiAoY3VyU2xvdFByb3ApIHtcbiAgICAgICAgICAgIGN1clNsb3RQcm9wLnNsb3RTaXplID0gcGFyc2VJbnQodGhpcy4kLm1vcmVnYW1lUHJvcFNsb3RTaXplLnZhbHVlKVxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBpbml0R2FtZVByb3BTZXR0aW5nKCkge1xuICAgIHRoaXMuJC5nYW1lUHJvcEFiYnIub25jaGFuZ2UgPSAoKSA9PiB7XG4gICAgICAgIGlmIChjdXJTbG90UHJvcCkge1xuICAgICAgICAgICAgY3VyU2xvdFByb3AuYWJiciA9IHRoaXMuJC5nYW1lUHJvcEFiYnIudmFsdWVcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gaGlkZVByb3BlcnRpZXMoKSB7XG4gICAgdGhpcy4kLnByb3AuaGVhZGVyID0gXCLoioLngrnlsZ7mgKdcIlxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLiQucHJvcC5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLiQucHJvcC5jaGlsZHJlbltpXS5oaWRkZW4gPSB0cnVlXG4gICAgfVxufVxuXG5mdW5jdGlvbiBzaG93Q29tbW9uUHJvcGVydGllcygpIHtcbiAgICB0aGlzLiQucHJvcEltYWdlQXNzZXQuaGlkZGVuID0gdHJ1ZVxuICAgIHRoaXMuJC5wcm9wUHJlZmFiQXNzZXQuaGlkZGVuID0gdHJ1ZVxuICAgIHRoaXMuJC5wcm9wUmVtb3RlSW1hZ2VBc3NldC5oaWRkZW4gPSB0cnVlXG4gICAgdGhpcy4kLnByb3BBc3NldFR5cGUudmFsdWUgPSBcImltYWdlXCJcblxuICAgIHN3aXRjaChjdXJTbG90UHJvcC5iYWNrZ3JvdW5kVHlwZSkge1xuICAgICAgICBjYXNlIDAgOlxuICAgICAgICAgICAgLy8g5Zu+54mHXG4gICAgICAgICAgICB0aGlzLiQucHJvcEltYWdlQXNzZXQuaGlkZGVuID0gZmFsc2VcbiAgICAgICAgICAgIHRoaXMuJC5wcm9wQXNzZXRUeXBlLnZhbHVlID0gXCJpbWFnZVwiXG4gICAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDEgOlxuICAgICAgICAgICAgLy8g6aKE5Yi25L2TXG4gICAgICAgICAgICB0aGlzLiQucHJvcFByZWZhYkFzc2V0LmhpZGRlbiA9IGZhbHNlXG4gICAgICAgICAgICB0aGlzLiQucHJvcEFzc2V0VHlwZS52YWx1ZSA9IFwicHJlZmFiXCJcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgMiA6XG4gICAgICAgICAgICAvLyBXRULlm77niYdcbiAgICAgICAgICAgIHRoaXMuJC5wcm9wUmVtb3RlSW1hZ2VBc3NldC5oaWRkZW4gPSBmYWxzZVxuICAgICAgICAgICAgdGhpcy4kLnByb3BBc3NldFR5cGUudmFsdWUgPSBcInJlbW90ZWltYWdlXCJcbiAgICAgICAgICAgIGJyZWFrXG4gICAgfVxuXG4gICAgdGhpcy4kLnByb3BJbWFnZUFzc2V0LnZhbHVlID0gY3VyU2xvdFByb3AuYmFja2dyb3VuZEltYWdlIHx8IFwiXCJcbiAgICB0aGlzLiQucHJvcFByZWZhYkFzc2V0LnZhbHVlID0gY3VyU2xvdFByb3AuYmFja2dyb3VuZFByZWZhYiB8fCBcIlwiXG4gICAgXG4gICAgaWYgKGN1clNsb3RQcm9wLmJhY2tncm91bmRVcmwpIHtcbiAgICAgICAgdGhpcy4kLnByb3BJbWFnZVVybC52YWx1ZSA9IGN1clNsb3RQcm9wLmJhY2tncm91bmRVcmxcbiAgICAgICAgdGhpcy4kLnByb3BSZW1vdGVJbWFnZS5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLHRoaXMuJC5wcm9wSW1hZ2VVcmwudmFsdWUpXG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy4kLnByb3BJbWFnZVVybC52YWx1ZSA9IFwiXCJcbiAgICAgICAgdGhpcy4kLnByb3BSZW1vdGVJbWFnZS5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLFwiXCIpXG4gICAgfVxufVxuXG4vKipcbiAqIOWkp+WMuuWFpeWPo+WxnuaAp1xuICovXG5mdW5jdGlvbiBzaG93QXJlYVByb3BlcnRpZXMoKSB7XG4gICAgdGhpcy4kLnByb3AuaGVhZGVyID0gXCLoioLngrnlsZ7mgKct5Yy65Z+fXCJcbiAgICB0aGlzLiQuYXJlYVByb3AuaGlkZGVuID0gZmFsc2VcblxuICAgIHRoaXMuJC5hcmVhUHJvcEFyZWFUeXBlSWQudmFsdWUgPSBjdXJTbG90UHJvcC5hcmVhVHlwZUlkXG4gICAgdGhpcy4kLmFyZWFQcm9wRGVmYXVsdEFyZWEudmFsdWUgPSBjdXJTbG90UHJvcC5pc0RlZmF1bHRBcmVhID8gdHJ1ZSA6IGZhbHNlXG4gICAgdGhpcy4kLmFyZWFQcm9wU2NvcmVBcmVhLnZhbHVlID0gY3VyU2xvdFByb3AuaXNTY29yZUFyZWE/IHRydWUgOiBmYWxzZVxufVxuXG4vKipcbiAqIOaIv+mXtOWFpeWPo+WxnuaAp1xuICovXG5mdW5jdGlvbiBzaG93Um9vbVByb3BlcnRpZXMoKSB7XG4gICAgdGhpcy4kLnByb3AuaGVhZGVyID0gXCLoioLngrnlsZ7mgKct5oi/6Ze0XCJcbiAgICB0aGlzLiQucm9vbVByb3AuaGlkZGVuID0gZmFsc2VcblxuICAgIHRoaXMuJC5yb29tUHJvcFJvb21UeXBlSWQudmFsdWUgPSBjdXJTbG90UHJvcC5yb29tVHlwZUlkIHx8IDBcbiAgICB0aGlzLiQucm9vbVByb3BBcmVhVHlwZUlkLnZhbHVlID0gY3VyU2xvdFByb3AuYXJlYVR5cGVJZCB8fCAwXG59XG5cbi8qKlxuICog6Ieq5a6a5LmJ5YWl5Y+j5bGe5oCnXG4gKi9cbmZ1bmN0aW9uIHNob3dDdXN0b21Qcm9wZXJ0aWVzKCkge1xuICAgIHRoaXMuJC5wcm9wLmhlYWRlciA9IFwi6IqC54K55bGe5oCnLeiHquWumuS5iVwiXG4gICAgdGhpcy4kLmN1c3RvbVByb3AuaGlkZGVuID0gZmFsc2VcblxuICAgIHRoaXMuJC5jdXN0b21Qcm9wSnVtcElkLnZhbHVlID0gY3VyU2xvdFByb3AuanVtcElkXG59XG5cbi8qKlxuICog6IGU6L+Q5ri45oiP5bGe5oCnXG4gKi9cbmZ1bmN0aW9uIHNob3dNb3JlZ2FtZVByb3BlcnRpZXMoKSB7XG4gICAgdGhpcy4kLnByb3AuaGVhZGVyID0gXCLoioLngrnlsZ7mgKct6IGU6L+QXCJcbiAgICB0aGlzLiQubW9yZWdhbWVQcm9wLmhpZGRlbiA9IGZhbHNlXG5cbiAgICB0aGlzLiQubW9yZWdhbWVQcm9wVXJsLnZhbHVlID0gY3VyU2xvdFByb3AuYWJiclxuICAgIHRoaXMuJC5tb3JlZ2FtZVByb3BTbG90U2l6ZS52YWx1ZSA9IGN1clNsb3RQcm9wLnNsb3RTaXplIHx8IDBcbn1cblxuLyoqXG4gKiDmuLjmiI/ot7PovazlsZ7mgKdcbiAqL1xuZnVuY3Rpb24gc2hvd0dhbWVQcm9wZXJ0aWVzKCkge1xuICAgIHRoaXMuJC5wcm9wLmhlYWRlciA9IFwi6IqC54K55bGe5oCnLea4uOaIj1wiXG4gICAgdGhpcy4kLmdhbWVQcm9wLmhpZGRlbiA9IGZhbHNlXG5cbiAgICB0aGlzLiQuZ2FtZVByb3BBYmJyLnZhbHVlID0gY3VyU2xvdFByb3AuYWJiclxufSJdfQ==
