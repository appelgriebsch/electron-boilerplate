import React from 'react'

const styles = {
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

export default class TitleBar extends React.Component {

  render() {

    let componentStyle = styles.titleBar;
    let titleStyle = styles.title;

    const titleComponent =
      <div style={titleStyle} {...this.props}>
        {this.props.title}
      </div>;

    return (
      <div style={componentStyle} {...this.props}>
        {titleComponent}
      </div>
    );
  };
};

TitleBar.propTypes = {
  title: React.PropTypes.string,
  controls: React.PropTypes.bool,
  onClosePress: React.PropTypes.func,
  onMinimizePress: React.PropTypes.func,
  onMaximizePress: React.PropTypes.func
};
