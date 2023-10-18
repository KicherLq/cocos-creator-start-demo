System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, Input, Vec2, input, _decorator, Component, _dec, _class, _crd, ccclass, property, JoyStickManager;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      Input = _cc.Input;
      Vec2 = _cc.Vec2;
      input = _cc.input;
      _decorator = _cc._decorator;
      Component = _cc.Component;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "d392fDSYbNJHIxVldsc4uZG", "JoyStickManager", undefined);

      __checkObsolete__(['Input']);

      __checkObsolete__(['log']);

      __checkObsolete__(['Vec2']);

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
          this._defaultPos = void 0;
        }

        onLoad() {
          this._body = this.node.getChildByName('Body');
          this._stick = this._body.getChildByName('Stick');
          this._defaultPos = new Vec2(this._body.position.x, this._body.position.y);
          input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
          input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
        }

        start() {}

        onTouchStart(event) {
          const touchPos = event.getUILocation();

          this._body.setPosition(touchPos.x, touchPos.y);
        }

        onTouchEnd() {
          this._body.setPosition(this._defaultPos.x, this._defaultPos.y);
        }

        update(deltaTime) {}

        onDestroy() {
          input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
          input.off(Input.EventType.TOUCH_END, this.onTouchEnd, this);
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=d91230482db0c8911ebdf9f72aa11432102abdfb.js.map