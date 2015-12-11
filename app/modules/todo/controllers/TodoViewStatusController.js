(function(angular) {

  'use strict';

  function TodoViewStatusController($scope, $state, $stateParams, $q, TodoDataService) {

    var docID = $stateParams.doc;
    var appCfg = require('electron').remote.app.sysConfig();

    this.todo;

    this.initialize = function() {

      var init = [TodoDataService.initialize()];

      Promise.all(init).then(() => {
        return TodoDataService.get(docID);
      }).then((result) => {
        $q.when(true).then(() => {
          result.user = result.user || appCfg.user;
          this.todo = result;
        });
      }).catch((err) => {
        $scope.setError('AddAction', 'assignment', err);
        $scope.setReady(true);
      });
    };
  }

  module.exports = TodoViewStatusController;

})(global.angular);
