// @flow
import electron from 'electron'
import React from 'react'
import Radium from 'radium'

import { Provider } from 'nuclear-js-react-addons'

import DocumentDatabase from './services/DocumentDatabase'
import SqlDatabase from './services/SqlDatabase'

import reactor from './Reactor';
import Window from './Window'

const app = electron.remote.app
const appCfg = app.sysConfig()

/**
 *
 *
 * @class Shell
 * @extends {React.Component}
 */
class Shell extends React.Component {

  title: string;
  sqlDB: SqlDatabase;
  docDB: DocumentDatabase;

  /**
   * Creates an instance of Shell.
   *
   */
  constructor (props) {
    super(props)
    this.title = `${appCfg.app.name} ${appCfg.app.version}`
    this.sqlDB = new SqlDatabase(appCfg.app.name)
    this.docDB = new DocumentDatabase(appCfg.app.name)
  }

  /**
   *
   */
  minimizeApp () {
    app.minimizeAppToSysTray()
  }

  /**
   *
   */
  toggleFullScreen () {
    app.toggleFullscreen()
  }

  /**
   *
   */
  closeApp () {
    this.docDB.save({ event: 'closed' }).then(() => {
      app.close()
    })
  }

  /**
   *
   *
   * @returns
   */
  render () {
    return (
      <Provider reactor={reactor}>
        <Window appName={this.title}
          activeModule='Todo'
          platform={appCfg.platform}
          closeHandler={this.closeApp.bind(this)}
          fullScreenHandler={this.toggleFullScreen.bind(this)}
          minimizeHandler={this.minimizeApp.bind(this)}>
          {this.props.children}
        </Window>
      </Provider>
    )
  }
}

export default Radium(Shell)
