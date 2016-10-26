// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import path from 'path'

import reactor from './shell/Reactor'
import { Provider } from 'nuclear-js-react-addons'

import RoutesManager from './shell/services/routing/RoutesManager'
import PluginStore from './shell/services/routing/stores/PluginStore'
import pluginActions from './shell/services/routing/actions/PluginActions'
import pluginManager from './shell/services/plugin/PluginManager'

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin()

reactor.registerStores({
  'plugins': PluginStore
});

const PluginActions = new pluginActions(reactor)
const PluginManager = new pluginManager(path.join(__dirname, '..', 'plugins'), PluginActions)
PluginActions.mountInstalledPlugins({plugins:PluginManager.getRegisteredPlugins()})

ReactDOM.render(
  <Provider reactor={reactor}>
    <RoutesManager PluginControls={PluginActions} />
  </Provider>, document.querySelector('div[role=app]')
)
