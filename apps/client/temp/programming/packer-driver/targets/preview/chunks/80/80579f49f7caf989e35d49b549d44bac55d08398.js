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
        constructor() {
          super(...arguments);
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
            var index = this.map.get(event).findIndex(i => cb === i.cb && i.ctx === ctx);
            index > -1 && this.map.get(event).splice(index, 1);
          }
        }

        emit(event) {
          for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            params[_key - 1] = arguments[_key];
          }

          if (this.map.has(event)) {
            this.map.get(event).forEach(_ref => {
              var {
                cb,
                ctx
              } = _ref;
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
//# sourceMappingURL=80579f49f7caf989e35d49b549d44bac55d08398.js.map