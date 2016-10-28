// @flow
import PluginActionTypes from './PluginActionTypes'

/**
 * Represents the SettingsManagerActions which dispatches the actions to the SettingsManagerStore to update the state.
 */
class PluginActions {

  // appConfig: Object
  reactor: Object

  constructor(reactor: Object) {
    // this.appConfig = appConfig
    this.reactor = reactor
  }

  mountInstalledPlugins(plugins) {
    console.log(plugins);
    this.reactor.dispatch(PluginActionTypes.MOUNT_INSTALLED_PLUGINS, plugins)
  }

  unmountPlugin(plugin) {
    this.reactor.dispatch(PluginActionTypes.UNMOUNT_PLUGIN, plugin)
  }
}

export default PluginActions;
