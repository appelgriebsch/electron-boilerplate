// @flow
import { Store, toImmutable } from 'nuclear-js';
import ActionTypes from './todoActionTypes';

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
  }
});
