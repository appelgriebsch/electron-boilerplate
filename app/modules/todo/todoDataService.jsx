// @flow
import PouchDBService from '../../shell/pouchdb';
import uuid from 'uuid';

const viewSpec = {
  _id: '_design/todos',
  version: '0.1.0',
  views: {
    all: {
      map: function mapFun(doc) {
        emit(doc.createdAt);
      }.toString()
    }
  }
};

class TodoDataService extends PouchDBService {

  constructor(name) {
    super(name);
  }

  initialize() {
    return this.save(viewSpec);
  }

  get todos() {

    const options = {
      descending: true,
      include_docs: true
    };

    return this.query('todos/all', options);
  }

  getTodo(id) {
    return this.get(id);
  }

  removeTodo(id) {
    return this.remove(id);
  }

  addTodo(todo) {

    if (!todo._id) {
      todo._id = uuid.v4();
    }

    return this.save(todo);
  }
}

export default TodoDataService;
