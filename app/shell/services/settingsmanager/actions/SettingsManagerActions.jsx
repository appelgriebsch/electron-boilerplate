// @flow
import SettingsManagerActionTypes from './SettingsManagerActionTypes'

/**
 * Represents the SettingsManagerActions which dispatches the actions to the SettingsManagerStore to update the state.
 */
class SettingsManagerActions {

  appConfig: Object
  reactor: Object

  constructor(appConfig: Object, reactor: Object) {
    this.appConfig = appConfig
    this.reactor = reactor
  }

  mountInstalledPlugins(plugins) {
    this.reactor.dispatch(SettingsManagerActionTypes.MOUNT_INSTALLED_PLUGINS, plugins)
  }

  unmountPlugin(plugin) {
    this.reactor.dispatch(SettingsManagerActionTypes.UNMOUNT_PLUGIN, plugin)
  }
}

export default SettingsManagerActions;
