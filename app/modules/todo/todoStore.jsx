// @flow
import { Store, toImmutable } from 'nuclear-js';
import ActionTypes from './todoActionTypes';

class TodoStore {

  getInitialState() {
    return toImmutable({});
  }

  initialize() {
    this.on(ActionTypes.RECEIVE_TODOS, receiveTodos);
  }
}

function receiveTodos(state, { todos }) {
  let newTodos = toImmutable(todos)
      .toMap()
      .mapKeys((k, v) => v.get('_id'));
  return state.merge(newTodos);
}

export default Store(TodoStore);
