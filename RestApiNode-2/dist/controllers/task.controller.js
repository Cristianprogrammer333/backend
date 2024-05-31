"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateTask = exports.findOneTask = exports.findAllTasks = exports.findAllDoneTasks = exports.deleteTask = exports.createTask = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _Task = _interopRequireDefault(require("../models/Task.js"));
var _message = _interopRequireDefault(require("../config/message.js"));
var _getPagination2 = require("../helpers/getPagination.js");
var createTask = exports.createTask = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var newTask, taskSaved;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (req.body.title) {
            _context.next = 2;
            break;
          }
          return _context.abrupt("return", res.status(400).send({
            message: 'Content cannot be empty'
          }));
        case 2:
          _context.prev = 2;
          newTask = new _Task["default"]({
            title: req.body.title,
            description: req.body.description,
            done: req.body.done ? req.body.done : false
          });
          _context.next = 6;
          return newTask.save();
        case 6:
          taskSaved = _context.sent;
          res.json(taskSaved);
          _context.next = 14;
          break;
        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](2);
          (0, _message["default"])(_context.t0.message, "danger");
          res.status(500);
        case 14:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[2, 10]]);
  }));
  return function createTask(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var findAllTasks = exports.findAllTasks = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$body, size, page, title, condition, _getPagination, limit, offset, data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body = req.body, size = _req$body.size, page = _req$body.page, title = _req$body.title;
          condition = title ? {
            title: {
              $regex: new RegExp(title),
              $options: "i"
            }
          } : {};
          _getPagination = (0, _getPagination2.getPagination)(page, size), limit = _getPagination.limit, offset = _getPagination.offset;
          _context2.next = 6;
          return _Task["default"].paginate(condition, {
            offset: offset,
            limit: limit
          });
        case 6:
          data = _context2.sent;
          res.json({
            totalItems: data.totalDocs,
            tasks: data.docs,
            totalPages: data.totalPages,
            currentPage: data.Page
          });
          _context2.next = 14;
          break;
        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          (0, _message["default"])(_context2.t0.message, "danger");
          res.status(500);
        case 14:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 10]]);
  }));
  return function findAllTasks(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var findOneTask = exports.findOneTask = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var task;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _Task["default"].findById(req.params.id);
        case 3:
          task = _context3.sent;
          if (task) {
            _context3.next = 6;
            break;
          }
          return _context3.abrupt("return", res.status(404).json({
            message: "Task with id ".concat(req.params.id, " does not exist")
          }));
        case 6:
          res.json(task);
          _context3.next = 13;
          break;
        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          (0, _message["default"])(_context3.t0.message, "danger");
          res.status(500);
        case 13:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 9]]);
  }));
  return function findOneTask(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var findAllDoneTasks = exports.findAllDoneTasks = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var task;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return _Task["default"].find({
            done: true
          });
        case 3:
          task = _context4.sent;
          res.json(task);
          _context4.next = 11;
          break;
        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          (0, _message["default"])(_context4.t0.message, "danger");
          res.status(500);
        case 11:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 7]]);
  }));
  return function findAllDoneTasks(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var deleteTask = exports.deleteTask = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var data;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return _Task["default"].findByIdAndDelete(req.params.id);
        case 3:
          data = _context5.sent;
          res.json(data);
          _context5.next = 11;
          break;
        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          (0, _message["default"])(_context5.t0.message, "danger");
          res.status(500);
        case 11:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 7]]);
  }));
  return function deleteTask(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
var updateTask = exports.updateTask = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var updatedTask;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return _Task["default"].findByIdAndUpdate(req.params.id, req.body);
        case 3:
          updatedTask = _context6.sent;
          res.json(updatedTask);
          _context6.next = 11;
          break;
        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](0);
          (0, _message["default"])(_context6.t0.message, "danger");
          res.status(500);
        case 11:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 7]]);
  }));
  return function updateTask(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();