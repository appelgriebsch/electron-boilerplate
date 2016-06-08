// @flow
import electron from 'electron';
import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {blue500} from 'material-ui/styles/colors';

import AppBar from 'material-ui/AppBar';

const appCfg = electron.remote.app.sysConfig();
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blue500
  }
});


export default class Shell extends React.Component {

  constructor(props) {
    super(props);
    this.title = `${appCfg.app.name} ${appCfg.app.version}`;
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <AppBar title={this.title} showMenuIconButton={false}>
          {this.props.children}
        </AppBar>
      </MuiThemeProvider>
    );
  };
};
