// @flow

import React from 'react'
import path from 'path'
import { Router, hashHistory } from 'react-router'
import { connect } from 'nuclear-js-react-addons'
import { toImmutable } from 'nuclear-js'

import Shell from '../../Shell'
import PluginManager from '../plugin/PluginManager'
import SettingsManager from '../plugin/SettingsManager'
import routing from './getters'

/** */
class RoutesManager extends React.Component {

  Manager: PluginManager
  PluginControls: Object
  plugins: Object
  routes: Object

  /**
  *
  */
  constructor(props) {

    super(props)
    this.uninstallPlugin = this.uninstallPlugin.bind(this)
    this.PluginControls = this.props.PluginControls
    this.routes = {
      path: '/',
      component: Shell,
      childRoutes: []
    }
  }

  uninstallPlugin(plugin:string) {
    this.PluginControls.unmountPlugin(plugin)
  }

  render () {
    const {
      plugins
    } = this.props;
    plugins.toArray().map((plugin) => {
      this.routes.childRoutes.push(plugin.toJS())
    })

    console.log('childRoutes in RoutesManager ' + this.routes.childRoutes);

    return(
      <Router history={hashHistory} routes={this.routes} />
    )
  }
}

function dataBinding(props) {
  return {
    plugins: routing.plugins
  };
}

RoutesManager.propTypes = {
  reactor: React.PropTypes.object.isRequired,
  PluginControls: React.PropTypes.object.isRequired
}

export default connect(dataBinding)(RoutesManager)
