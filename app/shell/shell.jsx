// @flow
import electron from 'electron';
import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {blue500, blue700} from 'material-ui/styles/colors';

import Window from './Window';

const app = electron.remote.app;
const appCfg = app.sysConfig();
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blue500,
    primary2Color: blue700
  }
});

export default class Shell extends React.Component {

  constructor(props) {
    super(props);
    this.title = `${appCfg.app.name} ${appCfg.app.version}`;
  }

  minimizeApp() {
    app.minimizeAppToSysTray();
  }

  toggleFullScreen() {
    app.toggleFullscreen();
  }

  closeApp() {
    app.close();
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Window appName={this.title}
                activeModule='Todo'
                style={appCfg.platform}
                closeHandler={this.closeApp}
                fullScreenHandler={this.toggleFullScreen}
                minimizeHandler={this.minimizeApp}>
          { this.props.children }
        </Window>
      </MuiThemeProvider>
    );
  };
};
