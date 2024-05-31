"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _express = _interopRequireDefault(require("express"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _message = _interopRequireDefault(require("../message.js"));
var app = (0, _express["default"])();
(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
  var db;
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        _context.prev = 0;
        app.set("DB_URI", process.env.DB_URI);
        _context.next = 4;
        return _mongoose["default"].connect(app.get("DB_URI"), {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });
      case 4:
        db = _context.sent;
        (0, _message["default"])("Base de datos en: ".concat(db.connection.name), "success");
        _context.next = 11;
        break;
      case 8:
        _context.prev = 8;
        _context.t0 = _context["catch"](0);
        (0, _message["default"])(_context.t0, "danger");
      case 11:
      case "end":
        return _context.stop();
    }
  }, _callee, null, [[0, 8]]);
}))();