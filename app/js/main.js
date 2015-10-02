(function() {

  'use strict';

  angular.module('boilerplateApp', ['ngMaterial', 'ngSanitize', 'ui.router', 'notification'])
    .config(function($notificationProvider) {
      $notificationProvider.setOptions({
        icon: __dirname + '/assets/boilerplate.png'
      });
    })
    .run(
      ['$rootScope', '$state', '$stateParams',
        function($rootScope, $state, $stateParams) {
          // It's very handy to add references to $state and $stateParams to the $rootScope
          // so that you can access them from any scope within your applications.For example,
          // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
          // to active whenever 'contacts.list' or one of its decendents is active.
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;
        }
      ]
    );

  angular.module('boilerplateApp').controller('AppController', ['$mdSidenav', '$log', '$q', AppController]);

  function AppController($mdSidenav, $log, $q) {

    this.initialize = function() {
      // TODO: initialization code
    };

    this.toggleSidebar = function() {
      var pending = $q.when(true);
      pending.then(() => {
        $mdSidenav('sidebar').toggle();
      });
    };
  }

})();
