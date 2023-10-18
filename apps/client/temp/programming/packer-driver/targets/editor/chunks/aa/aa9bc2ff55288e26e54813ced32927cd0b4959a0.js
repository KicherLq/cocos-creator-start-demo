System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, DataManager, InputTypeEnum, _dec, _class, _crd, ccclass, property, ActorManager;

  function _reportPossibleCrUseOfDataManager(extras) {
    _reporterNs.report("DataManager", "../../Global/DataManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfInputTypeEnum(extras) {
    _reporterNs.report("InputTypeEnum", "../../Common/Enum", _context.meta, extras);
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
      DataManager = _unresolved_2.default;
    }, function (_unresolved_3) {
      InputTypeEnum = _unresolved_3.InputTypeEnum;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "c7aecPe449FoZG/f9Jb6E7F", "ActorManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'input']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("ActorManager", ActorManager = (_dec = ccclass('ActorManager'), _dec(_class = class ActorManager extends Component {
        onLoad() {}

        update(deltaTime) {
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
            });
            console.log((_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
              error: Error()
            }), DataManager) : DataManager).Instance.state.actors[0].position.x, (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
              error: Error()
            }), DataManager) : DataManager).Instance.state.actors[0].position.y);
          }
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=aa9bc2ff55288e26e54813ced32927cd0b4959a0.js.map