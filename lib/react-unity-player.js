'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UnityPlayer = function (_Component) {
  _inherits(UnityPlayer, _Component);

  function UnityPlayer() {
    _classCallCheck(this, UnityPlayer);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(UnityPlayer).apply(this, arguments));
  }

  _createClass(UnityPlayer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var config = {
        width: this.props.width,
        height: this.props.height,
        params: {
          enableDebugging: '0',
          backgroundcolor: '000000',
          disableExternalCall: true
        }
      };
      if (this.props.params) {
        config.params.enableDebugging = this.props.params.enableDebugging || '0';
        config.params.backgroundcolor = this.props.params.backgroundcolor || '000000';
        config.params.disableExternalCall = this.props.params.disableExternalCall || true;
        config.params.logoimage = config.params.logoimage || '';
        config.params.progressbarimage = config.params.progressbarimage || '';
        config.params.progressframeimage = config.params.progressframeimage || '';
      }

      document.getElementById('unityCode').innerHTML = this.loadUnity(config, this.props.src);
    }
  }, {
    key: 'loadUnity',
    value: function loadUnity(config, initPlugin) {
      return 'var config = {\n' + 'width: ' + config.width + ',\n' + 'height: ' + config.height + ',\n' + 'params: {\n' + 'enableDebugging: ' + config.params.enableDebugging + ',' + 'backgroundcolor: ' + config.params.backgroundcolor + ',' + 'disableExternalCall:' + config.params.disableExternalCall + '' + '}\n' + '};\n' + 'var u = new UnityObject2(config);\n' + 'jQuery(function() {\n' + 'var $missingScreen = jQuery("#unityPlayer").find(".missing");\n' + 'var $brokenScreen = jQuery("#unityPlayer").find(".broken");\n' + 'var $noSupportScreen = jQuery("#unityPlayer").find(".no_support");\n' + 'if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {\n' + 'noMobileSupport();\n' + 'return false;\n' + '} else if (/Chrome/i.test(navigator.userAgent)) {\n' + 'noBrowserSupport();\n' + 'return false;\n' + '}\n' + 'u.observeProgress(function(progress) {\n' + 'switch (progress.pluginStatus) {\n' + 'case "broken":\n' + '$brokenScreen.find("a").click(function(e) {\n' + 'e.stopPropagation();\n' + 'e.preventDefault();\n' + 'u.installPlugin();\n' + 'return false;\n' + '});\n' + '$brokenScreen.show();\n' + 'break;\n' + 'case "missing":\n' + '$missingScreen.find("a").click(function(e) {\n' + 'e.stopPropagation();\n' + 'e.preventDefault();\n' + 'u.installPlugin();\n' + 'return false;\n' + '});\n' + '$missingScreen.show();\n' + 'break;\n' + 'case "installed":\n' + '$missingScreen.remove();\n' + 'break;\n' + 'case "first":\n' + 'break;\n' + '}\n' + '});\n' + 'u.initPlugin(jQuery("#unityPlayer")[0], "' + initPlugin + '");\n' + '});\n' + 'function noMobileSupport() {\n' + 'var $noSupportScreen = jQuery("#unityPlayer").find(".no_support_mobile");\n' + '$noSupportScreen.show();\n' + '}\n' + 'function noBrowserSupport() {\n' + 'var $noSupportScreen = jQuery("#unityPlayer").find(".no_support_chrome");\n' + '$noSupportScreen.show();\n' + '}\n';
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { ref: 'safe' },
        _react2.default.createElement(
          'div',
          { id: 'unityPlayer' },
          _react2.default.createElement(
            'div',
            { className: 'missing', style: { display: 'none' } },
            _react2.default.createElement(
              'a',
              { href: 'http://unity3d.com/webplayer/', title: 'Unity Web Player. Install now!' },
              _react2.default.createElement('img', { alt: 'Unity Web Player. Install now!', src: 'http://webplayer.unity3d.com/installation/getunity.png', width: '193', height: '63' })
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'broken', style: { display: 'none' } },
            _react2.default.createElement(
              'a',
              { href: 'http://unity3d.com/webplayer/', title: 'Unity Web Player. Install now! Restart your browser after install.' },
              _react2.default.createElement('img', { alt: 'Unity Web Player. Install now! Restart your browser after install.', src: 'http://webplayer.unity3d.com/installation/getunityrestart.png', width: '193', height: '63' })
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'no_support_mobile', style: { display: 'none' } },
            _react2.default.createElement(
              'div',
              { className: 'popup_screen_no_support text-center' },
              _react2.default.createElement(
                'p',
                { className: 'popup_screen_text_no_support' },
                'Unfortunately this game does not work on a mobile device'
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'no_support_chrome', style: { display: 'none' } },
            _react2.default.createElement(
              'div',
              { className: 'popup_screen_no_support text-center' },
              _react2.default.createElement(
                'p',
                { className: 'popup_screen_text_no_support' },
                'Unfortunately this game does not work on this browser. Download ',
                _react2.default.createElement(
                  'a',
                  { href: 'https://www.mozilla.org/en-US/firefox/new/', target: '_blank' },
                  ' Mozilla Firefox'
                ),
                ' to play this game!'
              )
            )
          )
        ),
        _react2.default.createElement('script', { type: 'text/javascript', src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/1.7.1/jquery.min.js' }),
        _react2.default.createElement('script', { type: 'text/javascript', src: 'https://ssl-webplayer.unity3d.com/download_webplayer-3.x/3.0/uo/UnityObject2.js' }),
        _react2.default.createElement('script', { type: 'text/javascript', id: 'unityCode' })
      );
    }
  }]);

  return UnityPlayer;
}(_react.Component);

UnityPlayer.propTypes = {
  params: _react.PropTypes.object,
  width: _react.PropTypes.number.isRequired,
  height: _react.PropTypes.number.isRequired,
  src: _react.PropTypes.string.isRequired
};

exports.default = UnityPlayer;
