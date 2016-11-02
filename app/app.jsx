// @flow

import electron from 'electron'

import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import path from 'path'

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

let pluginFolder = electron.remote.app.getAppPath()
pluginFolder = pluginFolder.endsWith('app.asar') ? pluginFolder.replace('app.asar', '') : pluginFolder

console.log(pluginFolder)

const pluginActions = new PluginActions(reactor)
const pluginManager = new PluginManager(path.join(pluginFolder, 'plugins'), pluginActions)
pluginActions.mountInstalledPlugins({ plugins: pluginManager.getRegisteredPlugins() })

ReactDOM.render(
  <Provider reactor={reactor}>
    <RoutesManager PluginControls={pluginActions} />
  </Provider>, document.querySelector('div[role=app]')
)
