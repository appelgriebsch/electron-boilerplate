// @flow
import electron from 'electron';
import React from 'react';

import Window from './Window';

const app = electron.remote.app;
const appCfg = app.sysConfig();

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
      <Window appName={this.title}
              activeModule='Todo'
              style={appCfg.platform}
              closeHandler={this.closeApp}
              fullScreenHandler={this.toggleFullScreen}
              minimizeHandler={this.minimizeApp}>
        { this.props.children }
      </Window>
    );
  }
}
