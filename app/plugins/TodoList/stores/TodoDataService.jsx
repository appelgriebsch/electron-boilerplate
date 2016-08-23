// @flow
import PouchDBService from '../../../shell/services/DocumentDatabase';

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

  constructor(name:string) {
    super(name);
  }

  initialize() {
    return this.save(viewSpec);
  }

  getTodos() {

    const options = {
      descending: true,
      include_docs: true
    };

    return this.query('todos/all', options);
  }

  getTodo(id:string) {
    return this.get(id);
  }

  removeTodo(id:string) {
    return this.remove(id);
  }
}

export default TodoDataService;
