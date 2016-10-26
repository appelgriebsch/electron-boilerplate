// @flow
import React from 'react'
import getters from './routesmanager/getters'
import { connect } from 'nuclear-js-react-addons'
import Dropzone from 'react-dropzone'

import PluginCard from '../controls/PluginCard'

let settingsManager
/** SettingsManager is a default plugin which makes use of nuclearjs to display a list of all the installed plugins and various options for the plugins. */
class SettingsManager extends React.Component {

  /**
  * Represents a SettingsManager.
  * Creates a new instance of SettingsManager.
  * @constructor
  * @param {object} props - required properties.
  * @param {object} context - required context properties.
  */
  constructor(props, context) {

    super(props, context)
    // this.deletePlugin = this.deletePlugin.bind(this)
    settingsManager = this
  }

  deletePlugin () {
    settingsManager.props.route.uninstallPlugin(this.location)
  }

  onDrop (files) {
    files.map(file => {
      settingsManager.props.route.installPlugin(file.path, file.name)
    })
  }

  /** Renders plugin cards for each and every installed plugin with various settings */
  render () {
    const {
      plugins
    } = this.props;
    var createPluginCard = function(plugin) {
      const p = plugin.toJS()
      return (
        <PluginCard
        key={p.path}
        location={p.location}
        onDelete={this.deletePlugin}
        pluginName={p.module.name}
        cardTitle={p.module.name}
        cardText={p.module.description}
        cardActionsButtonText='Open Plugin' />
      )
    }
    return (
      <div key='Settings'>
        <Dropzone onDrop={this.onDrop} multiple={false}>
          <div>
            Try dropping some files here, or click to select files to upload.
          </div>
        </Dropzone>
        This is the SettingsManager
        {
          plugins.toArray().filter(function(plugin) {
            return (!("settings".localeCompare(plugin.get('path')) == 0))
          }).map(createPluginCard.bind(this))
        }
      </div>
    )
  }
}

  SettingsManager.contextTypes = {
    appConfig: React.PropTypes.object.isRequired,
    reactor: React.PropTypes.object.isRequired
  }

  function dataBinding(props) {
    return {
      plugins:getters.plugins
    };
  }

  export default connect(dataBinding)(SettingsManager)
