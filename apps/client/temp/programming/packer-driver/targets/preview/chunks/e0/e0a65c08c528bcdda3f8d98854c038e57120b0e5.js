System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, Input, UITransform, Vec2, input, _decorator, Component, EventManager, EventEnum, _dec, _class, _crd, ccclass, property, JoyStickManager;

  function _reportPossibleCrUseOfEventManager(extras) {
    _reporterNs.report("EventManager", "../Global/EventManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEventEnum(extras) {
    _reporterNs.report("EventEnum", "../Enum", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      Input = _cc.Input;
      UITransform = _cc.UITransform;
      Vec2 = _cc.Vec2;
      input = _cc.input;
      _decorator = _cc._decorator;
      Component = _cc.Component;
    }, function (_unresolved_2) {
      EventManager = _unresolved_2.default;
    }, function (_unresolved_3) {
      EventEnum = _unresolved_3.EventEnum;
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
          this.output = Vec2.ZERO;
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

          (_crd && EventManager === void 0 ? (_reportPossibleCrUseOfEventManager({
            error: Error()
          }), EventManager) : EventManager).Instance.emit((_crd && EventEnum === void 0 ? (_reportPossibleCrUseOfEventEnum({
            error: Error()
          }), EventEnum) : EventEnum).shot);
        }

        onTouchMove(event) {
          var touchPos = event.getUILocation();
          var relativePos = new Vec2(touchPos.x - this._body.position.x, touchPos.y - this._body.position.y);

          if (relativePos.length() > this._radius) {
            var scale = this._radius / relativePos.length();
            relativePos.multiplyScalar(scale);
          }

          this._stick.setPosition(relativePos.x, relativePos.y);

          this.output = relativePos.clone().normalize(); //console.log(this.output);
        }

        onTouchEnd() {
          this._body.setPosition(this._defaultPos.x, this._defaultPos.y);

          this._stick.setPosition(0, 0);

          this.output = Vec2.ZERO;
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
//# sourceMappingURL=e0a65c08c528bcdda3f8d98854c038e57120b0e5.js.map