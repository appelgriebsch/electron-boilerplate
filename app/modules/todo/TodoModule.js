(function(angular) {

  'use strict';

  function TodoModule(config) {

    var moduleConfig = config;

    angular.module('electron-app')
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
          })
          .state(`${moduleConfig.state}.view.itemSelected`, {
            url: '/itemSelected/:doc',
            views: {
              'status@app': {
                templateUrl: `${moduleConfig.path}/views/todo.view.status.html`,
                controller: 'TodoViewStatusController as ctl'
              }
            }
          });
      });

    var TodoDataService = require('./services/TodoDataService');
    var TodoViewController = require('./controllers/TodoViewController');
    var TodoViewStatusController = require('./controllers/TodoViewStatusController');

    angular.module('electron-app').service('TodoDataService', ['PouchDBService', TodoDataService]);
    angular.module('electron-app').controller('TodoViewController', ['$scope', '$state', '$q', '$mdDialog', 'TodoDataService', TodoViewController]);
    angular.module('electron-app').controller('TodoViewStatusController', ['$scope', '$state', '$stateParams', '$q', 'TodoDataService', TodoViewStatusController]);
  }

  module.exports = TodoModule;

})(global.angular);
