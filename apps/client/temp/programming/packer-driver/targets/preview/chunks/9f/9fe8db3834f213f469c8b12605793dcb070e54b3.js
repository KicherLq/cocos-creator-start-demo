System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, Input, UITransform, Vec2, input, _decorator, Component, _dec, _class, _crd, ccclass, property, JoyStickManager;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      Input = _cc.Input;
      UITransform = _cc.UITransform;
      Vec2 = _cc.Vec2;
      input = _cc.input;
      _decorator = _cc._decorator;
      Component = _cc.Component;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "d392fDSYbNJHIxVldsc4uZG", "JoyStickManager", undefined);

      __checkObsolete__(['Input']);

      __checkObsolete__(['UITransform']);

      __checkObsolete__(['Vec2']);

      __checkObsolete__(['EventTouch']);

      __checkObsolete__(['input']);

      __checkObsolete__(['_decorator', 'Component', 'Node']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("JoyStickManager", JoyStickManager = (_dec = ccclass('JoyStickManager'), _dec(_class = class JoyStickManager extends Component {
        constructor() {
          super(...arguments);
          this._body = void 0;
          this._stick = void 0;
          this._defaultPos = void 0;
          this._radius = void 0;
        }

        onLoad() {
          this._body = this.node.getChildByName('Body');
          this._stick = this._body.getChildByName('Stick');
          this._defaultPos = new Vec2(this._body.position.x, this._body.position.y);
          this._radius = this._body.getComponent(UITransform).contentSize.x / 2;
          input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
          input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
          input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
        }

        start() {}

        onTouchStart(event) {
          var touchPos = event.getUILocation();

          this._body.setPosition(touchPos.x, touchPos.y);
        }

        onTouchMove(event) {
          var touchPos = event.getUILocation();
          var relativePos = new Vec2(this._body.position.x - touchPos.x, this._body.position.y - touchPos.y);

          if (relativePos.length() > this._radius) {
            var scale = this._radius / relativePos.length();
            relativePos.multiplyScalar(scale);
          }

          this._stick.setPosition(relativePos.x, relativePos.y);
        }

        onTouchEnd() {
          this._body.setPosition(this._defaultPos.x, this._defaultPos.y);

          this._stick.setPosition(0, 0);
        }

        update(deltaTime) {}

        onDestroy() {
          input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
          input.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
          input.off(Input.EventType.TOUCH_END, this.onTouchEnd, this);
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=9fe8db3834f213f469c8b12605793dcb070e54b3.js.map