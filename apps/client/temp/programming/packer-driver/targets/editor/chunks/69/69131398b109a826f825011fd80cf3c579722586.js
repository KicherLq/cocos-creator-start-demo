System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, Singleton, DataManager, _crd;

  function _reportPossibleCrUseOfSingleton(extras) {
    _reporterNs.report("Singleton", "../Base/Singleton", _context.meta, extras);
  }

  function _reportPossibleCrUseOfIState(extras) {
    _reporterNs.report("IState", "../Common/State", _context.meta, extras);
  }

  function _reportPossibleCrUseOfJoyStickManager(extras) {
    _reporterNs.report("JoyStickManager", "../UI/JoyStickManager", _context.meta, extras);
  }

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
    }, function (_unresolved_2) {
      Singleton = _unresolved_2.default;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "1682e0WTk9Gs4rKkrrs0wud", "DataManager", undefined);

      _export("default", DataManager = class DataManager extends (_crd && Singleton === void 0 ? (_reportPossibleCrUseOfSingleton({
        error: Error()
      }), Singleton) : Singleton) {
        constructor(...args) {
          super(...args);
          this.jm = void 0;
          this.state = {
            actors: [{
              id: 1,
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

        applyInput() {}

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=69131398b109a826f825011fd80cf3c579722586.js.map