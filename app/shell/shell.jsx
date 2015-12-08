(function() {

  'use strict';

  const React = require('react');
  const electron = require('electron');
  const ThemeManager = require('material-ui/lib/styles/theme-manager');
  const DarkTheme = require('material-ui/lib/styles/raw-themes/dark-raw-theme');

  const AppCanvas = require('material-ui/lib/app-canvas');
  const AppBar = require('material-ui/lib/app-bar');
  const RaisedButton = require('material-ui/lib/raised-button');
  const Paper = require('material-ui/lib/paper');

  class Shell extends React.Component {

    getChildContext() {
      return {
        muiTheme: ThemeManager.getMuiTheme(DarkTheme),
      };
    }

    render() {
      return (
        <AppCanvas>
          <AppBar
            title='Electron Boilerplate' />          
        </AppCanvas>
      );
    }
  }

  Shell.childContextTypes = {
    muiTheme: React.PropTypes.object
  }

  module.exports = Shell;

})();
