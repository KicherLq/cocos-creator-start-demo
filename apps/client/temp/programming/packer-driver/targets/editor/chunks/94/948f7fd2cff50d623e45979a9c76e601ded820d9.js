System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, Input, input, _decorator, Component, _dec, _class, _crd, ccclass, property, JoyStickManager;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      Input = _cc.Input;
      input = _cc.input;
      _decorator = _cc._decorator;
      Component = _cc.Component;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "d392fDSYbNJHIxVldsc4uZG", "JoyStickManager", undefined);

      __checkObsolete__(['Input']);

      __checkObsolete__(['log']);

      __checkObsolete__(['EventTouch']);

      __checkObsolete__(['input']);

      __checkObsolete__(['_decorator', 'Component', 'Node']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("JoyStickManager", JoyStickManager = (_dec = ccclass('JoyStickManager'), _dec(_class = class JoyStickManager extends Component {
        onLoad() {
          input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        }

        start() {}

        onTouchStart(event) {
          console.log(event.getLocation());
          console.log(event.getUILocation());
        }

        update(deltaTime) {}

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=948f7fd2cff50d623e45979a9c76e601ded820d9.js.map