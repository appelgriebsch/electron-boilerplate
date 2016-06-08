// @flow
import React from 'react';
import Radium from 'radium';

import {winButtonStyle, winIconStyle, osxButtonStyle, osxIconStyle} from './ControlStyles';

class CloseButton extends React.Component {

  render() {

    var btnStyles = [];
    var icon = {};
    if (this.props.style !== 'darwin') {
      btnStyles = [winButtonStyle.base, winButtonStyle.close];
      icon = (
        <svg x="0px" y="0px" viewBox="0 0 10.2 10.2" style={[winIconStyle]}>
          <polygon fill="#ffffff" points="10.2,0.7 9.5,0 5.1,4.4 0.7,0 0,0.7 4.4,5.1 0,9.5 0.7,10.2 5.1,5.8 9.5,10.2 10.2,9.5 5.8,5.1 "></polygon>
        </svg>
      );
    } else {
      btnStyles = [osxButtonStyle.base, osxButtonStyle.close];
      icon = (
        <svg x="0px" y="0px" viewBox="0 0 6.4 6.4" style={[osxIconStyle]}>
          <polygon fill="#4d0000" points="6.4,0.8 5.6,0 3.2,2.4 0.8,0 0,0.8 2.4,3.2 0,5.6 0.8,6.4 3.2,4 5.6,6.4 6.4,5.6 4,3.2 "></polygon>
        </svg>
      );
    }

    return (
      <a key="closeBtn" style={btnStyles} onClick={this.props.clickHandler}>
        { icon }
      </a>
    );
  }
}

export default Radium(CloseButton);
