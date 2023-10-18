System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, Singleton, EntityTypeEnum, InputTypeEnum, EventManager, EventEnum, DataManager, _crd, ACTOR_SPEED, BULLET_SPEED, MAP_WIDTH, MAP_HEIGHT, ACTOR_RADIUS, BULLET_RADIUS, BULLET_DAMAGE;

  function _reportPossibleCrUseOfSingleton(extras) {
    _reporterNs.report("Singleton", "../Base/Singleton", _context.meta, extras);
  }

  function _reportPossibleCrUseOfIBullet(extras) {
    _reporterNs.report("IBullet", "../Common/State", _context.meta, extras);
  }

  function _reportPossibleCrUseOfIClientInput(extras) {
    _reporterNs.report("IClientInput", "../Common/State", _context.meta, extras);
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

  function _reportPossibleCrUseOfInputTypeEnum(extras) {
    _reporterNs.report("InputTypeEnum", "../Common/Enum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBulletManager(extras) {
    _reporterNs.report("BulletManager", "../Entity/Bullet/BulletManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEventManager(extras) {
    _reporterNs.report("EventManager", "./EventManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEventEnum(extras) {
    _reporterNs.report("EventEnum", "../Enum", _context.meta, extras);
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
      InputTypeEnum = _unresolved_3.InputTypeEnum;
    }, function (_unresolved_4) {
      EventManager = _unresolved_4.default;
    }, function (_unresolved_5) {
      EventEnum = _unresolved_5.EventEnum;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "1682e0WTk9Gs4rKkrrs0wud", "DataManager", undefined);

      __checkObsolete__(['Prefab', 'instantiate']);

      __checkObsolete__(['SpriteFrame']);

      __checkObsolete__(['Node']);

      ACTOR_SPEED = 100;
      BULLET_SPEED = 600;
      MAP_WIDTH = 960;
      MAP_HEIGHT = 640;
      ACTOR_RADIUS = 50;
      BULLET_RADIUS = 10;
      BULLET_DAMAGE = 5;

      _export("default", DataManager = class DataManager extends (_crd && Singleton === void 0 ? (_reportPossibleCrUseOfSingleton({
        error: Error()
      }), Singleton) : Singleton) {
        constructor(...args) {
          super(...args);
          this.myPlayerId = 1;
          this.jm = void 0;
          this.stage = void 0;
          this.actorMap = new Map();
          this.bulletMap = new Map();
          this.prefabMap = new Map();
          this.textureMap = new Map();
          this.state = {
            actors: [{
              id: 1,
              type: (_crd && EntityTypeEnum === void 0 ? (_reportPossibleCrUseOfEntityTypeEnum({
                error: Error()
              }), EntityTypeEnum) : EntityTypeEnum).Actor1,
              hp: 100,
              weaponType: (_crd && EntityTypeEnum === void 0 ? (_reportPossibleCrUseOfEntityTypeEnum({
                error: Error()
              }), EntityTypeEnum) : EntityTypeEnum).Weapon1,
              bulletType: (_crd && EntityTypeEnum === void 0 ? (_reportPossibleCrUseOfEntityTypeEnum({
                error: Error()
              }), EntityTypeEnum) : EntityTypeEnum).Bullet2,
              position: {
                x: -150,
                y: -150
              },
              direction: {
                x: 1,
                y: 0
              }
            }, {
              id: 2,
              type: (_crd && EntityTypeEnum === void 0 ? (_reportPossibleCrUseOfEntityTypeEnum({
                error: Error()
              }), EntityTypeEnum) : EntityTypeEnum).Actor1,
              hp: 100,
              weaponType: (_crd && EntityTypeEnum === void 0 ? (_reportPossibleCrUseOfEntityTypeEnum({
                error: Error()
              }), EntityTypeEnum) : EntityTypeEnum).Weapon1,
              bulletType: (_crd && EntityTypeEnum === void 0 ? (_reportPossibleCrUseOfEntityTypeEnum({
                error: Error()
              }), EntityTypeEnum) : EntityTypeEnum).Bullet2,
              position: {
                x: 150,
                y: 150
              },
              direction: {
                x: -1,
                y: 0
              }
            }],
            bullets: [],
            nextBulletId: 1
          };
        }

        static get Instance() {
          return super.GetInstance();
        }

        applyInput(input) {
          switch (input.type) {
            case (_crd && InputTypeEnum === void 0 ? (_reportPossibleCrUseOfInputTypeEnum({
              error: Error()
            }), InputTypeEnum) : InputTypeEnum).ActorMove:
              {
                const {
                  deltaTime,
                  direction,
                  type,
                  id
                } = input;
                const actor = this.state.actors.find(e => e.id === id);
                actor.direction = direction;
                actor.position.x += direction.x * deltaTime * ACTOR_SPEED;
                actor.position.y += direction.y * deltaTime * ACTOR_SPEED;
                break;
              }

            case (_crd && InputTypeEnum === void 0 ? (_reportPossibleCrUseOfInputTypeEnum({
              error: Error()
            }), InputTypeEnum) : InputTypeEnum).Shot:
              {
                const {
                  owner,
                  direction,
                  position
                } = input;
                const bullet = {
                  id: this.state.nextBulletId++,
                  owner,
                  direction,
                  position,
                  type: this.actorMap.get(owner).bulletType
                };
                (_crd && EventManager === void 0 ? (_reportPossibleCrUseOfEventManager({
                  error: Error()
                }), EventManager) : EventManager).Instance.emit((_crd && EventEnum === void 0 ? (_reportPossibleCrUseOfEventEnum({
                  error: Error()
                }), EventEnum) : EventEnum).bulletBorn, owner);
                this.state.bullets.push(bullet);
                break;
              }

            case (_crd && InputTypeEnum === void 0 ? (_reportPossibleCrUseOfInputTypeEnum({
              error: Error()
            }), InputTypeEnum) : InputTypeEnum).TimePast:
              {
                const {
                  dt
                } = input;
                const {
                  bullets,
                  actors
                } = this.state; //倒序遍历子弹用于销毁已经飞出地图外的子弹

                for (let i = bullets.length - 1; i >= 0; --i) {
                  const bullet = bullets[i]; //倒序遍历角色用于判断和子弹的碰撞检测

                  for (let j = actors.length - 1; j >= 0; --j) {
                    const actor = actors[j]; //帧同步不能使用引擎内部的碰撞检测系统

                    let distanceX = actor.position.x - bullet.position.x;
                    let distanceY = actor.position.y - bullet.position.y;
                    let explosionX = (actor.position.x + bullet.position.x) / 2;
                    let explosionY = (actor.position.y + bullet.position.y) / 2;

                    if (distanceX ** 2 + distanceY ** 2 < (ACTOR_RADIUS + BULLET_RADIUS) ** 2) {
                      actor.hp -= BULLET_DAMAGE;
                      (_crd && EventManager === void 0 ? (_reportPossibleCrUseOfEventManager({
                        error: Error()
                      }), EventManager) : EventManager).Instance.emit((_crd && EventEnum === void 0 ? (_reportPossibleCrUseOfEventEnum({
                        error: Error()
                      }), EventEnum) : EventEnum).explosionBorn, bullet.id, {
                        x: explosionX,
                        y: explosionY
                      });
                      bullets.splice(i, 1);
                      break;
                    }
                  }

                  if (Math.abs(bullet.position.x) > MAP_WIDTH / 2 || Math.abs(bullet.position.y) > MAP_HEIGHT / 2) {
                    (_crd && EventManager === void 0 ? (_reportPossibleCrUseOfEventManager({
                      error: Error()
                    }), EventManager) : EventManager).Instance.emit((_crd && EventEnum === void 0 ? (_reportPossibleCrUseOfEventEnum({
                      error: Error()
                    }), EventEnum) : EventEnum).explosionBorn, bullet.id, {
                      x: bullet.position.x,
                      y: bullet.position.y
                    });
                    bullets.splice(i, 1);
                    break;
                  }
                }

                for (const bullet of bullets) {
                  bullet.position.x += bullet.direction.x * dt * BULLET_SPEED;
                  bullet.position.y += bullet.direction.y * dt * BULLET_SPEED;
                }

                break;
              }
          }
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=5229e75de61c96e95bf41a8dd20dc041669bb65c.js.map