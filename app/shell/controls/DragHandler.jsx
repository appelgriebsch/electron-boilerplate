import React from 'react';
import Radium from 'radium';

const dragStyle = {
  WebkitAppRegion: 'drag',
  height: '100%',
  flex: 1
};

class DragHandler extends React.Component {
  render() {
    return (
      <span key={this.props.key} style={[dragStyle]} />
    );
  };
}

export default Radium(DragHandler);
