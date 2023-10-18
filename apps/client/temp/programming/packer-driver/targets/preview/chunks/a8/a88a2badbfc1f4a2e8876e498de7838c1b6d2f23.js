System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, Singleton, EntityTypeEnum, DataManager, _crd, ACTOR_SPEED;

  function _reportPossibleCrUseOfSingleton(extras) {
    _reporterNs.report("Singleton", "../Base/Singleton", _context.meta, extras);
  }

  function _reportPossibleCrUseOfIActorMove(extras) {
    _reporterNs.report("IActorMove", "../Common/State", _context.meta, extras);
  }

  function _reportPossibleCrUseOfIState(extras) {
    _reporterNs.report("IState", "../Common/State", _context.meta, extras);
  }

  function _reportPossibleCrUseOfActorManager(extras) {
    _reporterNs.report("ActorManager", "../Entity/Actor/ActorManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfJoyStickManager(extras) {
    _reporterNs.report("JoyStickManager", "../UI/JoyStickManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEntityTypeEnum(extras) {
    _reporterNs.report("EntityTypeEnum", "../Common/Enum", _context.meta, extras);
  }

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
    }, function (_unresolved_2) {
      Singleton = _unresolved_2.default;
    }, function (_unresolved_3) {
      EntityTypeEnum = _unresolved_3.EntityTypeEnum;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "1682e0WTk9Gs4rKkrrs0wud", "DataManager", undefined);

      __checkObsolete__(['Prefab']);

      __checkObsolete__(['SpriteFrame']);

      __checkObsolete__(['Node']);

      ACTOR_SPEED = 100;

      _export("default", DataManager = class DataManager extends (_crd && Singleton === void 0 ? (_reportPossibleCrUseOfSingleton({
        error: Error()
      }), Singleton) : Singleton) {
        constructor() {
          super(...arguments);
          this.jm = void 0;
          this.stage = void 0;
          this.actorMap = new Map();
          this.prefabMap = new Map();
          this.textureMap = new Map();
          this.state = {
            actors: [{
              id: 1,
              type: (_crd && EntityTypeEnum === void 0 ? (_reportPossibleCrUseOfEntityTypeEnum({
                error: Error()
              }), EntityTypeEnum) : EntityTypeEnum).Actor1,
              weaponType: (_crd && EntityTypeEnum === void 0 ? (_reportPossibleCrUseOfEntityTypeEnum({
                error: Error()
              }), EntityTypeEnum) : EntityTypeEnum).Weapon1,
              position: {
                x: 0,
                y: 0
              },
              direction: {
                x: 1,
                y: 0
              }
            }]
          };
        }

        static get Instance() {
          return super.GetInstance();
        }

        applyInput(input) {
          var {
            deltaTime,
            direction,
            type,
            id
          } = input;
          var actor = this.state.actors.find(e => e.id === id);
          actor.direction = direction;
          actor.position.x += direction.x * deltaTime * ACTOR_SPEED;
          actor.position.y += direction.y * deltaTime * ACTOR_SPEED;
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=a88a2badbfc1f4a2e8876e498de7838c1b6d2f23.js.map