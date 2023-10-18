System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Animation, AnimationClip, State, StateMachine, getInitParamsTrigger, EntityStateEnum, ParamsNameEnum, _dec, _class, _crd, ccclass, WeaponStateMachine;

  function _reportPossibleCrUseOfState(extras) {
    _reporterNs.report("State", "../../Base/State", _context.meta, extras);
  }

  function _reportPossibleCrUseOfStateMachine(extras) {
    _reporterNs.report("StateMachine", "../../Base/StateMachine", _context.meta, extras);
  }

  function _reportPossibleCrUseOfgetInitParamsTrigger(extras) {
    _reporterNs.report("getInitParamsTrigger", "../../Base/StateMachine", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEntityTypeEnum(extras) {
    _reporterNs.report("EntityTypeEnum", "../../Common/Enum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEntityStateEnum(extras) {
    _reporterNs.report("EntityStateEnum", "../../Enum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfParamsNameEnum(extras) {
    _reporterNs.report("ParamsNameEnum", "../../Enum", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Animation = _cc.Animation;
      AnimationClip = _cc.AnimationClip;
    }, function (_unresolved_2) {
      State = _unresolved_2.default;
    }, function (_unresolved_3) {
      StateMachine = _unresolved_3.default;
      getInitParamsTrigger = _unresolved_3.getInitParamsTrigger;
    }, function (_unresolved_4) {
      EntityStateEnum = _unresolved_4.EntityStateEnum;
      ParamsNameEnum = _unresolved_4.ParamsNameEnum;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "7fdccp3DHpHPaKTa7HdGGaf", "BulletStateMachine", undefined);

      __checkObsolete__(['_decorator', 'Animation', 'AnimationClip']);

      ({
        ccclass
      } = _decorator);

      _export("WeaponStateMachine", WeaponStateMachine = (_dec = ccclass("WeaponStateMachine"), _dec(_class = class WeaponStateMachine extends (_crd && StateMachine === void 0 ? (_reportPossibleCrUseOfStateMachine({
        error: Error()
      }), StateMachine) : StateMachine) {
        init(type) {
          this.type = type;
          this.animationComponent = this.node.addComponent(Animation);
          this.initParams();
          this.initStateMachines();
          this.initAnimationEvent();
        }

        initParams() {
          this.params.set((_crd && ParamsNameEnum === void 0 ? (_reportPossibleCrUseOfParamsNameEnum({
            error: Error()
          }), ParamsNameEnum) : ParamsNameEnum).Idle, (_crd && getInitParamsTrigger === void 0 ? (_reportPossibleCrUseOfgetInitParamsTrigger({
            error: Error()
          }), getInitParamsTrigger) : getInitParamsTrigger)());
        }

        initStateMachines() {
          this.stateMachines.set((_crd && ParamsNameEnum === void 0 ? (_reportPossibleCrUseOfParamsNameEnum({
            error: Error()
          }), ParamsNameEnum) : ParamsNameEnum).Idle, new (_crd && State === void 0 ? (_reportPossibleCrUseOfState({
            error: Error()
          }), State) : State)(this, `${this.type}${(_crd && EntityStateEnum === void 0 ? (_reportPossibleCrUseOfEntityStateEnum({
            error: Error()
          }), EntityStateEnum) : EntityStateEnum).Idle}`, AnimationClip.WrapMode.Loop));
        }

        initAnimationEvent() {}

        run() {
          switch (this.currentState) {
            case this.stateMachines.get((_crd && ParamsNameEnum === void 0 ? (_reportPossibleCrUseOfParamsNameEnum({
              error: Error()
            }), ParamsNameEnum) : ParamsNameEnum).Idle):
              if (this.params.get((_crd && ParamsNameEnum === void 0 ? (_reportPossibleCrUseOfParamsNameEnum({
                error: Error()
              }), ParamsNameEnum) : ParamsNameEnum).Idle).value) {
                this.currentState = this.stateMachines.get((_crd && ParamsNameEnum === void 0 ? (_reportPossibleCrUseOfParamsNameEnum({
                  error: Error()
                }), ParamsNameEnum) : ParamsNameEnum).Idle);
              } else {
                this.currentState = this.currentState;
              }

              break;

            default:
              this.currentState = this.stateMachines.get((_crd && ParamsNameEnum === void 0 ? (_reportPossibleCrUseOfParamsNameEnum({
                error: Error()
              }), ParamsNameEnum) : ParamsNameEnum).Idle);
              break;
          }
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=b3966b2d3f7345a73b07afecb23129811ff2494b.js.map