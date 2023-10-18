System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5", "__unresolved_6"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, DataManager, InputTypeEnum, EntityManager, EntityStateEnum, EventEnum, WeaponStateMachine, EventManager, UITransform, Vec2, _dec, _class, _crd, ccclass, property, WeaponManager;

  function _reportPossibleCrUseOfDataManager(extras) {
    _reporterNs.report("DataManager", "../../Global/DataManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfInputTypeEnum(extras) {
    _reporterNs.report("InputTypeEnum", "../../Common/Enum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfIActor(extras) {
    _reporterNs.report("IActor", "../../Common/State", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEntityManager(extras) {
    _reporterNs.report("EntityManager", "../../Base/EntityManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEntityStateEnum(extras) {
    _reporterNs.report("EntityStateEnum", "../../Enum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEventEnum(extras) {
    _reporterNs.report("EventEnum", "../../Enum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfWeaponStateMachine(extras) {
    _reporterNs.report("WeaponStateMachine", "./WeaponStateMachine", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEventManager(extras) {
    _reporterNs.report("EventManager", "../../Global/EventManager", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      UITransform = _cc.UITransform;
      Vec2 = _cc.Vec2;
    }, function (_unresolved_2) {
      DataManager = _unresolved_2.default;
    }, function (_unresolved_3) {
      InputTypeEnum = _unresolved_3.InputTypeEnum;
    }, function (_unresolved_4) {
      EntityManager = _unresolved_4.EntityManager;
    }, function (_unresolved_5) {
      EntityStateEnum = _unresolved_5.EntityStateEnum;
      EventEnum = _unresolved_5.EventEnum;
    }, function (_unresolved_6) {
      WeaponStateMachine = _unresolved_6.WeaponStateMachine;
    }, function (_unresolved_7) {
      EventManager = _unresolved_7.default;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "91630+lBSVCb5rbGj208Ukf", "WeaponManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'input']);

      __checkObsolete__(['instantiate']);

      __checkObsolete__(['Node']);

      __checkObsolete__(['UITransform']);

      __checkObsolete__(['Vec2']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("WeaponManager", WeaponManager = (_dec = ccclass('WeaponManager'), _dec(_class = class WeaponManager extends (_crd && EntityManager === void 0 ? (_reportPossibleCrUseOfEntityManager({
        error: Error()
      }), EntityManager) : EntityManager) {
        constructor() {
          super(...arguments);
          this.__body = null;
          this.__anchor = null;
          this.__point = null;
          this.__owner = 0;
        }

        init(data) {
          this.__owner = data.id;
          this.__body = this.node.getChildByName('Body');
          this.__anchor = this.__body.getChildByName('Anchor');
          this.__point = this.__anchor.getChildByName('Point');
          this.fsm = this.__body.addComponent(_crd && WeaponStateMachine === void 0 ? (_reportPossibleCrUseOfWeaponStateMachine({
            error: Error()
          }), WeaponStateMachine) : WeaponStateMachine);
          this.fsm.init(data.weaponType);
          this.state = (_crd && EntityStateEnum === void 0 ? (_reportPossibleCrUseOfEntityStateEnum({
            error: Error()
          }), EntityStateEnum) : EntityStateEnum).Idle;
          (_crd && EventManager === void 0 ? (_reportPossibleCrUseOfEventManager({
            error: Error()
          }), EventManager) : EventManager).Instance.on((_crd && EventEnum === void 0 ? (_reportPossibleCrUseOfEventEnum({
            error: Error()
          }), EventEnum) : EventEnum).shot, this.handleWeaponShot, this);
        }

        onDestroy() {
          (_crd && EventManager === void 0 ? (_reportPossibleCrUseOfEventManager({
            error: Error()
          }), EventManager) : EventManager).Instance.off((_crd && EventEnum === void 0 ? (_reportPossibleCrUseOfEventEnum({
            error: Error()
          }), EventEnum) : EventEnum).shot, this.handleWeaponShot, this);
        }

        handleWeaponShot() {
          var pointWorldPos = this.__point.getWorldPosition();

          var pointStagePos = (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).Instance.stage.getComponent(UITransform).convertToNodeSpaceAR(pointWorldPos);

          var anchorWorldPos = this.__anchor.getWorldPosition();

          var direction = new Vec2(pointWorldPos.x - anchorWorldPos.x, pointWorldPos.y - anchorWorldPos.y).normalize();
          (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).Instance.applyInput({
            type: (_crd && InputTypeEnum === void 0 ? (_reportPossibleCrUseOfInputTypeEnum({
              error: Error()
            }), InputTypeEnum) : InputTypeEnum).Shot,
            owner: this.__owner,
            position: {
              x: pointStagePos.x,
              y: pointStagePos.y
            },
            direction: {
              x: direction.x,
              y: direction.y
            }
          });
          console.log((_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).Instance.state.bullets);
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=3e98754fb7e5cef26d80c58791e96ce1649e8854.js.map