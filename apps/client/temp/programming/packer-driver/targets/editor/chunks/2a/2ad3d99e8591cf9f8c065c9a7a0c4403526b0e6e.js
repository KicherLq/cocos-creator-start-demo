System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, Singleton, EventManager, _crd;

  function _reportPossibleCrUseOfSingleton(extras) {
    _reporterNs.report("Singleton", "../Base/Singleton", _context.meta, extras);
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
    }, function (_unresolved_2) {
      Singleton = _unresolved_2.default;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "2aa2efesBRO56U3S8mdv5Fk", "EventManager", undefined);

      _export("default", EventManager = class EventManager extends (_crd && Singleton === void 0 ? (_reportPossibleCrUseOfSingleton({
        error: Error()
      }), Singleton) : Singleton) {
        constructor(...args) {
          super(...args);
          this.map = new Map();
        }

        static get Instance() {
          return super.GetInstance();
        }

        on(event, cb, ctx) {
          if (this.map.has(event)) {
            this.map.get(event).push({
              cb,
              ctx
            });
          } else {
            this.map.set(event, [{
              cb,
              ctx
            }]);
          }
        }

        off(event, cb, ctx) {
          if (this.map.has(event)) {
            const index = this.map.get(event).findIndex(i => cb === i.cb && i.ctx === ctx);
            index > -1 && this.map.get(event).splice(index, 1);
          }
        }

        emit(event, ...params) {
          if (this.map.has(event)) {
            this.map.get(event).forEach(({
              cb,
              ctx
            }) => {
              cb.apply(ctx, params);
            });
          }
        }

        clear() {
          this.map.clear();
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=2ad3d99e8591cf9f8c065c9a7a0c4403526b0e6e.js.map