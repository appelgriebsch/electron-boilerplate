// @flow
import React from 'react'
import Radium from 'radium'

const dragStyle = {
  WebkitAppRegion: 'drag',
  height: '100%',
  flex: 1
}

/**
 *
 */
class DragHandler extends React.Component {

  constructor (props) {
    super(props)
  }

  render () {
    return (
      <span style={[dragStyle]} />
    )
  }
}

export default Radium(DragHandler)
