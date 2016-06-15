// @flow
import React from 'react';
import Radium from 'radium';

import reactor from '../../shell/reactor';
import TodoStore from './todoStore';
import TodoActions from './todoActions';

import { GridList, GridTile } from 'material-ui/GridList';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { gridLayoutStyle, mainContentStyle, floatingButtonStyles } from './todoStyles';

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

    const cols = 4;     // TODO: responsive layout phone: 1 col, tablet: 2 cols

    return (
      <div style={[ mainContentStyle.base, mainContentStyle.nonOverflow ]}>
        <GridList style={gridLayoutStyle} cols={cols}>
          {this.state.todos.map((todo) => {
            var item = todo.toJS();
            return (<GridTile key={item._id}
                              title={item.title}
                              subtitle={item.name}
                              actionIcon={<IconButton><FontIcon color="white" className="material-icons">delete</FontIcon></IconButton>}
                              actionPosition="right"
                              titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)">
                    </GridTile>);
          }).toList()}
        </GridList>
        <FloatingActionButton style={floatingButtonStyles.bottom}>
          <FontIcon color="black" className="material-icons">add</FontIcon>
        </FloatingActionButton>
      </div>
    );
  }
});

export default Radium(Todo);
