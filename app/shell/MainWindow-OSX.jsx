import React from 'react';
import AppBar from 'material-ui/AppBar';

export default class MainWindow extends React.Component {
  render() {
    return (
      <div>
        <div className="md-toolbar-tools windows-controls" flex layout-align="start start">
          <a className="md-icon-button osx-control close">
            <svg x="0px" y="0px" viewBox="0 0 6.4 6.4">
              <polygon fill="#4d0000" points="6.4,0.8 5.6,0 3.2,2.4 0.8,0 0,0.8 2.4,3.2 0,5.6 0.8,6.4 3.2,4 5.6,6.4 6.4,5.6 4,3.2 "></polygon>
            </svg>
          </a>
          <a className="md-icon-button osx-control minimize">
            <svg x="0px" y="0px" viewBox="0 0 8 1.1">
              <rect fill="#995700" width="8" height="1.1"></rect>
            </svg>
          </a>
          <a className="md-icon-button osx-control fullscreen">
            <svg x="0px" y="0px" viewBox="0 0 6 5.9">
              <path fill="#006400" d="M5.4,0h-4L6,4.5V0.6C5.7,0.6,5.3,0.3,5.4,0z"></path>
              <path fill="#006400" d="M0.6,5.9h4L0,1.4l0,3.9C0.3,5.3,0.6,5.6,0.6,5.9z"></path>
            </svg>
          </a>
          <span className="draggable" flex></span>
          <span className="app-title">{ this.props.appName }</span>
          <span className="draggable" flex></span>
        </div>
        <AppBar title={this.title} showMenuIconButton={false}>
          {this.props.children}
        </AppBar>
      </div>
    );
  };
};
