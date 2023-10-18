System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, EntityManager, EntityStateEnum, WeaponStateMachine, _dec, _class, _crd, ccclass, property, WeaponManager;

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
    }, function (_unresolved_2) {
      EntityManager = _unresolved_2.EntityManager;
    }, function (_unresolved_3) {
      EntityStateEnum = _unresolved_3.EntityStateEnum;
    }, function (_unresolved_4) {
      WeaponStateMachine = _unresolved_4.WeaponStateMachine;
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
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=7f5c4a372a55fde0851480bc6c589fe4e1651442.js.map