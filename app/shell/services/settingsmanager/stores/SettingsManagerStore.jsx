
// @flow
import { Store, toImmutable } from 'nuclear-js'
import SettingsManagerActionTypes from '../actions/SettingsManagerActionTypes'

export default Store({

  getInitialState () {
    return toImmutable({})
  },
  
  initialize () {
    /** Updates the plugins state with the passed in plugins payload. */
    this.on(SettingsManagerActionTypes.MOUNT_INSTALLED_PLUGINS, (state, payload) => {
      return toImmutable(payload.plugins).toMap()
    })

    /** Updates the plugins state by filtering out the plugin to be unmounted. */
    this.on(SettingsManagerActionTypes.UNMOUNT_PLUGIN, (state, payload) => {
      return toImmutable(state.toArray().filter(plugin => plugin.get('location') !== payload)).toMap()
    })
  }
})
