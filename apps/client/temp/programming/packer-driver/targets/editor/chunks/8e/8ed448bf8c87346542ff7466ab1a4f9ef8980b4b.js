System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, EntityManager, BulletStateMachine, EntityStateEnum, DataManager, _dec, _class, _crd, ccclass, property, BulletManager;

  function _reportPossibleCrUseOfEntityManager(extras) {
    _reporterNs.report("EntityManager", "../../Base/EntityManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfIBullet(extras) {
    _reporterNs.report("IBullet", "../../Common/State", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEntityTypeEnum(extras) {
    _reporterNs.report("EntityTypeEnum", "../../Common/Enum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBulletStateMachine(extras) {
    _reporterNs.report("BulletStateMachine", "./BulletStateMachine", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEntityStateEnum(extras) {
    _reporterNs.report("EntityStateEnum", "../../Enum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfDataManager(extras) {
    _reporterNs.report("DataManager", "../../Global/DataManager", _context.meta, extras);
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
      BulletStateMachine = _unresolved_3.BulletStateMachine;
    }, function (_unresolved_4) {
      EntityStateEnum = _unresolved_4.EntityStateEnum;
    }, function (_unresolved_5) {
      DataManager = _unresolved_5.default;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "c4ad34pna9NrbIJw2/+Bfyk", "BulletManager", undefined);

      __checkObsolete__(['_decorator', 'Component']);

      __checkObsolete__(['instantiate']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("BulletManager", BulletManager = (_dec = ccclass('BulletManager'), _dec(_class = class BulletManager extends (_crd && EntityManager === void 0 ? (_reportPossibleCrUseOfEntityManager({
        error: Error()
      }), EntityManager) : EntityManager) {
        constructor(...args) {
          super(...args);
          this.type = void 0;
        }

        init(data) {
          this.type = data.type;
          this.fsm = this.addComponent(_crd && BulletStateMachine === void 0 ? (_reportPossibleCrUseOfBulletStateMachine({
            error: Error()
          }), BulletStateMachine) : BulletStateMachine);
          this.fsm.init(data.type);
          this.state = (_crd && EntityStateEnum === void 0 ? (_reportPossibleCrUseOfEntityStateEnum({
            error: Error()
          }), EntityStateEnum) : EntityStateEnum).Idle;
        }

        tick(deltaTime) {
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
              type: InputTypeEnum.ActorMove,
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
          const angle = rad2Angle(rad);
          this.__wm.node.angle = angle;
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=8ed448bf8c87346542ff7466ab1a4f9ef8980b4b.js.map