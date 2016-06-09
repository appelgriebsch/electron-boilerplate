// @flow
import React from 'react';
import Radium from 'radium';

import reactor from '../../shell/reactor';
import TodoStore from './todoStore';
import TodoActions from './todoActions';

import { GridList, GridTile } from 'material-ui/GridList';
import { gridLayoutStyle, mainContentStyle } from './todoStyles';

reactor.registerStores({
  'todos': TodoStore
});

TodoActions.fetchTodos();

const Todo = React.createClass({

  mixins: [reactor.ReactMixin],

  getDataBindings() {
    return {
      todos: ['todos']
    };
  },

  render() {
    return (
      <div style={[mainContentStyle.base, mainContentStyle.nonOverflow ]}>
        <GridList style={gridLayoutStyle}>
          {this.state.todos.map((todo) => {
            var item = todo.toJS();
            return (<GridTile key={item._id} title={item.title} subtitle={item.name}></GridTile>);
          }).toList()}
        </GridList>
      </div>
    );
  }
});

export default Radium(Todo);
