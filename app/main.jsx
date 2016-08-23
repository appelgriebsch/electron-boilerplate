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

let plugins = fs.readdirSync(path.join(__dirname, 'plugins'))
plugins.map((plugin) => {
  console.log(plugin)
  routes.childRoutes.push(require('./plugins/' + plugin))
});

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin()

ReactDOM.render(
  <Router history={hashHistory}
          routes={routes} />,
          document.querySelector('div[role=app]')
)
