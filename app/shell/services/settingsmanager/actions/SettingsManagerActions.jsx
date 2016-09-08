// @flow
import SettingsManagerActionTypes from './SettingsManagerActionTypes'

/**
 *
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
}

export default SettingsManagerActions;
