// @flow
import reactor from '../../shell/reactor';
import ActionTypes from './todoActionTypes';
import TodoDB from './todoDataService';

class TodoActions {

  constructor() {
    this.db = new TodoDB('todos');
  }

  fetchTodos() {
    this.db.initialize().then(() => {
      return this.db.todos;
    }).then((results) => {
      let todos = results.rows;
      reactor.dispatch(ActionTypes.RECEIVE_TODOS, { todos });
    });
  }
}

export default TodoActions;
