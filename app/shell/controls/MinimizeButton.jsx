// @flow
import React from 'react'
import Radium from 'radium'

import { winButtonStyle, winIconStyle,
         osxButtonStyle, osxIconStyle } from './ControlStyles'

/**
 *
 */
class MinimizeButton extends React.Component {

  constructor (props) {
    super(props)
  }

  render () {

    var btnStyles = []
    var icon = {}

    if (this.props.platform !== 'darwin') {
      btnStyles = [winButtonStyle.base]
      icon = (
        <svg x='0px' y='0px' viewBox='0 0 10.2 1' style={[winIconStyle]}>
          <rect fill='#ffffff' width='10.2' height='1'></rect>
        </svg>
      )
    } else {
      btnStyles = [ osxButtonStyle.base, osxButtonStyle.minimize ]
      icon = (
        <svg x='0px' y='0px' viewBox='0 0 8 1.1' style={[osxIconStyle]}>
          <rect fill='#995700' width='8' height='1.1'></rect>
        </svg>
      )
    }

    return (
      <a key='minBtn' style={btnStyles} onClick={this.props.clickHandler}>
        {icon}
      </a>
    )
  }
}

MinimizeButton.propTypes = {
  clickHandler: React.PropTypes.func.isRequired,
  platform: React.PropTypes.string.isRequired
}

export default Radium(MinimizeButton)
