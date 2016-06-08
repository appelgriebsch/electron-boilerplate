// @flow
import React from 'react';
import Radium from 'radium';
import AppBar from 'material-ui/AppBar';

import AppTitle from './controls/AppTitle';
import DragHandler from './controls/DragHandler';
import MinimizeButton from './controls/MinimizeButton';
import MaximizeButton from './controls/MaximizeButton';
import CloseButton from './controls/CloseButton';

const WindowStyle = {
  padding: 0,
  margin: 0,
  height: '100%',
  width: '100%',
  overflow: 'hidden',
  WebkitUserSelect: 'none'
};

class Window extends React.Component {

  render() {

    var headerComponents = {};
    if (this.props.style !== 'darwin') {
      headerComponents = (
        <div style={{height: '24px', flex: 1, alignContent: 'flex-end', alignItems: 'flex-end', justifyContent: 'flex-end', display: 'flex', padding: '2px'}}>
          <AppTitle title={this.props.appName} />
          <DragHandler key="drag_1" />
          <MinimizeButton style={this.props.style} clickHandler={this.props.minimizeHandler} />
          <MaximizeButton style={this.props.style} clickHandler={this.props.fullScreenHandler} />
          <CloseButton style={this.props.style} clickHandler={this.props.closeHandler} />
        </div>
      );
    } else {
      headerComponents = (
        <div style={{height: '24px', flex: 1, alignContent: 'flex-start', alignItems: 'flex-start', justifyContent: 'flex-start', display: 'flex', padding: '2px'}}>
          <CloseButton style={this.props.style} clickHandler={this.props.closeHandler} />
          <MinimizeButton style={this.props.style} clickHandler={this.props.minimizeHandler} />
          <MaximizeButton style={this.props.style} clickHandler={this.props.fullScreenHandler} />
          <DragHandler key="drag_1" />
          <AppTitle title={this.props.appName} />
          <DragHandler key="drag_2" />
        </div>
      );
    }

    return (
      <div style={[WindowStyle]}>
        <div style={{backgroundColor: this.context.muiTheme.palette.primary1Color, width: '100%'}}>
          { headerComponents }
        </div>
        <AppBar title={this.props.activeModule} showMenuIconButton={false}>
          {this.props.children}
        </AppBar>
      </div>
    );
  }
}

Window.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired
};

export default Radium(Window);
