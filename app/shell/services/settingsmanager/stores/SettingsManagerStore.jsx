
// @flow
import { Store, toImmutable } from 'nuclear-js'
import SettingsManagerActionTypes from '../actions/SettingsManagerActionTypes'

export default Store({

  getInitialState () {
    return toImmutable({})
  },

  initialize () {
    this.on(SettingsManagerActionTypes.MOUNT_INSTALLED_PLUGINS, (state, payload) => {
      return toImmutable(payload.plugins).toMap()
    })
  }
})
