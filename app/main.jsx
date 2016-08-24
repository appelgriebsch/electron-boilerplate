// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { Router, hashHistory } from 'react-router'

import fs from 'fs'
import path from 'path'
import Shell from './shell/Shell'

const routes = {
  path: '/',
  component: Shell,
  childRoutes: [
  ]
}

function tryLoadPlugin(plugin:string) : ?Object {
  let plugInInfo: ?Object
  try {
    plugInInfo = require('./plugins/' + plugin)
    plugInInfo.module = require('./plugins/' + plugin + '/package.json')
    console.log(plugInInfo)
  } catch(ex) {
    plugInInfo = undefined
  }
  return plugInInfo
}

let plugins = fs.readdirSync(path.join(__dirname, 'plugins'))
plugins.map((plugin) => {
  routes.childRoutes.push(tryLoadPlugin(plugin))
})

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin()

ReactDOM.render(
  <Router history={hashHistory}
    routes={routes} />, document.querySelector('div[role=app]')
)
