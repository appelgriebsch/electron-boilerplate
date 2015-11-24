(function() {

  'use strict';

  function TodoViewController($scope, $state, $q, TodoDataService) {

    this.todos = [];

    this.initialize = function() {

      var init = [TodoDataService.initialize()];

      Promise.all(init).then(() => {
        return TodoDataService.events();
      }).then((todos) => {
        todos.rows.map((todo) => {
          this.todos.push(todo);
        });
      });      
    };
  }

  module.exports = TodoViewController;

})();
