System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, FsmParamTypeEnum, _dec, _class, _crd, ccclass, getInitParamsTrigger, getInitParamsNumber, StateMachine;

  function _reportPossibleCrUseOfEntityTypeEnum(extras) {
    _reporterNs.report("EntityTypeEnum", "../Common/Enum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfFsmParamTypeEnum(extras) {
    _reporterNs.report("FsmParamTypeEnum", "../Enum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfState(extras) {
    _reporterNs.report("State", "./State", _context.meta, extras);
  }

  function _reportPossibleCrUseOfSubStateMachine(extras) {
    _reporterNs.report("SubStateMachine", "./SubStateMachine", _context.meta, extras);
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
    }, function (_unresolved_2) {
      FsmParamTypeEnum = _unresolved_2.FsmParamTypeEnum;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "665381FD89O0o5HoKaI3a88", "StateMachine", undefined);

      __checkObsolete__(['_decorator', 'Animation', 'Component']);

      ({
        ccclass
      } = _decorator);

      _export("getInitParamsTrigger", getInitParamsTrigger = () => {
        return {
          type: (_crd && FsmParamTypeEnum === void 0 ? (_reportPossibleCrUseOfFsmParamTypeEnum({
            error: Error()
          }), FsmParamTypeEnum) : FsmParamTypeEnum).Trigger,
          value: false
        };
      });

      _export("getInitParamsNumber", getInitParamsNumber = () => {
        return {
          type: (_crd && FsmParamTypeEnum === void 0 ? (_reportPossibleCrUseOfFsmParamTypeEnum({
            error: Error()
          }), FsmParamTypeEnum) : FsmParamTypeEnum).Number,
          value: 0
        };
      });
      /***
       * 流动图
       * 1.entity的state或者direction改变触发setter
       * 2.setter里触发fsm的setParams方法
       * 3.setParams执行run方法（run方法由子类重写）
       * 4.run方法会更改currentState，然后触发currentState的setter
       * 5-1.如果currentState是子状态机，继续执行他的run方法，run方法又会设置子状态机的currentState，触发子状态run方法
       * 5-2.如果是子状态，run方法就是播放动画
       */

      /***
       * 有限状态机基类
       */


      _export("default", StateMachine = (_dec = ccclass("StateMachine"), _dec(_class = class StateMachine extends Component {
        constructor() {
          super(...arguments);
          this._currentState = null;
          this.params = new Map();
          this.stateMachines = new Map();
          this.animationComponent = void 0;
          this.type = void 0;
        }

        getParams(paramName) {
          if (this.params.has(paramName)) {
            return this.params.get(paramName).value;
          }
        }

        setParams(paramName, value) {
          if (this.params.has(paramName)) {
            this.params.get(paramName).value = value;
            this.run();
            this.resetTrigger();
          }
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
         * 清空所有trigger
         */


        resetTrigger() {
          for (var [, value] of this.params) {
            if (value.type === (_crd && FsmParamTypeEnum === void 0 ? (_reportPossibleCrUseOfFsmParamTypeEnum({
              error: Error()
            }), FsmParamTypeEnum) : FsmParamTypeEnum).Trigger) {
              value.value = false;
            }
          }
        }
        /***
         * 由子类重写，方法目标是根据当前状态和参数修改currentState
         */


      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=e7acf4ea6991d375a2bd56f6913eeeff0a0d95af.js.map