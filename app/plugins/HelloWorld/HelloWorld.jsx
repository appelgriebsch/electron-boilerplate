// @flow
import React from 'react'
import Radium from 'radium'

class HelloWorld extends React.Component {

  render () {
    return(
      <div>
      Hello... This Plugin was created to demonstrate the delete feature from the settings manager.
      </div>
    )
  }
}

export default Radium(HelloWorld)
