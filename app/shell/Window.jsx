// @flow
import React from 'react';
import Radium from 'radium';

import { Layout, Header, Navigation, Drawer, Content } from 'react-mdl';

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
          <DragHandler key="left" />
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
          <DragHandler key="left" />
          <AppTitle title={this.props.appName} />
          <DragHandler key="right" />
        </div>
      );
    }

    return (
      <div style={[WindowStyle]}>
        <div style={{width: '100%'}} className="mdl-color--primary">
          { headerComponents }
        </div>
        <Layout fixedHeader>
          <Header title={this.props.activeModule}>
            <Navigation>
              {this.props.modules}
            </Navigation>
          </Header>
          <Drawer title={this.props.activeModule}>
            <Navigation>
              {this.props.modules}
            </Navigation>
          </Drawer>
          <Content>
            {this.props.children}
          </Content>
        </Layout>
      </div>
    );
  }
}

Window.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired
};

export default Radium(Window);
