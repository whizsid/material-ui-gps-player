"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Paper = _interopRequireDefault(require("@material-ui/core/Paper"));

var _withStyles = _interopRequireDefault(require("@material-ui/core/styles/withStyles"));

var _proptypes = _interopRequireDefault(require("proptypes"));

var _Play = _interopRequireDefault(require("@material-ui/icons/Play"));

var _Pause = _interopRequireDefault(require("@material-ui/icons/Pause"));

var _Stop = _interopRequireDefault(require("@material-ui/icons/Stop"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var styles = function styles(theme) {
  return {
    paper: {}
  };
};

var PlayerComponent =
/*#__PURE__*/
function (_Component) {
  _inherits(PlayerComponent, _Component);

  function PlayerComponent(props) {
    var _this;

    _classCallCheck(this, PlayerComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PlayerComponent).call(this, props));
    _this.handlePause = _this.handlePause.bind(_assertThisInitialized(_this));
    _this.handlePlay = _this.handlePlay.bind(_assertThisInitialized(_this));
    _this.handleStop = _this.handleStop.bind(_assertThisInitialized(_this));
    _this.handleSeek = _this.handleSeek.bind(_assertThisInitialized(_this));
    _this.handleForward = _this.handleForward.bind(_assertThisInitialized(_this));
    _this.handleBackward = _this.handleBackward.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(PlayerComponent, [{
    key: "handlePause",
    value: function handlePause() {}
  }, {
    key: "handlePlay",
    value: function handlePlay() {}
  }, {
    key: "handleStop",
    value: function handleStop() {}
  }, {
    key: "handleSeek",
    value: function handleSeek() {}
  }, {
    key: "handleForward",
    value: function handleForward() {}
  }, {
    key: "handleBackward",
    value: function handleBackward() {}
  }, {
    key: "render",
    value: function render() {
      var classes = this.props.classes;
      return _react["default"].createElement(_Paper["default"], null);
    }
  }]);

  return PlayerComponent;
}(_react.Component);

var Player = (0, _withStyles["default"])(styles)(PlayerComponent);
Player.propTypes = {
  coordinates: _proptypes["default"].arrayOf(_proptypes["default"].shape({
    lat: _proptypes["default"].number.isRequired,
    lng: _proptypes["default"].number.isRequired,
    time: _proptypes["default"].number.isRequired
  })).isRequired,
  onChangeTime: _proptypes["default"].func,
  onPlay: _proptypes["default"].func,
  onPause: _proptypes["default"].func,
  onStop: _proptypes["default"].func,
  currentTime: _proptypes["default"].number.isRequired,
  speed: _proptypes["default"].number,
  classes: _proptypes["default"].shape({
    paper: _proptypes["default"].string
  })
};
var _default = Player;
exports["default"] = _default;
