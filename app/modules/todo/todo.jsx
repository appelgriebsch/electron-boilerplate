// @flow
import electron from 'electron'
import React from 'react';
import Radium from 'radium';

class Todo extends React.Component {

  render() {
    return (
      <div>
        <h1>Todo list</h1>
      </div>
    );
  }
}

export default Radium(Todo);
