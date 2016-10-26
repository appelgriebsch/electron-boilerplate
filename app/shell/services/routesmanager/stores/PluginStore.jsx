
// @flow
import { Store, toImmutable } from 'nuclear-js'

import PluginActionTypes from '../actions/PluginActionTypes'
import SettingsManager from '../../SettingsManager'

export default Store({

  getInitialState () {
    return toImmutable({})
  },

  initialize () {
    /** Updates the plugins state with the passed in plugins payload. */
    this.on(PluginActionTypes.MOUNT_INSTALLED_PLUGINS, (state, payload) => {
      return state.merge(toImmutable(payload.plugins).toMap())
    })

    /** Updates the plugins state by filtering out the plugin to be unmounted. */
    this.on(PluginActionTypes.UNMOUNT_PLUGIN, (state, payload) => {
      return toImmutable(state.toArray().filter(plugin => plugin.get('location') !== payload)).toMap()
    })
  }
})
