System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _crd, INDEX_REG, getNumberWithinString, sortSpriteFrame;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "2e2808uUqNGWqz1+0Eu9R1r", "index", undefined);

      __checkObsolete__(['SpriteFrame']);

      INDEX_REG = /\((\d+)\)/;

      getNumberWithinString = str => {
        var _str$match;

        return parseInt(((_str$match = str.match(INDEX_REG)) == null ? void 0 : _str$match[1]) || "0");
      };

      _export("sortSpriteFrame", sortSpriteFrame = spriteFrame => spriteFrame.sort((a, b) => getNumberWithinString(a.name) - getNumberWithinString(b.name)));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=b2dfb04cb9d176a5199ca729d40749fad1bbf746.js.map