// @flow
import React from 'react';
import Radium from 'radium';

import { Button, Grid, Cell } from 'react-mdl';

import { toImmutable } from 'nuclear-js';
import { connect } from 'nuclear-js-react-addons';
import TodoStore from '../stores/TodoStore';
import TodoActions from '../actions/TodoActions';

import { gridLayoutStyle, mainContentStyle,
         floatingButtonStyles, textEntryStyles } from './TodoStyles';

/**
 *
 */
class TodoList extends React.Component {

  todoActions: TodoActions;

  constructor(props, context) {

    super(props, context);

    this.state = { todoDlgOpen: false, todoText: '' }
    this.todoActions = new TodoActions(this.context.reactor, this.context.documentDatabase);
    this.context.reactor.registerStores({
      'todos': TodoStore
    });

    this.todoActions.fetchTodos();
  }

  handleNewTodoText(event) {
    this.setState({ todoText: event.target.value });
  }

  handleNewTodoDlgOpen() {
    this.setState({ todoDlgOpen: true });
  }

  handleNewTodoDlgConfirm() {
    TodoActions.addTodo(this.state.todoText);
    this.setState( { todoDlgOpen: false });
  }

  handleNewTodoDlgCancel() {
    this.setState( { todoDlgOpen: false });
  }

  render() {

    const todoDlgButtons = [
      <Button primary={true}
              onTouchTap={this.handleNewTodoDlgConfirm}>Create</Button>,
      <Button primary={false}
              onTouchTap={this.handleNewTodoDlgCancel}>Cancel</Button>
    ];

    /* title={item.title}
    subtitle={item.name}
    actionIcon={<IconButton><FontIcon color="white" className="material-icons">delete</FontIcon></IconButton>}
    actionPosition="right"
    titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"


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
    */

    return (
      <div style={[ mainContentStyle.base, mainContentStyle.nonOverflow ]}>
        <Grid style={gridLayoutStyle}>
          {this.props.todos.map((todo) => {
            var item = todo.toJS();
            return (<Cell key={item._id}
                          col={4} tablet={2} phone={1}>
                          {item.title}
                    </Cell>);
          }).toList()}
        </Grid>
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: React.PropTypes.object.isRequired
}

TodoList.defaultProps = {
  todos: toImmutable({})
}

TodoList.contextTypes = {
  documentDatabase: React.PropTypes.object.isRequired,
  reactor: React.PropTypes.object.isRequired
}

function dataBinding(props) {
  return {
    todos: ['todos']
  };
}

export default Radium(connect(dataBinding)(TodoList));
