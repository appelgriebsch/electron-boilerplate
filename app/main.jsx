(function() {

  'use strict';

  const React = require('react');
  const ReactDOM = require('react-dom');
  const injectTapEventPlugin = require('react-tap-event-plugin');

  const Shell = require('./shell/shell');

  var _start = function() {

    //Needed for onTouchTap
    //Can go away when react 1.0 release
    //Check this repo:
    //https://github.com/zilverline/react-tap-event-plugin
    injectTapEventPlugin();

    ReactDOM.render(<Shell />,
                    document.getElementById('app'));
  };

  module.exports = {
    start: _start
  };

})();
