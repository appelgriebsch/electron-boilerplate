// @flow

import React from 'react'
import { Router, Route, Link, hashHistory } from 'react-router'
import path from 'path'

import PluginManager from './PluginManager'
import SettingsManager from './settingsmanager/SettingsManager'

import Shell from '../Shell'

let routesManager

/** */
class RoutesManager extends React.Component {

  routes: Object
  pluginFolder:string
  pluginManager: PluginManager
  plugins: Object

  /**
  *
  */
  constructor() {

    super()

    this.pluginFolder = path.join(__dirname, '../../../', 'plugins')
    this.pluginManager = new PluginManager(this.pluginFolder)
    this.routes = {
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
        },
      }]
    }
    this.plugins = this.pluginManager.getRegisteredPlugins()
    this.plugins.map((plugin) => {
      this.routes.childRoutes.push(plugin)
    })
  }

  render () {
    return(
      <Router history={hashHistory} routes={this.routes} />
    )
  }
}

export default RoutesManager
