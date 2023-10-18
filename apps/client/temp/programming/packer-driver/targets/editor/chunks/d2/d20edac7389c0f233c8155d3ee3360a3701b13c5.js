System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, Node, Singleton, DataManager, instantiate, ObjectPoolManager, _crd;

  function _reportPossibleCrUseOfSingleton(extras) {
    _reporterNs.report("Singleton", "../Base/Singleton", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEntityTypeEnum(extras) {
    _reporterNs.report("EntityTypeEnum", "../Common/Enum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfDataManager(extras) {
    _reporterNs.report("DataManager", "./DataManager", _context.meta, extras);
  }

  _export("ObjectPoolManager", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      Node = _cc.Node;
      instantiate = _cc.instantiate;
    }, function (_unresolved_2) {
      Singleton = _unresolved_2.default;
    }, function (_unresolved_3) {
      DataManager = _unresolved_3.default;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "99dc3AoRHlOHb6l5NEbX8HQ", "ObjectPoolManager", undefined);

      __checkObsolete__(['_decorator', 'Node']);

      __checkObsolete__(['instantiate']);

      _export("ObjectPoolManager", ObjectPoolManager = class ObjectPoolManager extends (_crd && Singleton === void 0 ? (_reportPossibleCrUseOfSingleton({
        error: Error()
      }), Singleton) : Singleton) {
        constructor(...args) {
          super(...args);
          this.objectPool = null;
          this.map = new Map();
        }

        static get Instance() {
          return super.GetInstance();
        }

        get(type) {
          if (!this.objectPool) {
            this.objectPool = new Node('objectPool');
            this.objectPool.setParent((_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
              error: Error()
            }), DataManager) : DataManager).Instance.stage);
          }

          if (!this.map.has(type)) {
            this.map.set(type, []);
            const container = new Node(type + 'Pool');
            container.setParent(this.objectPool);
          }

          const nodes = this.map.get(type);

          if (!nodes.length) {
            const prefab = (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
              error: Error()
            }), DataManager) : DataManager).Instance.prefabMap.get(type);
            const entity = instantiate(prefab);
            entity.name = type;
            entity.setParent(this.objectPool.getChildByName(type + 'Pool'));
            entity.active = false;
            return entity;
          } else {
            const entity = nodes.pop();
            entity.active = true;
            return entity;
          }
        }

        ret(node) {
          node.active = false;
          this.map.get(node.name).push(node);
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=d20edac7389c0f233c8155d3ee3360a3701b13c5.js.map