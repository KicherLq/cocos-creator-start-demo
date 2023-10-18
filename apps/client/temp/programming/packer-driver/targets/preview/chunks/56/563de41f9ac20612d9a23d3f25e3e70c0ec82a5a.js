System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _crd, FsmParamTypeEnum, ParamsNameEnum, EventEnum, PrefabPathEnum, EntityStateEnum, TexturePathEnum;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "39328bCewlE0ZVfBJ5+Wzbq", "index", undefined);

      _export("FsmParamTypeEnum", FsmParamTypeEnum = /*#__PURE__*/function (FsmParamTypeEnum) {
        FsmParamTypeEnum["Number"] = "Number";
        FsmParamTypeEnum["Trigger"] = "Trigger";
        return FsmParamTypeEnum;
      }({}));

      _export("ParamsNameEnum", ParamsNameEnum = /*#__PURE__*/function (ParamsNameEnum) {
        ParamsNameEnum["Idle"] = "Idle";
        ParamsNameEnum["Run"] = "Run";
        ParamsNameEnum["Attack"] = "Attack";
        return ParamsNameEnum;
      }({}));

      _export("EventEnum", EventEnum = /*#__PURE__*/function (EventEnum) {
        EventEnum["shot"] = "shot";
        return EventEnum;
      }({}));

      _export("PrefabPathEnum", PrefabPathEnum = /*#__PURE__*/function (PrefabPathEnum) {
        PrefabPathEnum["Actor1"] = "prefab/Actor";
        PrefabPathEnum["Map"] = "prefab/Map";
        PrefabPathEnum["Weapon1"] = "prefab/Weapon1";
        PrefabPathEnum["Bullet2"] = "prefab/Bullet2";
        return PrefabPathEnum;
      }({}));

      _export("EntityStateEnum", EntityStateEnum = /*#__PURE__*/function (EntityStateEnum) {
        EntityStateEnum["Idle"] = "Idle";
        EntityStateEnum["Run"] = "Run";
        EntityStateEnum["Attack"] = "Attack";
        return EntityStateEnum;
      }({}));

      _export("TexturePathEnum", TexturePathEnum = /*#__PURE__*/function (TexturePathEnum) {
        TexturePathEnum["Actor1Idle"] = "texture/actor/actor1/idle";
        TexturePathEnum["Actor1Run"] = "texture/actor/actor1/run";
        TexturePathEnum["Weapon1Idle"] = "texture/weapon/weapon1/idle";
        TexturePathEnum["Weapon1Attack"] = "texture/weapon/weapon1/attack";
        TexturePathEnum["Bullet2Idle"] = "texture/bullet/bullet2";
        return TexturePathEnum;
      }({}));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=563de41f9ac20612d9a23d3f25e3e70c0ec82a5a.js.map