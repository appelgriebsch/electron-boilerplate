(function(angular) {

  'use strict';

  function TodoViewController($scope, $state, $q, $mdDialog, TodoDataService) {

    var appCfg = require('electron').remote.app.sysConfig();

    this.state = $state.$current;
    this.baseState = this.state.parent.toString();
    this.todos = [];
    this.selectedDocument;

    this.initialize = function() {

      var init = [TodoDataService.initialize()];

      Promise.all(init).then(() => {
        return TodoDataService.todos();
      }).then((todos) => {
        todos.rows.map((todo) => {
          $q.when(true).then(() => {
            var t = todo.doc;
            t.user = t.user || appCfg.user;
            this.todos.push(t);
          });
        });
      }).catch((err) => {
        $scope.setError('AddAction', 'assignment', err);
        $scope.setReady(true);
      });
    };

    this.toggleTodo = (evt, doc) => {

      var status = doc.status;

      switch(status) {
      case 'open':
        status = 'finished';
        break;
      case 'finished':
        status = 'open';
        break;
      }

      $q.when(true).then(() => {

        doc.status = status;

        TodoDataService.save(doc).then((result) => {

          var info = $scope.createEventFromTemplate('AddAction', 'assignment');
          info.description = `Todo <i>${doc.title}</i> has been marked ${status}!`;
          info.object = doc;
          info.result = result;

          doc._rev = result.rev;

          $scope.writeLog('info', info).then(() => {
            $scope.notify('Todo updated successfully', info.description);
          });
        }).catch((err) => {
          $scope.setError('AddAction', 'assignment', err);
          $scope.setReady(true);
        });
      });
    };

    this.removeTodo = (evt, doc) => {

      var confirm = $mdDialog.confirm()
        .title('Would you like to delete this document?')
        .content(doc.title)
        .targetEvent(evt)
        .ok('Delete')
        .cancel('Cancel');

      $mdDialog.show(confirm).then(() => {

        TodoDataService.delete(doc).then(() => {

          var info = $scope.createEventFromTemplate('DeleteAction', 'delete');
          info.description = `Document <i>${doc.title}</i> has been deleted.`;
          info.object = doc;
          delete info.result;

          $scope.writeLog('warning', info).then(() => {
            $scope.notify('Document deleted successfully', info.description);

            var idx = this.todos.indexOf(doc);
            if (idx > -1) {
              this.todos.splice(idx, 1);
            }
            $scope.setReady(true);
          });

        }).catch((err) => {
          $scope.setError('DeleteAction', 'delete', err);
          $scope.setReady(true);
        });
      });
    };

    this.selectDocument = (evt, doc) => {

      if (doc === this.selectedDocument) {
        return;
      }

      var statusElem = document.querySelectorAll('.statusLine');

      if (statusElem.length > 0) {

        angular.element(statusElem[0]).removeClass('fadeInUp');
        angular.element(statusElem[0]).addClass('fadeOutDown');

        angular.element(statusElem[0]).one('webkitAnimationEnd', () => {
          $q.when(true).then(() => {
            this.selectedDocument = doc;
            $state.go('.itemSelected', { doc: doc._id }, { relative: this.state });
          });
        });
      }
      else {
        $q.when(true).then(() => {
          this.selectedDocument = doc;
          $state.go('.itemSelected', { doc: doc._id }, { relative: this.state });
        });
      }
    };

    $scope.$on('add-todo', (event, args) => {
      $mdDialog.show({
        clickOutsideToClose: false,
        parent: angular.element(document.body),
        templateUrl: __dirname + '/../views/todo.new.html',
        controller: ($scope, $mdDialog) => {
          $scope.todoItem = '';
          $scope.answer = function () {
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
          user: appCfg.user,
          createdAt: new Date().toISOString()
        };

        this.todos.unshift(todo);

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
