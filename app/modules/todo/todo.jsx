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
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { gridLayoutStyle, mainContentStyle, floatingButtonStyles, textEntryStyles } from './todoStyles';

reactor.registerStores({
  'todos': TodoStore
});

TodoActions.fetchTodos();

const Todo = React.createClass({

  mixins: [reactor.ReactMixin],

  getInitialState() {
    return { todoDlgOpen: false, todoText: '' };
  },

  getDataBindings() {
    return {
      todos: ['todos']
    };
  },

  handleNewTodoText(event) {
    this.setState({ todoText: event.target.value });
  },

  handleNewTodoDlgOpen() {
    this.setState({ todoDlgOpen: true });
  },

  handleNewTodoDlgConfirm() {
    TodoActions.addTodo(this.state.todoText);
    this.setState( { todoDlgOpen: false });
  },

  handleNewTodoDlgCancel() {
    this.setState( { todoDlgOpen: false });
  },

  render() {

    const cols = 4;     // TODO: responsive layout phone: 1 col, tablet: 2 cols
    const todoDlgButtons = [
      <FlatButton label="Create"
                  primary={true}
                  onTouchTap={this.handleNewTodoDlgConfirm} />,
      <FlatButton label="Cancel"
                  secondary={true}
                  onTouchTap={this.handleNewTodoDlgCancel} />
    ];

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
        <FloatingActionButton style={floatingButtonStyles.bottom} onTouchTap={this.handleNewTodoDlgOpen}>
          <FontIcon color="black" className="material-icons">add</FontIcon>
        </FloatingActionButton>
        <Dialog title="Create a new Todo"
                modal={true}
                actions={todoDlgButtons}
                open={this.state.todoDlgOpen}
                onRequestClose={this.handleNewTodoDlgCancel}>
          <TextField style={textEntryStyles.large}
                  hintText="Your new Todo"
                  errorText="This field is required"
                  floatingLabelText="Please insert your new Todo"
                  onChange={this.handleNewTodoText} />
        </Dialog>
      </div>
    );
  }
});

export default Radium(Todo);
