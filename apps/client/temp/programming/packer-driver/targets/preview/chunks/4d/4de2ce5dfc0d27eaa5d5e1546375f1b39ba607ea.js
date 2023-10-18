System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, DataManager, EntityTypeEnum, EntityManager, EntityStateEnum, instantiate, WeaponStateMachine, _dec, _class, _crd, ccclass, property, WeaponManager;

  function _reportPossibleCrUseOfDataManager(extras) {
    _reporterNs.report("DataManager", "../../Global/DataManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEntityTypeEnum(extras) {
    _reporterNs.report("EntityTypeEnum", "../../Common/Enum", _context.meta, extras);
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

  function _reportPossibleCrUseOfWeaponStateMachine(extras) {
    _reporterNs.report("WeaponStateMachine", "./WeaponStateMachine", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      instantiate = _cc.instantiate;
    }, function (_unresolved_2) {
      DataManager = _unresolved_2.default;
    }, function (_unresolved_3) {
      EntityTypeEnum = _unresolved_3.EntityTypeEnum;
    }, function (_unresolved_4) {
      EntityManager = _unresolved_4.EntityManager;
    }, function (_unresolved_5) {
      EntityStateEnum = _unresolved_5.EntityStateEnum;
    }, function (_unresolved_6) {
      WeaponStateMachine = _unresolved_6.WeaponStateMachine;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "91630+lBSVCb5rbGj208Ukf", "WeaponManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'input']);

      __checkObsolete__(['instantiate']);

      __checkObsolete__(['Node']);

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
        }

        init(data) {
          this.__body = this.node.getChildByName('body');
          this.__anchor = this.__body.getChildByName('anchor');
          this.__body = this.node.getChildByName('body');
          this.fsm = this.addComponent(_crd && WeaponStateMachine === void 0 ? (_reportPossibleCrUseOfWeaponStateMachine({
            error: Error()
          }), WeaponStateMachine) : WeaponStateMachine);
          this.fsm.init(data.type);
          this.state = (_crd && EntityStateEnum === void 0 ? (_reportPossibleCrUseOfEntityStateEnum({
            error: Error()
          }), EntityStateEnum) : EntityStateEnum).Idle;
          var prefeb = (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).Instance.prefabMap.get((_crd && EntityTypeEnum === void 0 ? (_reportPossibleCrUseOfEntityTypeEnum({
            error: Error()
          }), EntityTypeEnum) : EntityTypeEnum).Weapon1);
          var weapon = instantiate(prefeb);
          weapon.setParent(this.node);
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=4de2ce5dfc0d27eaa5d5e1546375f1b39ba607ea.js.map