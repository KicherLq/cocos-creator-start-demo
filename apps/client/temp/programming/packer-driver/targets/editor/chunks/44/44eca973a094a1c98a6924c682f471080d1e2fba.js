System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, animation, AnimationClip, Sprite, DataManager, sortSpriteFrame, State, _crd, ANIMATION_SPEED;

  function _reportPossibleCrUseOfDataManager(extras) {
    _reporterNs.report("DataManager", "../Global/DataManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfsortSpriteFrame(extras) {
    _reporterNs.report("sortSpriteFrame", "../Utils", _context.meta, extras);
  }

  function _reportPossibleCrUseOfStateMachine(extras) {
    _reporterNs.report("StateMachine", "./StateMachine", _context.meta, extras);
  }

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      animation = _cc.animation;
      AnimationClip = _cc.AnimationClip;
      Sprite = _cc.Sprite;
    }, function (_unresolved_2) {
      DataManager = _unresolved_2.default;
    }, function (_unresolved_3) {
      sortSpriteFrame = _unresolved_3.sortSpriteFrame;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "226c1khFFlHZILmsaEcWnPC", "State", undefined);

      __checkObsolete__(['animation', 'AnimationClip', 'Sprite', 'SpriteFrame']);

      /***
       * unit:milisecond
       */
      _export("ANIMATION_SPEED", ANIMATION_SPEED = 1 / 10);
      /***
       * 状态（每组动画的承载容器，持有SpriteAnimation组件执行播放）
       */


      _export("default", State = class State {
        constructor(fsm, path, wrapMode = AnimationClip.WrapMode.Normal, force = false) {
          this.animationClip = void 0;
          this.fsm = fsm;
          this.path = path;
          this.wrapMode = wrapMode;
          this.force = force;
          //生成动画轨道属性
          const track = new animation.ObjectTrack();
          track.path = new animation.TrackPath().toComponent(Sprite).toProperty("spriteFrame");
          const spriteFrames = (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).Instance.textureMap.get(this.path);
          const frames = (_crd && sortSpriteFrame === void 0 ? (_reportPossibleCrUseOfsortSpriteFrame({
            error: Error()
          }), sortSpriteFrame) : sortSpriteFrame)(spriteFrames).map((item, index) => [index * ANIMATION_SPEED, item]);
          track.channel.curve.assignSorted(frames); //动画添加轨道

          this.animationClip = new AnimationClip();
          this.animationClip.name = this.path;
          this.animationClip.duration = frames.length * ANIMATION_SPEED;
          this.animationClip.addTrack(track);
          this.animationClip.wrapMode = this.wrapMode;
        }

        run() {
          var _this$fsm$animationCo;

          if (((_this$fsm$animationCo = this.fsm.animationComponent.defaultClip) == null ? void 0 : _this$fsm$animationCo.name) === this.animationClip.name && !this.force) {
            return;
          }

          this.fsm.animationComponent.defaultClip = this.animationClip;
          this.fsm.animationComponent.play();
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=44eca973a094a1c98a6924c682f471080d1e2fba.js.map