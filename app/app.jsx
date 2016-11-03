// @flow

import electron from 'electron'

import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import path from 'path'
import fs from 'fs'

import reactor from './shell/Reactor'
import { Provider } from 'nuclear-js-react-addons'

import RoutesManager from './shell/services/routing/RoutesManager'
import PluginStore from './shell/services/routing/stores/PluginStore'
import PluginActions from './shell/services/routing/actions/PluginActions'
import PluginManager from './shell/services/extension/PluginManager'

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin()

reactor.registerStores({
  'plugins': PluginStore
});

const sysConfig = electron.remote.app.sysConfig()

let pluginFolder = path.join(sysConfig.paths.appPath, 'plugins')

try {
  if(!fs.existsSync(pluginFolder)) {
    fs.mkdirSync(pluginFolder)
  }
  fs.accessSync(pluginFolder, fs.R_OK | fs.W_OK)
}
catch(err) {
  // can't write to app folder, create a plugin structure in user folder instead
  pluginFolder = path.join(sysConfig.paths.data, 'plugins')
  const baseDependencies = path.join(sysConfig.paths.appPath, 'node_modules')
  const symlink = path.join(sysConfig.paths.data, 'node_modules')
  if (!fs.existsSync(symlink) && (fs.existsSync(baseDependencies))) {
    fs.symlinkSync(baseDependencies, symlink, 'dir')
  }
  if(!fs.existsSync(pluginFolder)) {
    fs.mkdirSync(pluginFolder)
  }
}

const pluginActions = new PluginActions(reactor)
const pluginManager = new PluginManager(pluginFolder, pluginActions)
pluginActions.mountInstalledPlugins({ plugins: pluginManager.getRegisteredPlugins() })

ReactDOM.render(
  <Provider reactor={reactor}>
    <RoutesManager PluginControls={pluginActions} />
  </Provider>, document.querySelector('div[role=app]')
)
