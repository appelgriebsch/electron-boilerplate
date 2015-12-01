(function(angular) {

  'use strict';

  angular.module('boilerplateApp', ['ngMaterial', 'ngSanitize', 'ui.router', 'angular-timeline', 'angular-centered', 'notification'])
    .config(function($mdThemingProvider) {
      $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .accentPalette('grey');
    })
    .config(function($notificationProvider) {
      $notificationProvider.setOptions({
        icon: __dirname + '/assets/boilerplate.png'
      });
    })
    .config(function($stateProvider, $urlRouterProvider) {

      var appcfg = require('./appcfg');
      var defaultRoute = appcfg.modules[appcfg.defaultModule].url;

      // for all unmatched entries
      $urlRouterProvider.otherwise(defaultRoute);

      // separate states
      $stateProvider
        .state('app', {
          url: '/app',
          abstract: true,
          templateUrl: './shell/views/shell.html',
          controller: 'ShellController as shell'
        });
    })
    .run(['$rootScope', '$state', '$stateParams',
      function($rootScope, $state, $stateParams) {
        // It's very handy to add references to $state and $stateParams to the $rootScope
        // so that you can access them from any scope within your applications.For example,
        // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
        // to active whenever 'contacts.list' or one of its decendents is active.
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
      }
    ]);

  var PouchDBService = require('./shell/services/PouchDBService');
  var ActivityDataService = require('./shell/services/ActivityDataService');
  var ActivityService = require('./shell/services/ActivityService');

  var ModuleProvider = require('./scripts/ModuleProvider');
  var ShellController = require('./shell/controllers/ShellController');

  // hint: has to initialize modules here, otherwise controller objects are not found :(
  ModuleProvider.loadModules();

  angular.module('boilerplateApp').provider('modules', [ModuleProvider]);

  angular.module('boilerplateApp').service('PouchDBService', [PouchDBService]);
  angular.module('boilerplateApp').service('ActivityDataService', ['PouchDBService', ActivityDataService]);
  angular.module('boilerplateApp').service('ActivityService', ['ActivityDataService', ActivityService]);

  angular.module('boilerplateApp').controller('ShellController', ['$scope', '$log', '$q', '$mdSidenav', '$notification', '$mdToast', 'modules', 'ActivityService', ShellController]);

})(global.angular);
