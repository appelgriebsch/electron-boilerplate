(function(angular) {

  'use strict';

  function TodoModule(config) {

    var moduleConfig = config;

    angular.module('boilerplateApp')
      .config(function($stateProvider, $urlRouterProvider) {

        $stateProvider
          .state(`${moduleConfig.state}`, {
            url: '/todo',
            views: {
              'module': {
                templateUrl: `${moduleConfig.path}/todo.html`
              },
              'header@app': {
                template: `${moduleConfig.label}`
              }
            }
          })
          .state(`${moduleConfig.state}.view`, {
            url: '/view',
            views: {
              'content': {
                templateUrl: `${moduleConfig.path}/views/todo.view.html`,
                controller: 'TodoViewController as ctl'
              },
              'actions@app': {
                templateUrl: `${moduleConfig.path}/views/todo.actions.html`
              }
            }
          });
      });

    var TodoDataService = require('./services/TodoDataService');
    var TodoViewController = require('./controllers/TodoViewController');
    
    angular.module('boilerplateApp').service('TodoDataService', ['PouchDBService', TodoDataService]);    
    angular.module('boilerplateApp').controller('TodoViewController', ['$scope', '$state', '$q', 'TodoDataService', TodoViewController]);
  }

  module.exports = TodoModule;

})(global.angular);
