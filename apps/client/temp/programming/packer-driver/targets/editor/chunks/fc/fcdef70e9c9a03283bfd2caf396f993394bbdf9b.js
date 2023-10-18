System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _crd, InputTypeEnum, EntityTypeEnum;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "9e76b65SJhMhLCMSAsMXEXK", "Enum", undefined);

      _export("InputTypeEnum", InputTypeEnum = /*#__PURE__*/function (InputTypeEnum) {
        InputTypeEnum["ActorMove"] = "actormove";
        InputTypeEnum["Shot"] = "shot";
        InputTypeEnum["TimePast"] = "TimePast";
        return InputTypeEnum;
      }({}));

      _export("EntityTypeEnum", EntityTypeEnum = /*#__PURE__*/function (EntityTypeEnum) {
        EntityTypeEnum["Actor1"] = "Actor1";
        EntityTypeEnum["Map"] = "Map";
        EntityTypeEnum["Weapon1"] = "Weapon1";
        EntityTypeEnum["Bullet1"] = "Bullet1";
        EntityTypeEnum["Bullet2"] = "Bullet2";
        EntityTypeEnum["Explosion"] = "Explosion";
        return EntityTypeEnum;
      }({}));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=fcdef70e9c9a03283bfd2caf396f993394bbdf9b.js.map