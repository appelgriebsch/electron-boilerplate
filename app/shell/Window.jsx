// @flow
import React from 'react'
import Radium from 'radium'

import { Layout, Header, Navigation, Drawer, Content } from 'react-mdl'

import AppTitle from './controls/AppTitle'
import DragHandler from './controls/DragHandler'
import MinimizeButton from './controls/MinimizeButton'
import MaximizeButton from './controls/MaximizeButton'
import CloseButton from './controls/CloseButton'

try {
    console.log("Props from Window.jsx " + JSON.stringify(this.props));
}
catch (e)
{
  console.log('Error in Window.jsx');
}


const WindowStyle = {
  padding: 0,
  margin: 0,
  height: '100%',
  width: '100%',
  overflow: 'hidden',
  WebkitUserSelect: 'none'
}

/**
 *
 *
 * @class Window
 * @extends {React.Component}
 */
class Window extends React.Component {

  constructor (props) {
    super(props)
  }

  /**
   *
   *
   * @returns
   */
  render () {

    var headerComponents = {}

    if (this.props.platform !== 'darwin') {
      headerComponents = (
        <div style={{height: '24px', flex: 1, alignContent: 'flex-end', alignItems: 'flex-end', justifyContent: 'flex-end', display: 'flex', padding: '2px'}}>
          <AppTitle title={this.props.appName} />
          <DragHandler key='left' />
          <MinimizeButton platform={this.props.platform} clickHandler={this.props.minimizeHandler} />
          <MaximizeButton platform={this.props.platform} clickHandler={this.props.fullScreenHandler} />
          <CloseButton platform={this.props.platform} clickHandler={this.props.closeHandler} />
        </div>
      )
    } else {
      headerComponents = (
        <div style={{height: '24px', flex: 1, alignContent: 'flex-start', alignItems: 'flex-start', justifyContent: 'flex-start', display: 'flex', padding: '2px'}}>
          <CloseButton platform={this.props.platform} clickHandler={this.props.closeHandler} />
          <MinimizeButton platform={this.props.platform} clickHandler={this.props.minimizeHandler} />
          <MaximizeButton platform={this.props.platform} clickHandler={this.props.fullScreenHandler} />
          <DragHandler key='left' />
          <AppTitle title={this.props.appName} />
          <DragHandler key='right' />
        </div>
      )
    }

    return (
      <div style={[WindowStyle]}>
        <div style={{width: '100%'}} className='mdl-color--primary'>
          {headerComponents}
        </div>
        <Layout fixedHeader>
          <Header title={this.props.activeModule} />
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
    )
  }
}

Window.propTypes = {
  appName: React.PropTypes.string.isRequired,
  activeModule: React.PropTypes.string.isRequired,
  closeHandler: React.PropTypes.func.isRequired,
  fullScreenHandler: React.PropTypes.func.isRequired,
  minimizeHandler: React.PropTypes.func.isRequired,
  platform: React.PropTypes.string.isRequired
}

export default Radium(Window)
