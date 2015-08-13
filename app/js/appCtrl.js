(function() {

  'use strict';

  angular.module('boilerplateApp', [ 'ngMaterial', 'ui.router' ]);
  angular.module('boilerplateApp').controller('AppController', ['$mdSidenav', '$log', '$q', AppController]);

  function AppController($mdSidenav, $log, $q) {

    var self = this;

    self.initialize = function() {
      // TODO: initialization code
    }

    self.toggleSidebar = function() {
      var pending = $q.when(true);
      pending.then(function() {
        $mdSidenav('sidebar').toggle();
      });
    }
  };
})();
