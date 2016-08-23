// @flow
import ActionTypes from './TodoActionTypes';
import TodoDB from '../stores/TodoDataService';

/**
 *
 */
class TodoActions {

  db: TodoDB;
  reactor: Object;

  constructor(reactor : Object) {
    this.db = new TodoDB('todos');
    this.reactor = reactor;
  }

  fetchTodos() {
    this.db.initialize().then(() => {
      return this.db.getTodos();
    }).then((result) => {
      let rows = result.rows.map((row) => row.doc);
      this.reactor.dispatch(ActionTypes.RECEIVE_TODOS, { todos: rows });
    });
  }

  addTodo(todoText:string) {

    const todo = {
      title: todoText,
      status: 'open',
      user: 'admin',
      createdAt: new Date().toISOString()
    };

    this.db.initialize().then(() => {
      return this.db.addTodo(todo);
    }).then((result) => {
      console.log(result);
      this.reactor.dispatch(ActionTypes.ADD_TODO, { todo: todo });
    });
  }
}

export default TodoActions;
