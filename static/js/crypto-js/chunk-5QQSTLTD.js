import {
  require_cipher_core
} from "./chunk-DACE7QCO.js";
import {
  require_core
} from "./chunk-D7C7VJ3A.js";
import {
  __commonJS
} from "./chunk-45VW27EM.js";

// ../../../../../HBuilderX/HBProjects/YXYLocheck/node_modules/crypto-js/mode-ecb.js
var require_mode_ecb = __commonJS({
  "../../../../../HBuilderX/HBProjects/YXYLocheck/node_modules/crypto-js/mode-ecb.js"(exports, module) {
    (function(root, factory, undef) {
      if (typeof exports === "object") {
        module.exports = exports = factory(require_core(), require_cipher_core());
      } else if (typeof define === "function" && define.amd) {
        define(["./core", "./cipher-core"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS) {
      CryptoJS.mode.ECB = function() {
        var ECB = CryptoJS.lib.BlockCipherMode.extend();
        ECB.Encryptor = ECB.extend({
          processBlock: function(words, offset) {
            this._cipher.encryptBlock(words, offset);
          }
        });
        ECB.Decryptor = ECB.extend({
          processBlock: function(words, offset) {
            this._cipher.decryptBlock(words, offset);
          }
        });
        return ECB;
      }();
      return CryptoJS.mode.ECB;
    });
  }
});

export {
  require_mode_ecb
};
//# sourceMappingURL=chunk-5QQSTLTD.js.map
