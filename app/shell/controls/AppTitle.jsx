// @flow
import React from 'react';
import Radium from 'radium';

const appTitleStyle = {
  WebkitUserSelect: 'none',
  cursor: 'default',
  fontFamily: 'Roboto',
  fontSize: '12px',
  color: '#ffffff',
  paddingLeft: '10px',
  paddingBottom: '5px'
};

class AppTitle extends React.Component {
  render() {
    return (
      <span style={[appTitleStyle]}>{ this.props.title }</span>
    );
  }
}

export default Radium(AppTitle);
