// @flow
import electron from 'electron';
import React from 'react';
import Radium from 'radium';

import DocumentDatabase from './DocumentDatabase';
import SqlDatabase from './SqlDatabase';

import Window from './Window';

const app = electron.remote.app;
const appCfg = app.sysConfig();

/**
 * 
 * 
 * @class Shell
 * @extends {React.Component}
 */
class Shell extends React.Component {

  /**
   * Creates an instance of Shell.
   * 
   */
  constructor() {
    super();
    this.title = `${appCfg.app.name} ${appCfg.app.version}`;
    this.sqlDB = new SqlDatabase(appCfg.app.name);
    this.docDB = new DocumentDatabase(appCfg.app.name);

    this.minimizeApp = this.minimizeApp.bind(this);
    this.toggleFullScreen = this.toggleFullScreen.bind(this);
    this.closeApp = this.closeApp.bind(this);
  }

  /**
   * 
   */
  minimizeApp() {
    app.minimizeAppToSysTray();
  }

  /**
   * 
   */
  toggleFullScreen() {
    app.toggleFullscreen();
  }

  /**
   * 
   */
  closeApp() {
    this.docDB.save({ event: 'closed' }).then(() => {
      app.close();
    });
  }

  /**
   * 
   * 
   * @returns
   */
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

export default Radium(Shell);
