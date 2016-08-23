
// @flow
import { Store, toImmutable } from 'nuclear-js';
import ActionTypes from '../actions/TodoActionTypes';

export default Store({

  getInitialState() {
    return toImmutable({});
  },

  initialize() {
    this.on(ActionTypes.RECEIVE_TODOS, (state, payload) => {
      let newTodos = toImmutable(payload.todos)
                      .toMap()
                      .mapKeys((k, v) => v.get('_id'));
      return state.merge(newTodos);
    });
    this.on(ActionTypes.ADD_TODO, (state, payload) => {
      let newTodos = toImmutable([payload.todo])
                      .toMap()
                      .mapKeys((k,v) => v.get('_id'));
      return state.merge(newTodos);
    });
  }
});
