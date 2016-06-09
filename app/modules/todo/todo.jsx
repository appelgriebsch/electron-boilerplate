// @flow
import React from 'react';
import Radium from 'radium';

import reactor from '../../shell/reactor';
import TodoStore from './todoStore';
import TodoActions from './todoActions';

class Todo extends React.Component {

  constructor() {
    super();
    this.todoActions = new TodoActions();
    reactor.registerStores({
      'todos': TodoStore
    });
    this.todoActions.fetchTodos();
  }

  render() {
    return (
      <div>
        <h1>Todo list</h1>
      </div>
    );
  }
}

export default Radium(Todo);
