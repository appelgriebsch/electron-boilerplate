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

const pluginFolder = path.join(__dirname, '../../../../', 'plugins')

let settingsManagerActions;

/** SettingsManager is a default plugin which makes use of nuclearjs to display a list of all the installed plugins and various options for the plugins. */
class SettingsManager extends React.Component {

  SettingsManagerActions: SettingsManagerActions
  PluginManager: PluginManager

  /**
  * Represents a SettingsManager.
  * Creates a new instance of SettingsManager.
  * @constructor
  * @param {object} props - required properties.
  * @param {object} context - required context properties.
  */
  constructor(props, context) {

    super(props, context)

    this.PluginManager = this.props.pluginManager
    this.SettingsManagerActions = new SettingsManagerActions(this.context.appConfig,this.context.reactor)
    this.context.reactor.registerStores({
      'plugins': SettingsManagerStore
    });
    settingsManagerActions = this.SettingsManagerActions
  }

  deletePlugin (plugin:string) {
    // settingsManagerActions.mountInstalledPlugins({plugins:pluginManager.getRegisteredPlugins()})
    settingsManagerActions.unmountPlugin(this.location)
    pluginManager.deletePlugin(this.location)
  }

  componentDidMount () {
    this.SettingsManagerActions.mountInstalledPlugins({plugins:pluginManager.getRegisteredPlugins()})
  }

/** Renders plugin cards for each and every installed plugin with various settings */
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
      <div id='dropZone' style={{width: '150px', height: '150px'}}>
      Drag and drop new plugins here.
      </div>
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
  reactor: React.PropTypes.object.isRequired
}

function dataBinding(props) {
  return {
    plugins:['plugins']
  };
}

// export default Radium(connect(dataBinding)(SettingsManager))
export default connect(dataBinding)(SettingsManager)
