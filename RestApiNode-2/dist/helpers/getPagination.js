"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPagination = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var getPagination = exports.getPagination = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(page, size) {
    var limit, offset;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          limit = size ? +size : 3;
          offset = page ? page * limit : 0;
          return _context.abrupt("return", {
            limit: limit,
            offset: offset
          });
        case 3:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function getPagination(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();