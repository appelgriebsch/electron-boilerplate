(function(angular) {

  'use strict';

  function TodoViewController($scope, $state, $q, $mdDialog, TodoDataService) {

    this.todos = [];

    this.initialize = function() {

      var init = [TodoDataService.initialize()];

      Promise.all(init).then(() => {
        return TodoDataService.todos();
      }).then((todos) => {
        todos.rows.map((todo) => {
          $q.when(true).then(() => {
            this.todos.push(todo.doc);
          });
        });
      });
    };

    $scope.$on('add-todo', (event, args) => {
      $mdDialog.show({
        targetEvent: event,
        parent: angular.element(document.body),
        templateUrl: __dirname + '/../views/todo.new.html',
        controller: ($scope, $mdDialog) => {
          $scope.ok = function () {
            $mdDialog.hide($scope.todoItem);
          };
          $scope.cancel = function() {
            $mdDialog.cancel();
          };
        }
      }).then((answer) => {
        var todo = {
          title: answer,
          status: 'open',
          createdAt: new Date().toISOString()
        };
        this.todos.push(todo);
        return TodoDataService.save(todo);
      }, function() {
        return;
      });
    });
  }

  module.exports = TodoViewController;

})(global.angular);
