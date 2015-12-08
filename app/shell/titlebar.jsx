(function() {

  'use strict';

  const React = require('react');

  var styles = {

    titleBar: {
      userSelect: 'none',
      WebkitAppRegion: 'drag',
      cursor: 'default',
      display: 'flex',
      alignItems: 'center',
      height: '31px'
    },

    title: {
      WebkitUserSelect: 'none',
      cursor: 'default',
      paddingLeft: '12px',
      fontFamily: '"Segoe UI", "Arial"',
      fontSize: '12px',
      flex: 1
    }
  };

  class TitleBar extends React.Component {

    render() {

      let componentStyle = styles.titleBar;
      let titleStyle = styles.title;

      componentStyle.backgroundColor = this.props.style.backgroundColor;

      const titleComponent =
        <div style={titleStyle}>
          {this.props.title}
        </div>;

      return (
        <div style={componentStyle}>
          {titleComponent}
        </div>
      );
    }
  }

  TitleBar.propTypes = {
    title: React.PropTypes.string,
    controls: React.PropTypes.bool,
    onClosePress: React.PropTypes.func,
    onMinimizePress: React.PropTypes.func,
    onMaximizePress: React.PropTypes.func
  };

  module.exports = TitleBar;

})();
