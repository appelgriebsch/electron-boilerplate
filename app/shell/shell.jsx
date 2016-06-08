// @flow
import electron from 'electron';
import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {blue500, blue700} from 'material-ui/styles/colors';

import StyleOSX from './MainWindow-OSX';
import StyleWin from './MainWindow-Win';

const app = electron.remote.app;
const appCfg = app.sysConfig();
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blue500,
    primary2Color: blue700
  }
});

const MainWindow = appCfg.platform === 'darwin' ?  StyleOSX : StyleWin;

export default class Shell extends React.Component {

  constructor(props) {
    super(props);
    this.title = `${appCfg.app.name} ${appCfg.app.version}`;
  }

  minimizeApp() {
    app.minimizeAppToSysTray();
  }

  toggleFullScreen() {
    app.toggleFullScreen();
  }

  closeApp() {
    app.close();
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <MainWindow appName={this.title} activeModule="Test" closeHandler={this.closeApp}
                                                             fullScreenHandler={this.toggleFullScreen}
                                                             minimizeHandler={this.minimizeApp}>
          { this.props.children }
        </MainWindow>
      </MuiThemeProvider>
    );
  };
};
