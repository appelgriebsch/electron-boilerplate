// @flow
import electron from 'electron'
import React from 'react'
import Radium from 'radium'
import { Icon, Tooltip } from 'react-mdl';
import { Link } from 'react-router'

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
   * getChildContext - description
   *
   * @return {type}  description
   */
  getChildContext() {
    return {
      documentDatabase: this.docDB,
      sqlDatabase: this.sqlDB,
      appConfig: appCfg
    };
  }

  /**
   * minimizeApp - description
   *
   * @return {type}  description
   */
  minimizeApp () {
    app.minimizeAppToSysTray()
  }

  /**
   * toggleFullScreen - description
   *
   * @return {type}  description
   */
  toggleFullScreen () {
    app.toggleFullscreen()
  }

  /**
   * closeApp - description
   *
   * @return {type}  description
   */
  closeApp () {
    this.docDB.save({ event: 'closed' }).then(() => {
      app.close()
    })
  }

  /**
   * render - description
   *
   * @return {type}  description
   */
  render () {

    let modules = []
    let activeModule = appCfg.app.name

    this.props.route.childRoutes.map((route) => {
      modules.push(<Tooltip label={route.tooltip} position="right">
                      <Link to={route.path} key={route.path}>
                        <Icon name={route.icon} />{route.label}
                      </Link>
                    </Tooltip>)
    });

    return (
      <Provider reactor={reactor}>
        <Window appName={this.title}
          activeModule={activeModule}
          modules={modules}
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

Shell.childContextTypes = {
  appConfig: React.PropTypes.object.isRequired,
  documentDatabase: React.PropTypes.object.isRequired,
  sqlDatabase: React.PropTypes.object.isRequired
}

export default Radium(Shell)
