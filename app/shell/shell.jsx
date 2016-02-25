import React from 'react'
import electron from 'electron'
import ThemeManager from 'material-ui/lib/styles/theme-manager'
import DarkTheme from 'material-ui/lib/styles/raw-themes/dark-raw-theme'
import Colors from 'material-ui/lib/styles/colors'

import AppCanvas from 'material-ui/lib/app-canvas'
import AppBar from 'material-ui/lib/app-bar'
import TitleBar from './titlebar'

const appCfg = electron.remote.app.sysConfig();

import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'

export default class Shell extends React.Component {

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
  };
};

Shell.childContextTypes = {
  muiTheme: React.PropTypes.object
};