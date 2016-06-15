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
  },

  addTodo(todoText) {

    const todo = {
      title: todoText,
      status: 'open',
      user: 'admin',
      createdAt: new Date().toISOString()
    };

    db.initialize().then(() => {
      return db.addTodo(todo);
    }).then((result) => {
      console.log(result);
      reactor.dispatch(ActionTypes.ADD_TODO, { todo: todo });
    });
  }
};
