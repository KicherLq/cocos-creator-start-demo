System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5", "__unresolved_6", "__unresolved_7"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, DataManager, EntityTypeEnum, InputTypeEnum, EntityManager, ActorStateMachine, EntityStateEnum, instantiate, WeaponManager, rad2Angle, ProgressBar, _dec, _class, _crd, ccclass, property, ActorManager;

  function _reportPossibleCrUseOfDataManager(extras) {
    _reporterNs.report("DataManager", "../../Global/DataManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEntityTypeEnum(extras) {
    _reporterNs.report("EntityTypeEnum", "../../Common/Enum", _context.meta, extras);
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

  function _reportPossibleCrUseOfActorStateMachine(extras) {
    _reporterNs.report("ActorStateMachine", "./ActorStateMachine", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEntityStateEnum(extras) {
    _reporterNs.report("EntityStateEnum", "../../Enum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfWeaponManager(extras) {
    _reporterNs.report("WeaponManager", "../Weapon/WeaponManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfrad2Angle(extras) {
    _reporterNs.report("rad2Angle", "../../Utils", _context.meta, extras);
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
      ProgressBar = _cc.ProgressBar;
    }, function (_unresolved_2) {
      DataManager = _unresolved_2.default;
    }, function (_unresolved_3) {
      EntityTypeEnum = _unresolved_3.EntityTypeEnum;
      InputTypeEnum = _unresolved_3.InputTypeEnum;
    }, function (_unresolved_4) {
      EntityManager = _unresolved_4.EntityManager;
    }, function (_unresolved_5) {
      ActorStateMachine = _unresolved_5.ActorStateMachine;
    }, function (_unresolved_6) {
      EntityStateEnum = _unresolved_6.EntityStateEnum;
    }, function (_unresolved_7) {
      WeaponManager = _unresolved_7.WeaponManager;
    }, function (_unresolved_8) {
      rad2Angle = _unresolved_8.rad2Angle;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "c7aecPe449FoZG/f9Jb6E7F", "ActorManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'input']);

      __checkObsolete__(['instantiate']);

      __checkObsolete__(['ProgressBar']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("ActorManager", ActorManager = (_dec = ccclass('ActorManager'), _dec(_class = class ActorManager extends (_crd && EntityManager === void 0 ? (_reportPossibleCrUseOfEntityManager({
        error: Error()
      }), EntityManager) : EntityManager) {
        constructor(...args) {
          super(...args);
          this.bulletType = void 0;
          this.__wm = null;
          this.__id = 1;
          this.__hp = null;
        }

        init(data) {
          this.bulletType = data.bulletType;
          this.__hp = this.node.getComponentInChildren(ProgressBar);
          this.__id = data.id;
          this.fsm = this.addComponent(_crd && ActorStateMachine === void 0 ? (_reportPossibleCrUseOfActorStateMachine({
            error: Error()
          }), ActorStateMachine) : ActorStateMachine);
          this.fsm.init(data.type);
          this.state = (_crd && EntityStateEnum === void 0 ? (_reportPossibleCrUseOfEntityStateEnum({
            error: Error()
          }), EntityStateEnum) : EntityStateEnum).Idle;
          const prefeb = (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).Instance.prefabMap.get((_crd && EntityTypeEnum === void 0 ? (_reportPossibleCrUseOfEntityTypeEnum({
            error: Error()
          }), EntityTypeEnum) : EntityTypeEnum).Weapon1);
          const weapon = instantiate(prefeb);
          weapon.setParent(this.node);
          this.__wm = weapon.addComponent(_crd && WeaponManager === void 0 ? (_reportPossibleCrUseOfWeaponManager({
            error: Error()
          }), WeaponManager) : WeaponManager);

          this.__wm.init(data);
        }

        tick(deltaTime) {
          if ((_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).Instance.myPlayerId !== this.__id) {
            return;
          }

          if ((_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).Instance.jm.output.length()) {
            const {
              x,
              y
            } = (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
              error: Error()
            }), DataManager) : DataManager).Instance.jm.output;
            (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
              error: Error()
            }), DataManager) : DataManager).Instance.applyInput({
              id: 1,
              type: (_crd && InputTypeEnum === void 0 ? (_reportPossibleCrUseOfInputTypeEnum({
                error: Error()
              }), InputTypeEnum) : InputTypeEnum).ActorMove,
              direction: {
                x,
                y
              },
              deltaTime
            });
            this.state = (_crd && EntityStateEnum === void 0 ? (_reportPossibleCrUseOfEntityStateEnum({
              error: Error()
            }), EntityStateEnum) : EntityStateEnum).Run;
          } else {
            this.state = (_crd && EntityStateEnum === void 0 ? (_reportPossibleCrUseOfEntityStateEnum({
              error: Error()
            }), EntityStateEnum) : EntityStateEnum).Idle;
          }
        }

        render(data) {
          const {
            direction,
            position
          } = data;
          this.node.setPosition(position.x, position.y);

          if (direction.x !== 0) {
            this.node.setScale(direction.x > 0 ? 1 : -1, 1);
          }

          const side = Math.sqrt(direction.x ** 2 + direction.y ** 2);
          const rad = Math.asin(direction.y / side);
          const angle = (_crd && rad2Angle === void 0 ? (_reportPossibleCrUseOfrad2Angle({
            error: Error()
          }), rad2Angle) : rad2Angle)(rad);
          this.__wm.node.angle = angle;
          this.__hp.progress = data.hp / this.__hp.totalLength;
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=7a35f6eb64a1f5defa57dd3cf83856f409b7dc2b.js.map