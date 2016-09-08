// @flow
import React from 'react'
import Radium from 'radium'

import PluginCard from '../../../components/PluginCard'
import PluginManager from '../PluginManager'

import { toImmutable } from 'nuclear-js'
import { connect } from 'nuclear-js-react-addons'
import SettingsManagerActions from './actions/SettingsManagerActions'
import SettingsManagerStore from './stores/SettingsManagerStore'

import path from 'path'

const pluginFolder = path.join(__dirname, '../../../', 'plugins')

let settingsManagerActions;
class SettingsManager extends React.Component {

  SettingsManagerActions: SettingsManagerActions
  PluginManager: PluginManager

  constructor(props, context) {

    super(props, context)

    this.PluginManager = this.props.pluginManager
    this.SettingsManagerActions = new SettingsManagerActions(this.context.appConfig,this.context.reactor)
    this.context.reactor.registerStores({
      'plugins': SettingsManagerStore
    });
    settingsManagerActions = this.SettingsManagerActions;
  }

  deletePlugin (plugin:string) {
    pluginManager.deletePlugin(this.location)
    settingsManagerActions.mountInstalledPlugins({plugins:pluginManager.getRegisteredPlugins()})
  }

  componentDidMount () {
    this.SettingsManagerActions.mountInstalledPlugins({plugins:pluginManager.getRegisteredPlugins()})
  }

  render () {
    var createPluginCard = function(plugin) {
      const p = plugin.toJS()
      return (
        <PluginCard
        key={p.location}
        location={p.location}
        onDelete={this.deletePlugin}
        pluginName={p.module.name}
        cardTitle={p.module.name}
        cardText={p.module.description}
        cardActionsButtonText='Open Plugin' />
      )
    }
    return (
      <div>
      Following are the installed Plugins.
      {
        this.props.plugins.toArray().map(createPluginCard.bind(this))
      }
      </div>
    )
  }
}

SettingsManager.propTypes = {
  plugins: React.PropTypes.object.isRequired,
  pluginManager: React.PropTypes.object.isRequired,
}

SettingsManager.defaultProps = {
  plugins: toImmutable(new PluginManager(pluginFolder).getRegisteredPlugins()),
  pluginManager: new PluginManager(pluginFolder),
}

SettingsManager.contextTypes = {
  appConfig: React.PropTypes.object.isRequired,
  // documentDatabase: React.PropTypes.object.isRequired,
  reactor: React.PropTypes.object.isRequired
}

function dataBinding(props) {
  return {
    plugins:['plugins']
  };
}

// export default Radium(connect(dataBinding)(SettingsManager))
export default connect(dataBinding)(SettingsManager)
