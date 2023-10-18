System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5", "__unresolved_6", "__unresolved_7", "__unresolved_8"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, EntityManager, EntityTypeEnum, BulletStateMachine, EntityStateEnum, EventEnum, DataManager, rad2Angle, EventManager, instantiate, ExplosionManager, _dec, _class, _crd, ccclass, property, BulletManager;

  function _reportPossibleCrUseOfEntityManager(extras) {
    _reporterNs.report("EntityManager", "../../Base/EntityManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfIBullet(extras) {
    _reporterNs.report("IBullet", "../../Common/State", _context.meta, extras);
  }

  function _reportPossibleCrUseOfIVec(extras) {
    _reporterNs.report("IVec2", "../../Common/State", _context.meta, extras);
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

  function _reportPossibleCrUseOfEventEnum(extras) {
    _reporterNs.report("EventEnum", "../../Enum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfDataManager(extras) {
    _reporterNs.report("DataManager", "../../Global/DataManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfrad2Angle(extras) {
    _reporterNs.report("rad2Angle", "../../Utils", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEventManager(extras) {
    _reporterNs.report("EventManager", "../../Global/EventManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfExplosionManager(extras) {
    _reporterNs.report("ExplosionManager", "../Explosion/ExplosionManager", _context.meta, extras);
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
      EntityManager = _unresolved_2.EntityManager;
    }, function (_unresolved_3) {
      EntityTypeEnum = _unresolved_3.EntityTypeEnum;
    }, function (_unresolved_4) {
      BulletStateMachine = _unresolved_4.BulletStateMachine;
    }, function (_unresolved_5) {
      EntityStateEnum = _unresolved_5.EntityStateEnum;
      EventEnum = _unresolved_5.EventEnum;
    }, function (_unresolved_6) {
      DataManager = _unresolved_6.default;
    }, function (_unresolved_7) {
      rad2Angle = _unresolved_7.rad2Angle;
    }, function (_unresolved_8) {
      EventManager = _unresolved_8.default;
    }, function (_unresolved_9) {
      ExplosionManager = _unresolved_9.ExplosionManager;
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
        constructor() {
          super(...arguments);
          this.type = void 0;
          this.__id = void 0;
        }

        init(data) {
          this.type = data.type;
          this.__id = data.id;
          this.fsm = this.addComponent(_crd && BulletStateMachine === void 0 ? (_reportPossibleCrUseOfBulletStateMachine({
            error: Error()
          }), BulletStateMachine) : BulletStateMachine);
          this.fsm.init(data.type);
          this.state = (_crd && EntityStateEnum === void 0 ? (_reportPossibleCrUseOfEntityStateEnum({
            error: Error()
          }), EntityStateEnum) : EntityStateEnum).Idle;
          this.node.active = false;
          (_crd && EventManager === void 0 ? (_reportPossibleCrUseOfEventManager({
            error: Error()
          }), EventManager) : EventManager).Instance.on((_crd && EventEnum === void 0 ? (_reportPossibleCrUseOfEventEnum({
            error: Error()
          }), EventEnum) : EventEnum).explosionBorn, this.handleExplosionBorn, this);
        }

        handleExplosionBorn(id, _ref) {
          var {
            x,
            y
          } = _ref;

          if (id !== this.__id) {
            return;
          } //处理子弹爆炸特效相关逻辑


          var prefab = (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).Instance.prefabMap.get((_crd && EntityTypeEnum === void 0 ? (_reportPossibleCrUseOfEntityTypeEnum({
            error: Error()
          }), EntityTypeEnum) : EntityTypeEnum).Explosion);
          var explosion = instantiate(prefab);
          explosion.setParent((_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).Instance.stage);
          var em = explosion.addComponent(_crd && ExplosionManager === void 0 ? (_reportPossibleCrUseOfExplosionManager({
            error: Error()
          }), ExplosionManager) : ExplosionManager);
          em.init((_crd && EntityTypeEnum === void 0 ? (_reportPossibleCrUseOfEntityTypeEnum({
            error: Error()
          }), EntityTypeEnum) : EntityTypeEnum).Explosion, {
            x,
            y
          }); //处理子弹销毁的相关逻辑

          (_crd && EventManager === void 0 ? (_reportPossibleCrUseOfEventManager({
            error: Error()
          }), EventManager) : EventManager).Instance.off((_crd && EventEnum === void 0 ? (_reportPossibleCrUseOfEventEnum({
            error: Error()
          }), EventEnum) : EventEnum).explosionBorn, this.handleExplosionBorn, this);
          (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).Instance.bulletMap.delete(this.__id);
          this.node.destroy();
        }

        render(data) {
          this.node.active = true;
          var {
            direction,
            position
          } = data;
          this.node.setPosition(position.x, position.y);
          var side = Math.sqrt(direction.x ** 2 + direction.y ** 2);
          var angle = (_crd && rad2Angle === void 0 ? (_reportPossibleCrUseOfrad2Angle({
            error: Error()
          }), rad2Angle) : rad2Angle)(Math.asin(direction.y / side));
          var rightAngle = (_crd && rad2Angle === void 0 ? (_reportPossibleCrUseOfrad2Angle({
            error: Error()
          }), rad2Angle) : rad2Angle)(Math.asin(-direction.y / side)) + 180;
          this.node.angle = direction.x > 0 ? angle : rightAngle;
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=6854d31039b4facdf3b4aa6acbd0bc06329a3248.js.map