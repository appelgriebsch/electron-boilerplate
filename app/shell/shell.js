import React from 'react';
import AppBar from 'material-ui/lib/app-bar';

class Shell extends React.Component {

  render() {
    return (
      <AppBar
        title='Electron Boilerplate'
        showMenuIconButton={false} />        
    );
  }
}

export default Shell;
