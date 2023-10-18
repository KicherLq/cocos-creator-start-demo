System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, Singleton, NetWorkManager, _crd;

  function _reportPossibleCrUseOfSingleton(extras) {
    _reporterNs.report("Singleton", "../Base/Singleton", _context.meta, extras);
  }

  _export("NetWorkManager", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
    }, function (_unresolved_2) {
      Singleton = _unresolved_2.default;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "bdd8dx5vRFE5onUhjxvWaBl", "NetWorkManager", undefined);

      __checkObsolete__(['_decorator']);

      _export("NetWorkManager", NetWorkManager = class NetWorkManager extends (_crd && Singleton === void 0 ? (_reportPossibleCrUseOfSingleton({
        error: Error()
      }), Singleton) : Singleton) {
        constructor() {
          super(...arguments);
          this.PORT = 8080;
          this.__ws = null;
        }

        static get Instance() {
          return super.GetInstance();
        }

        connect() {
          return new Promise((resolve, reject) => {
            this.__ws = new WebSocket("ws://localhost:" + this.PORT);

            this.__ws.onopen = () => {
              resolve(true);
            };

            this.__ws.onclose = () => {
              reject(false);
            };

            this.__ws.onerror = error => {
              console.error(error);
              reject(false);
            };

            this.__ws.onmessage = message => {
              console.log(message.data);
            };
          });
        }

        sendMessage(data) {
          this.__ws.send(data);
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=3a7fe4503b3d9d683a1717dee3f0e8d601d51666.js.map