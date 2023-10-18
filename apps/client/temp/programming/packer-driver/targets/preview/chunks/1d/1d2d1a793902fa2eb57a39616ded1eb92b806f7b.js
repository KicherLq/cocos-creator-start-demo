System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, resources, Singleton, ResourceManager, _crd;

  function _reportPossibleCrUseOfSingleton(extras) {
    _reporterNs.report("Singleton", "../Base/Singleton", _context.meta, extras);
  }

  _export("ResourceManager", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      resources = _cc.resources;
    }, function (_unresolved_2) {
      Singleton = _unresolved_2.default;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "62787J9NkFG0a5DUreClALR", "ResourceManager", undefined);

      __checkObsolete__(['_decorator', 'resources', 'Asset']);

      _export("ResourceManager", ResourceManager = class ResourceManager extends (_crd && Singleton === void 0 ? (_reportPossibleCrUseOfSingleton({
        error: Error()
      }), Singleton) : Singleton) {
        static get Instance() {
          return super.GetInstance();
        }

        loadRes(path, type) {
          return new Promise((resolve, reject) => {
            resources.load(path, type, (err, res) => {
              if (err) {
                reject(err);
                return;
              }

              resolve(res);
            });
          });
        }

        loadDir(path, type) {
          return new Promise((resolve, reject) => {
            resources.loadDir(path, type, (err, res) => {
              if (err) {
                reject(err);
                return;
              }

              resolve(res);
            });
          });
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=1d2d1a793902fa2eb57a39616ded1eb92b806f7b.js.map