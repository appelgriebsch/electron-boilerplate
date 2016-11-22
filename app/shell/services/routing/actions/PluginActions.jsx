// @flow
import PluginActionTypes from './PluginActionTypes'

/**
 * Represents the SettingsManagerActions which dispatches the actions to the SettingsManagerStore to update the state.
 */
class PluginActions {

  reactor: Object

  constructor(reactor: Object) {
    this.reactor = reactor
  }

  mountInstalledPlugins(plugins) {
    this.reactor.dispatch(PluginActionTypes.MOUNT_INSTALLED_PLUGINS, plugins)
  }

  unmountPlugin(plugin) {
    this.reactor.dispatch(PluginActionTypes.UNMOUNT_PLUGIN, plugin)
  }
}

export default PluginActions;
