// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { Router, hashHistory } from 'react-router'
import path from 'path'
import PluginManager from './shell/services/PluginManager'
import SettingsManager from './shell/services/settingsmanager/SettingsManager'

import Shell from './shell/Shell'

const pluginFolder = path.join(__dirname, 'plugins')
const routes = {
  path: '/',
  component: Shell,
  childRoutes: [{
    path: 'settings',
    component: SettingsManager,
    module: {
      'description': 'Maintain application settings',
      'config': {
        'label': 'Settings',
        'icon': 'settings'
      }
    }
  }
]
}

let pluginManager = new PluginManager(pluginFolder)

let plugins = pluginManager.getRegisteredPlugins();
console.log(plugins)
plugins.map((plugin) => {
  routes.childRoutes.push(plugin)
})

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin()

ReactDOM.render(
  <Router history={hashHistory}
  routes={routes} />, document.querySelector('div[role=app]')
)
