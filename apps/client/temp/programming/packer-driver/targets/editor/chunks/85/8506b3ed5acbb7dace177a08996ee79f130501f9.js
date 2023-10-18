System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5", "__unresolved_6", "__unresolved_7", "__unresolved_8"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, DataManager, JoyStickManager, ActorManager, ResourceManager, Prefab, instantiate, PrefabPathEnum, TexturePathEnum, EntityTypeEnum, InputTypeEnum, SpriteFrame, BulletManager, ObjectPoolManager, _dec, _class, _crd, ccclass, property, BattleManager;

  function _reportPossibleCrUseOfDataManager(extras) {
    _reporterNs.report("DataManager", "../Global/DataManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfJoyStickManager(extras) {
    _reporterNs.report("JoyStickManager", "../UI/JoyStickManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfActorManager(extras) {
    _reporterNs.report("ActorManager", "../Entity/Actor/ActorManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfResourceManager(extras) {
    _reporterNs.report("ResourceManager", "../Global/ResourceManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPrefabPathEnum(extras) {
    _reporterNs.report("PrefabPathEnum", "../Enum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfTexturePathEnum(extras) {
    _reporterNs.report("TexturePathEnum", "../Enum", _context.meta, extras);
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

  function _reportPossibleCrUseOfObjectPoolManager(extras) {
    _reporterNs.report("ObjectPoolManager", "../Global/ObjectPoolManager", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Prefab = _cc.Prefab;
      instantiate = _cc.instantiate;
      SpriteFrame = _cc.SpriteFrame;
    }, function (_unresolved_2) {
      DataManager = _unresolved_2.default;
    }, function (_unresolved_3) {
      JoyStickManager = _unresolved_3.JoyStickManager;
    }, function (_unresolved_4) {
      ActorManager = _unresolved_4.ActorManager;
    }, function (_unresolved_5) {
      ResourceManager = _unresolved_5.ResourceManager;
    }, function (_unresolved_6) {
      PrefabPathEnum = _unresolved_6.PrefabPathEnum;
      TexturePathEnum = _unresolved_6.TexturePathEnum;
    }, function (_unresolved_7) {
      EntityTypeEnum = _unresolved_7.EntityTypeEnum;
      InputTypeEnum = _unresolved_7.InputTypeEnum;
    }, function (_unresolved_8) {
      BulletManager = _unresolved_8.BulletManager;
    }, function (_unresolved_9) {
      ObjectPoolManager = _unresolved_9.ObjectPoolManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "491089QRYFH/5ICptwxhBEc", "BattleManager", undefined);

      __checkObsolete__(['Node']);

      __checkObsolete__(['_decorator', 'Component']);

      __checkObsolete__(['Prefab']);

      __checkObsolete__(['instantiate']);

      __checkObsolete__(['SpriteFrame']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("BattleManager", BattleManager = (_dec = ccclass('BattleManager'), _dec(_class = class BattleManager extends Component {
        constructor(...args) {
          super(...args);
          this._stage = void 0;
          this._ui = void 0;
          this.shouldUpdate = false;
        }

        onLoad() {
          this._stage = this.node.getChildByName('Stage');
          this._ui = this.node.getChildByName('UI');

          this._stage.destroyAllChildren();

          (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).Instance.jm = this._ui.getComponentInChildren(_crd && JoyStickManager === void 0 ? (_reportPossibleCrUseOfJoyStickManager({
            error: Error()
          }), JoyStickManager) : JoyStickManager);
          (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).Instance.stage = this.node.getChildByName('Stage');
        }

        async start() {
          await this.loadRes();
          this.initMap();
          this.shouldUpdate = true;
        }

        initMap() {
          const prefab = (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).Instance.prefabMap.get((_crd && EntityTypeEnum === void 0 ? (_reportPossibleCrUseOfEntityTypeEnum({
            error: Error()
          }), EntityTypeEnum) : EntityTypeEnum).Map);
          const map = instantiate(prefab);
          map.setParent(this._stage);
        }

        async loadRes() {
          const list = [];

          for (const type in _crd && PrefabPathEnum === void 0 ? (_reportPossibleCrUseOfPrefabPathEnum({
            error: Error()
          }), PrefabPathEnum) : PrefabPathEnum) {
            const p = (_crd && ResourceManager === void 0 ? (_reportPossibleCrUseOfResourceManager({
              error: Error()
            }), ResourceManager) : ResourceManager).Instance.loadRes((_crd && PrefabPathEnum === void 0 ? (_reportPossibleCrUseOfPrefabPathEnum({
              error: Error()
            }), PrefabPathEnum) : PrefabPathEnum)[type], Prefab).then(prefab => {
              (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
                error: Error()
              }), DataManager) : DataManager).Instance.prefabMap.set(type, prefab);
            });
            list.push(p);
          }

          for (const type in _crd && TexturePathEnum === void 0 ? (_reportPossibleCrUseOfTexturePathEnum({
            error: Error()
          }), TexturePathEnum) : TexturePathEnum) {
            const p = (_crd && ResourceManager === void 0 ? (_reportPossibleCrUseOfResourceManager({
              error: Error()
            }), ResourceManager) : ResourceManager).Instance.loadDir((_crd && TexturePathEnum === void 0 ? (_reportPossibleCrUseOfTexturePathEnum({
              error: Error()
            }), TexturePathEnum) : TexturePathEnum)[type], SpriteFrame).then(spriteframes => {
              (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
                error: Error()
              }), DataManager) : DataManager).Instance.textureMap.set(type, spriteframes);
            });
            list.push(p);
          }

          const p = await Promise.all(list);
        }

        update(dt) {
          if (!this.shouldUpdate) {
            return;
          }

          this.render();
          this.tick(dt);
        }

        tick(dt) {
          this.tickActor(dt);
          (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).Instance.applyInput({
            type: (_crd && InputTypeEnum === void 0 ? (_reportPossibleCrUseOfInputTypeEnum({
              error: Error()
            }), InputTypeEnum) : InputTypeEnum).TimePast,
            dt
          });
        }

        tickActor(dt) {
          for (const data of (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).Instance.state.actors) {
            const {
              id
            } = data;
            let am = (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
              error: Error()
            }), DataManager) : DataManager).Instance.actorMap.get(id);
            am.tick(dt);
          }
        }

        render() {
          this.renderActor();
          this.renderBullet();
        }

        renderActor() {
          for (const data of (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).Instance.state.actors) {
            const {
              id,
              type
            } = data;
            let am = (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
              error: Error()
            }), DataManager) : DataManager).Instance.actorMap.get(id);

            if (!am) {
              const prefab = (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
                error: Error()
              }), DataManager) : DataManager).Instance.prefabMap.get(type);
              const actor = instantiate(prefab);
              actor.setParent(this._stage);
              let am = actor.addComponent(_crd && ActorManager === void 0 ? (_reportPossibleCrUseOfActorManager({
                error: Error()
              }), ActorManager) : ActorManager);
              (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
                error: Error()
              }), DataManager) : DataManager).Instance.actorMap.set(data.id, am);
              am.init(data);
            } else {
              am.render(data);
            }
          }
        }

        renderBullet() {
          for (const data of (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).Instance.state.bullets) {
            const {
              id,
              type
            } = data;
            let bm = (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
              error: Error()
            }), DataManager) : DataManager).Instance.bulletMap.get(id);

            if (!bm) {
              const bullet = (_crd && ObjectPoolManager === void 0 ? (_reportPossibleCrUseOfObjectPoolManager({
                error: Error()
              }), ObjectPoolManager) : ObjectPoolManager).Instance.get(type);
              bm = bullet.getComponent(_crd && BulletManager === void 0 ? (_reportPossibleCrUseOfBulletManager({
                error: Error()
              }), BulletManager) : BulletManager) || bullet.addComponent(_crd && BulletManager === void 0 ? (_reportPossibleCrUseOfBulletManager({
                error: Error()
              }), BulletManager) : BulletManager);
              (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
                error: Error()
              }), DataManager) : DataManager).Instance.bulletMap.set(data.id, bm);
              bm.init(data);
            } else {
              bm.render(data);
            }
          }
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=8506b3ed5acbb7dace177a08996ee79f130501f9.js.map