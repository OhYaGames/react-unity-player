import React, {Component, PropTypes} from 'react';

export default class UnityPlayer extends Component {
  componentDidMount() {
    const config = {
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

  loadUnity(config, initPlugin) {
    return 'var config = {\n' +
      'width: ' + config.width + ',\n' +
      'height: ' + config.height + ',\n' +
      'params: {\n' +
          'enableDebugging: ' + config.params.enableDebugging + ',' +
          'backgroundcolor: ' + config.params.backgroundcolor + ',' +
          'disableExternalCall:' + config.params.disableExternalCall + '' +
        '}\n' +
    '};\n' +
    'var u = new UnityObject2(config);\n' +
    'jQuery(function() {\n' +
      'var $missingScreen = jQuery("#unityPlayer").find(".missing");\n' +
      'var $brokenScreen = jQuery("#unityPlayer").find(".broken");\n' +
      'var $noSupportScreen = jQuery("#unityPlayer").find(".no_support");\n' +
      'if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {\n' +
        'noMobileSupport();\n' +
        'return false;\n' +
      '} else if (/Chrome/i.test(navigator.userAgent)) {\n' +
        'noBrowserSupport();\n' +
        'return false;\n' +
      '}\n' +
      'u.observeProgress(function(progress) {\n' +
        'switch (progress.pluginStatus) {\n' +
          'case "broken":\n' +
            '$brokenScreen.find("a").click(function(e) {\n' +
              'e.stopPropagation();\n' +
              'e.preventDefault();\n' +
              'u.installPlugin();\n' +
              'return false;\n' +
            '});\n' +
            '$brokenScreen.show();\n' +
            'break;\n' +
          'case "missing":\n' +
            '$missingScreen.find("a").click(function(e) {\n' +
              'e.stopPropagation();\n' +
              'e.preventDefault();\n' +
              'u.installPlugin();\n' +
              'return false;\n' +
            '});\n' +
            '$missingScreen.show();\n' +
            'break;\n' +
          'case "installed":\n' +
            '$missingScreen.remove();\n' +
            'break;\n' +
          'case "first":\n' +
            'break;\n' +
        '}\n' +
      '});\n' +
      'u.initPlugin(jQuery("#unityPlayer")[0], "' + initPlugin + '");\n' +
    '});\n' +
    'function noMobileSupport() {\n' +
      'var $noSupportScreen = jQuery("#unityPlayer").find(".no_support_mobile");\n' +
      '$noSupportScreen.show();\n' +
    '}\n' +
    'function noBrowserSupport() {\n' +
      'var $noSupportScreen = jQuery("#unityPlayer").find(".no_support_chrome");\n' +
      '$noSupportScreen.show();\n' +
    '}\n';
  }

  render() {
    return <div ref="safe">
      <div id="unityPlayer">
        <div className="missing" style={{display: 'none'}}>
          <a href="http://unity3d.com/webplayer/" title="Unity Web Player. Install now!">
            <img alt="Unity Web Player. Install now!" src="http://webplayer.unity3d.com/installation/getunity.png" width="193" height="63" />
          </a>
        </div>
        <div className="broken" style={{display: 'none'}}>
          <a href="http://unity3d.com/webplayer/" title="Unity Web Player. Install now! Restart your browser after install.">
            <img alt="Unity Web Player. Install now! Restart your browser after install." src="http://webplayer.unity3d.com/installation/getunityrestart.png" width="193" height="63" />
          </a>
        </div>
        <div className="no_support_mobile" style={{display: 'none'}}>
          <div className="popup_screen_no_support text-center">
            <p className="popup_screen_text_no_support">Unfortunately this game does not work on a mobile device</p>
          </div>
        </div>
        <div className="no_support_chrome" style={{display: 'none'}}>
          <div className="popup_screen_no_support text-center">
            <p className="popup_screen_text_no_support">Unfortunately this game does not work on this browser. Download <a href="https://www.mozilla.org/en-US/firefox/new/" target="_blank"> Mozilla Firefox</a> to play this game!</p>
          </div>
        </div>
      </div>
      <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
      <script type="text/javascript" src="https://ssl-webplayer.unity3d.com/download_webplayer-3.x/3.0/uo/UnityObject2.js"></script>
      <script type="text/javascript" id="unityCode"></script>
    </div>;
  }
}

UnityPlayer.propTypes = {
  params: PropTypes.object,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired
}
