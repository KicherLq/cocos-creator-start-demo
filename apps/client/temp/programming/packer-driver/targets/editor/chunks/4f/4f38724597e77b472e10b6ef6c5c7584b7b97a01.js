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
        return InputTypeEnum;
      }({}));

      _export("EntityTypeEnum", EntityTypeEnum = /*#__PURE__*/function (EntityTypeEnum) {
        EntityTypeEnum["Actor1"] = "Actor1";
        EntityTypeEnum["Map"] = "Map";
        EntityTypeEnum["Weapon1"] = "Weapon1";
        return EntityTypeEnum;
      }({}));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=4f38724597e77b472e10b6ef6c5c7584b7b97a01.js.map