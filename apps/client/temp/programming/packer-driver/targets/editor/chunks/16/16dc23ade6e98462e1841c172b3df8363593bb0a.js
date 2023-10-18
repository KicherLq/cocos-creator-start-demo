// import { _decorator, Animation, AnimationClip } from "cc";
// import State from "../../Base/State";
// import StateMachine, { getInitParamsTrigger } from "../../Base/StateMachine";
// import { EntityTypeEnum } from "../../Common";
// import { EntityStateEnum, ParamsNameEnum } from "../../Enum";
// const { ccclass } = _decorator;
// @ccclass("ActorStateMachine")
// export class ActorStateMachine extends StateMachine {
//   init(type: EntityTypeEnum) {
//     this.type = type;
//     this.animationComponent = this.node.addComponent(Animation);
//     this.initParams();
//     this.initStateMachines();
//     this.initAnimationEvent();
//   }
//   initParams() {
//     this.params.set(ParamsNameEnum.Idle, getInitParamsTrigger());
//     this.params.set(ParamsNameEnum.Run, getInitParamsTrigger());
//   }
//   initStateMachines() {
//     this.stateMachines.set(ParamsNameEnum.Idle, new State(this, `${this.type}${EntityStateEnum.Idle}`, AnimationClip.WrapMode.Loop));
//     this.stateMachines.set(ParamsNameEnum.Run, new State(this, `${this.type}${EntityStateEnum.Run}`, AnimationClip.WrapMode.Loop));
//   }
//   initAnimationEvent() {}
//   run() {
//     switch (this.currentState) {
//       case this.stateMachines.get(ParamsNameEnum.Idle):
//       case this.stateMachines.get(ParamsNameEnum.Run):
//         if (this.params.get(ParamsNameEnum.Run).value) {
//           this.currentState = this.stateMachines.get(ParamsNameEnum.Run);
//         } else if (this.params.get(ParamsNameEnum.Idle).value) {
//           this.currentState = this.stateMachines.get(ParamsNameEnum.Idle);
//         } else {
//           this.currentState = this.currentState;
//         }
//         break;
//       default:
//         this.currentState = this.stateMachines.get(ParamsNameEnum.Idle);
//         break;
//     }
//   }
// }
System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _crd;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "ff33aeZaQhNHZAr82rsENTe", "StateMachineTemplate", undefined);

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=16dc23ade6e98462e1841c172b3df8363593bb0a.js.map