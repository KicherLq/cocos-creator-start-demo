System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, DataManager, InputTypeEnum, EntityManager, ActorStateMachine, EntityStateEnum, _dec, _class, _crd, ccclass, property, ActorManager;

  function _reportPossibleCrUseOfDataManager(extras) {
    _reporterNs.report("DataManager", "../../Global/DataManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfInputTypeEnum(extras) {
    _reporterNs.report("InputTypeEnum", "../../Common/Enum", _context.meta, extras);
  }

  function _reportPossibleCrUseOfIActor(extras) {
    _reporterNs.report("IActor", "../../Common/State", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEntityManager(extras) {
    _reporterNs.report("EntityManager", "../../Base/EntityManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfActorStateMachine(extras) {
    _reporterNs.report("ActorStateMachine", "./ActorStateMachine", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEntityStateEnum(extras) {
    _reporterNs.report("EntityStateEnum", "../../Enum", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
    }, function (_unresolved_2) {
      DataManager = _unresolved_2.default;
    }, function (_unresolved_3) {
      InputTypeEnum = _unresolved_3.InputTypeEnum;
    }, function (_unresolved_4) {
      EntityManager = _unresolved_4.EntityManager;
    }, function (_unresolved_5) {
      ActorStateMachine = _unresolved_5.ActorStateMachine;
    }, function (_unresolved_6) {
      EntityStateEnum = _unresolved_6.EntityStateEnum;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "c7aecPe449FoZG/f9Jb6E7F", "ActorManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'input']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("ActorManager", ActorManager = (_dec = ccclass('ActorManager'), _dec(_class = class ActorManager extends (_crd && EntityManager === void 0 ? (_reportPossibleCrUseOfEntityManager({
        error: Error()
      }), EntityManager) : EntityManager) {
        init(data) {
          this.fsm = this.addComponent(_crd && ActorStateMachine === void 0 ? (_reportPossibleCrUseOfActorStateMachine({
            error: Error()
          }), ActorStateMachine) : ActorStateMachine);
          this.fsm.init(data.type);
          this.state = (_crd && EntityStateEnum === void 0 ? (_reportPossibleCrUseOfEntityStateEnum({
            error: Error()
          }), EntityStateEnum) : EntityStateEnum).Idle;
        }

        tick(deltaTime) {
          if ((_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).Instance.jm.output.length()) {
            const {
              x,
              y
            } = (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
              error: Error()
            }), DataManager) : DataManager).Instance.jm.output;
            (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
              error: Error()
            }), DataManager) : DataManager).Instance.applyInput({
              id: 1,
              type: (_crd && InputTypeEnum === void 0 ? (_reportPossibleCrUseOfInputTypeEnum({
                error: Error()
              }), InputTypeEnum) : InputTypeEnum).ActorMove,
              direction: {
                x,
                y
              },
              deltaTime
            }); //console.log(DataManager.Instance.state.actors[0].position.x, DataManager.Instance.state.actors[0].position.y);
          }
        }

        render(data) {
          const {
            direction,
            position
          } = data;
          this.node.setPosition(position.x, position.y);

          if (direction.x !== 0) {
            this.node.setScale(direction.x > 0 ? 1 : -1, 1);
          }
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=b93fe990bd90a0e74349efff31d59731a1d96af5.js.map