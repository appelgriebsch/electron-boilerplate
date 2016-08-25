// @flow
import React from 'react'
import Radium from 'radium'

const appTitleStyle = {
  WebkitUserSelect: 'none',
  cursor: 'default',
  fontFamily: 'Roboto',
  fontSize: '12px',
  color: '#ffffff',
  paddingLeft: '10px',
  paddingBottom: '5px'
}

/**
 *  A React component to render application titles
 *
 * @class AppTitle
 * @extends {React.Component}
 */
class AppTitle extends React.Component {


  /**
   * Creates an instance of AppTitle.
   *
   * @param {any} props
   */
  constructor (props) {
    super(props)
  }


  /**
   *  renders the application title
   *
   * @returns a span with the application title
   */
  render () {
    return (
      <span style={[appTitleStyle]}>{this.props.title}</span>
    )
  }
}

AppTitle.propTypes = {
  title: React.PropTypes.string.isRequired
}

export default Radium(AppTitle)
