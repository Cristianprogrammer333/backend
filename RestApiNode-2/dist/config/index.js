"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _app = _interopRequireDefault(require("../app.js"));
var _message = _interopRequireDefault(require("./message.js"));
var caseEntorno = function caseEntorno() {
  switch (process.env.NODE_ENV) {
    case "production":
      (0, _message["default"])("Api corriendo en el puerto ".concat(_app["default"].get("PORT")), "danger");
      break;
    case "develop":
      (0, _message["default"])("Api corriendo en el puerto ".concat(_app["default"].get("PORT")), "success");
      break;
    case "qa":
      (0, _message["default"])("Api corriendo en el puerto ".concat(_app["default"].get("PORT")), "warning");
      break;
    default:
      (0, _message["default"])("Api corriendo en el puerto ".concat(_app["default"].get("PORT")), "success");
      break;
  }
};
var _default = exports["default"] = caseEntorno;