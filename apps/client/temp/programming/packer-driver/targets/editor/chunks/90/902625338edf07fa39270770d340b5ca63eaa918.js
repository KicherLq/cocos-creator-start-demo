System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, DataManager, JoyStickManager, ActorManager, ResourceManager, Prefab, instantiate, _dec, _class, _crd, ccclass, property, BattleManager;

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
    }, function (_unresolved_2) {
      DataManager = _unresolved_2.default;
    }, function (_unresolved_3) {
      JoyStickManager = _unresolved_3.JoyStickManager;
    }, function (_unresolved_4) {
      ActorManager = _unresolved_4.ActorManager;
    }, function (_unresolved_5) {
      ResourceManager = _unresolved_5.ResourceManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "491089QRYFH/5ICptwxhBEc", "BattleManager", undefined);

      __checkObsolete__(['Node']);

      __checkObsolete__(['_decorator', 'Component']);

      __checkObsolete__(['Prefab']);

      __checkObsolete__(['instantiate']);

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
          (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).Instance.jm = this._ui.getComponentInChildren(_crd && JoyStickManager === void 0 ? (_reportPossibleCrUseOfJoyStickManager({
            error: Error()
          }), JoyStickManager) : JoyStickManager);
        }

        start() {
          this.loadRes();
          this.shouldUpdate = true;
        }

        async loadRes() {
          const list = []; //TODO 深入学习promise的使用

          const p = (_crd && ResourceManager === void 0 ? (_reportPossibleCrUseOfResourceManager({
            error: Error()
          }), ResourceManager) : ResourceManager).Instance.loadRes('prefab/Actor', Prefab).then(prefab => {
            (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
              error: Error()
            }), DataManager) : DataManager).Instance.prefabMap.set('Actor1', prefab);
          });
          list.push(p);
          await Promise.all(list);
        }

        update() {
          if (!this.shouldUpdate) {
            return;
          }

          this.render();
        }

        render() {
          this.renderActor();
        }

        async renderActor() {
          for (const data of (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).Instance.state.actors) {
            let am = (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
              error: Error()
            }), DataManager) : DataManager).Instance.actorMap.get(data.id);

            if (!am) {
              const prefab = await (_crd && ResourceManager === void 0 ? (_reportPossibleCrUseOfResourceManager({
                error: Error()
              }), ResourceManager) : ResourceManager).Instance.loadRes('prefab/Actor', Prefab);
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

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=902625338edf07fa39270770d340b5ca63eaa918.js.map