(function() {

  'use strict';

  const React = require('react');
  const electron = require('electron');
  const ThemeManager = require('material-ui/lib/styles/theme-manager');
  const DarkTheme = require('material-ui/lib/styles/raw-themes/dark-raw-theme');
  const Colors = require('material-ui/lib/styles/colors');

  const AppCanvas = require('material-ui/lib/app-canvas');
  const AppBar = require('material-ui/lib/app-bar');
  const TitleBar = require('./titlebar');

  const appCfg = electron.remote.app.sysConfig();

  class Shell extends React.Component {

    getChildContext() {
      return {
        muiTheme: ThemeManager.getMuiTheme(DarkTheme),
      };
    }

    render() {
      return (
        <AppCanvas>
          <TitleBar
            title={`${appCfg.app.name} v${appCfg.app.version}`}
            style={{
              color: '#303030',
              backgroundColor: Colors.deepOrangeA700
            }}
            onClosePress={() => { alert('close'); }}
            onMinimizePress={() => { alert('minimize'); }}
            onResizePress={() => { alert('mazimize'); }}
          />
          <AppBar
            title="TODO"
            style={{
              backgroundColor: Colors.deepOrangeA700
            }} />
        </AppCanvas>
      );
    }
  }

  Shell.childContextTypes = {
    muiTheme: React.PropTypes.object
  }

  module.exports = Shell;

})();
