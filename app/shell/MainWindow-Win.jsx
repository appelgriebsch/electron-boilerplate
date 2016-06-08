import React from 'react';
import AppBar from 'material-ui/AppBar';

class MainWindow extends React.Component {
  render() {
    return (
      <div style={{backgroundColor: this.context.muiTheme.palette.primary1Color, width: '100%'}}>
        <div style={{height: '24px', flex: 1, alignContent: 'flex-end', alignItems: 'flex-end', justifyContent: 'flex-end', display: 'flex', padding: '2px'}}>
          <span className="app-title">{ this.props.appName }</span>
          <span className="draggable"></span>
          <a className="md-icon-button window-control md-button" onClick={this.props.minimizeHandler}>
            <svg x="0px" y="0px" viewBox="0 0 10.2 1">
              <rect fill="#ffffff" width="10.2" height="1"></rect>
            </svg>
          </a>
          <a className="md-icon-button window-control md-button" onClick={this.props.fullScreenHandler}>
            <svg x="0px" y="0px" viewBox="0 0 10.2 10.2">
              <path fill="#ffffff" d="M2.1,0v2H0v8.1h8.2v-2h2V0H2.1z M7.2,9.2H1.1V3h6.1V9.2z M9.2,7.1h-1V2H3.1V1h6.1V7.1z"></path>
            </svg>
          </a>
          <a className="md-icon-button window-control close md-button" onClick={this.props.closeHandler}>
            <svg x="0px" y="0px" viewBox="0 0 10.2 10.2">
              <polygon fill="#ffffff" points="10.2,0.7 9.5,0 5.1,4.4 0.7,0 0,0.7 4.4,5.1 0,9.5 0.7,10.2 5.1,5.8 9.5,10.2 10.2,9.5 5.8,5.1 "></polygon>
            </svg>
          </a>
        </div>
        <AppBar title={this.props.activeModule} showMenuIconButton={false}>
          {this.props.children}
        </AppBar>
      </div>
    );
  };
}

MainWindow.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default MainWindow;
