// @flow
import React from 'react'
import Radium from 'radium'

import PluginCard from '../../../components/PluginCard'
import PluginManager from '../PluginManager'

import path from 'path'

const pluginFolder = path.join(__dirname, '../../../', 'plugins')
let pluginManager = new PluginManager(pluginFolder)
let plugins = pluginManager.getRegisteredPlugins()

class SettingsManager extends React.Component {

  deletePlugin (plugin:string) {
    pluginManager.deletePlugin(this.location)
  }

  render () {
    var createPluginCard = function(plugin) {
      console.log("plugin in PluginCardRenderer " + JSON.stringify(plugin))
      return (<PluginCard location={plugin.location} onDelete={this.deletePlugin} pluginName={plugin.module.name} cardTitle={plugin.module.name} cardText={plugin.module.description} cardActionsButtonText='Open Plugin' />)
    }
    return (
      <div>
      {
        plugins.map(createPluginCard,this)
      }
      </div>
    )
  }
}

export default Radium(SettingsManager)
