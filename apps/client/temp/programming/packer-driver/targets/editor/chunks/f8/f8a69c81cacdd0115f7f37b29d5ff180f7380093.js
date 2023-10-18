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
        constructor(...args) {
          super(...args);
          this._body = void 0;
          this._stick = void 0;
        }

        onLoad() {
          this._body = this.node.getChildByName('Body');
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
//# sourceMappingURL=f8a69c81cacdd0115f7f37b29d5ff180f7380093.js.map