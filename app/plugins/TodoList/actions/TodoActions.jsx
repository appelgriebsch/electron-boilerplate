// @flow
import ActionTypes from './TodoActionTypes';

function initDatabase(db: Object) {

  const viewSpec = {
    _id: '_design/todos',
    version: '0.1.0',
    views: {
      all: {
        map: function mapFun(doc) {
          if (doc.type === 'todo') {
            emit(doc.createdAt);
          }
        }.toString()
      }
    }
  }

  return db.save(viewSpec)
}

/**
 *
 */
class TodoActions {

  appConfig: Object
  db: Object
  reactor: Object

  constructor(appConfig: Object, reactor: Object, documentDatabase: Object) {
    this.appConfig = appConfig
    this.db = documentDatabase
    this.reactor = reactor
  }

  fetchTodos() {

    const options = {
      descending: true,
      include_docs: true
    };

    initDatabase(this.db).then(() => {
      return this.db.query('todos/all', options)
    }).then((result) => {
      let rows = result.rows.map((row) => row.doc)
      this.reactor.dispatch(ActionTypes.RECEIVE_TODOS, { todos: rows })
    });
  }

  addTodo(todoText:string) {

    const todo = {
      title: todoText,
      status: 'open',
      user: this.appConfig.user,
      host: this.appConfig.host,
      createdAt: new Date().toISOString(),
      type: 'todo'
    };

    initDatabase(this.db).then(() => {
      return this.db.save(todo);
    }).then((result) => {
      console.log(result);
      this.reactor.dispatch(ActionTypes.ADD_TODO, { todo: todo });
    });
  }
}

export default TodoActions;
