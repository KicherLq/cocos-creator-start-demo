System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, DataManager, JoyStickManager, ActorManager, ResourceManager, Prefab, instantiate, _dec, _class, _crd, ccclass, property, BattleManager;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
        constructor() {
          super(...arguments);
          this._stage = void 0;
          this._ui = void 0;
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
        }

        loadRes() {
          return _asyncToGenerator(function* () {
            var list = []; //TODO 深入学习promise的使用

            var p = (_crd && ResourceManager === void 0 ? (_reportPossibleCrUseOfResourceManager({
              error: Error()
            }), ResourceManager) : ResourceManager).Instance.loadRes('prefab/Actor', Prefab).then(prefab => {
              (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
                error: Error()
              }), DataManager) : DataManager).Instance.prefabMap.set('Actor', prefab);
            });
            list.push(p);
            yield Promise.all(list);
          })();
        }

        update() {
          this.render();
        }

        render() {
          this.renderActor();
        }

        renderActor() {
          var _this = this;

          return _asyncToGenerator(function* () {
            for (var data of (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
              error: Error()
            }), DataManager) : DataManager).Instance.state.actors) {
              var am = (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
                error: Error()
              }), DataManager) : DataManager).Instance.actorMap.get(data.id);

              if (!am) {
                var prefab = yield (_crd && ResourceManager === void 0 ? (_reportPossibleCrUseOfResourceManager({
                  error: Error()
                }), ResourceManager) : ResourceManager).Instance.loadRes('prefab/Actor', Prefab);
                var actor = instantiate(prefab);
                actor.setParent(_this._stage);

                var _am = actor.addComponent(_crd && ActorManager === void 0 ? (_reportPossibleCrUseOfActorManager({
                  error: Error()
                }), ActorManager) : ActorManager);

                (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
                  error: Error()
                }), DataManager) : DataManager).Instance.actorMap.set(data.id, _am);

                _am.init(data);
              } else {
                am.render(data);
              }
            }
          })();
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=ebee6a441bac4843f8d09efbbb4e39c76417488a.js.map