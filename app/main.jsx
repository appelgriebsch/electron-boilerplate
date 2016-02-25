import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import electron from 'electron'
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'

import Shell from './shell/shell'
import Activity from './modules/activity/activity'

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

ReactDOM.render(  
  <Router history={hashHistory}>
    <Route path="/" component={Shell}>
      <IndexRoute component={Activity}/>      
    </Route>
  </Router>, document.getElementById('app'));
