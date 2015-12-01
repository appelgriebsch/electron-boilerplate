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
      }).catch((err) => {
        $scope.setError('AddAction', 'assignment', err);
        $scope.setReady(true);
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

        TodoDataService.save(todo).then((result) => {

          var info = $scope.createEventFromTemplate('AddAction', 'assignment');
          info.description = `Todo <i>${answer}</i> created successfully!`;
          info.object = todo;
          delete info.result;

          $scope.writeLog('info', info).then(() => {
            $scope.notify('Todo created successfully', info.description);
          });
        }).catch((err) => {
          $scope.setError('AddAction', 'assignment', err);
          $scope.setReady(true);
        });
      }, function() {
        return;
      });
    });
  }

  module.exports = TodoViewController;

})(global.angular);
