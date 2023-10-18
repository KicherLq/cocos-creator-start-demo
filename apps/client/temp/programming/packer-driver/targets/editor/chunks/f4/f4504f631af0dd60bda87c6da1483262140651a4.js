System.register(["__unresolved_0", "cc"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, SubStateMachine, _crd;

  function _reportPossibleCrUseOfState(extras) {
    _reporterNs.report("State", "./State", _context.meta, extras);
  }

  function _reportPossibleCrUseOfStateMachine(extras) {
    _reporterNs.report("StateMachine", "./StateMachine", _context.meta, extras);
  }

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "7f9faxxmCBBsotNLcQYVBTv", "SubStateMachine", undefined);

      /***
       * 子有限状态机基类
       * 用处：例如有个idle的state，但是有多个方向，为了让主状态机更整洁，可以把同类型的但具体不同的state都封装在子状态机中
       */
      _export("default", SubStateMachine = class SubStateMachine {
        constructor(fsm) {
          this._currentState = null;
          this.stateMachines = new Map();
          this.fsm = fsm;
        }

        get currentState() {
          return this._currentState;
        }

        set currentState(newState) {
          if (!newState) {
            return;
          }

          this._currentState = newState;

          this._currentState.run();
        }
        /***
         * 具体类实现
         */


      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=f4504f631af0dd60bda87c6da1483262140651a4.js.map