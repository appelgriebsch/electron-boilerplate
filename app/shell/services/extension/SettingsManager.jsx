// @flow
import React from 'react'
import Radium from 'radium'

import extensions from '../routing/getters'
import { connect } from 'nuclear-js-react-addons'
import Dropzone from 'react-dropzone'

import PluginCard from './PluginCard'

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

  deletePlugin (plugin) {
    settingsManager.props.route.uninstallPlugin(plugin.replace(/^.*[\\\/]/, ''))
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

    return (
      <div key='Settings'>
        <Dropzone key="dropZone" onDrop={this.onDrop} multiple={false}
          style={{ width: '62%', margin: 'auto', marginTop: '2em', marginBottom: '2em',
          borderStyle: 'dashed', height: '5em', borderWidth: '2px', borderColor: 'gray', textAlign: 'center', verticalAlign: 'middle' }}>
          <div style={{ marginTop: '1.5em', marginBottom: '1.5em' }}>
            Try dropping some files here, or click to select files to upload.
          </div>
        </Dropzone>
        {
          plugins.toArray().map(plugin => {
            const p = plugin.toJS()
            const path = `${p.root.href}/${p.location}`
            const isRemovable = (p.module.config.removable !== undefined ? p.module.config.removable : true)
            return (
              <PluginCard
                key={p.location}
                location={path}
                banner={p.module.config.banner}
                removable={isRemovable}
                onDelete={settingsManager.deletePlugin}
                pluginName={p.module.name}
                cardTitle={p.module.name}
                cardText={p.module.description}
                cardActionsButtonText='Open Plugin' />
            )
          })
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
    plugins: extensions.plugins
  };
}

export default connect(dataBinding)(Radium(SettingsManager))
