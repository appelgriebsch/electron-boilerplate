(function() {

  'use strict';

  angular.module('boilerplateApp')
    .config(function($stateProvider, $urlRouterProvider) {

      // for all unmatched entries
      $urlRouterProvider.otherwise('/');

      // separate states
      $stateProvider
        .state('index', {
          url: '/',
          templateUrl: 'views/index.html'
        })
        .state('item', {
          url: '/:item',
          templateProvider: function($timeout, $stateParams) {
            return $timeout(function() {
              return '<p>You clicked on item ' + $stateParams.item + '...</p>';
            }, 100);
          }
        });
    });
})();
