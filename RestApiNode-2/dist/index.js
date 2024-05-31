"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _app = _interopRequireDefault(require("./app"));
var _index = _interopRequireDefault(require("./config/index.js"));
require("./config/database/mongo.js");
_app["default"].listen(_app["default"].get("PORT"), _index["default"]);