// @flow
import reactor from '../../shell/reactor';
import ActionTypes from './todoActionTypes';
import TodoDB from './todoDataService';

var db = new TodoDB('todos');

export default {

  fetchTodos() {
    db.initialize().then(() => {
      return db.todos;
    }).then((result) => {
      let rows = result.rows.map((row) => row.doc);
      reactor.dispatch(ActionTypes.RECEIVE_TODOS, { todos: rows });
    });
  }
};
