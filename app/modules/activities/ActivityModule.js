(function(angular) {

  'use strict';

  function ActivityModule(config) {

    var moduleConfig = config;

    angular.module('boilerplateApp')
      .config(function($stateProvider, $urlRouterProvider) {

        $stateProvider
          .state(`${moduleConfig.state}`, {
            url: '/activities',
            views: {
              'module': {
                templateUrl: `${moduleConfig.path}/activities.html`
              }
            }
          })
          .state(`${moduleConfig.state}.view`, {
            url: '/view',
            views: {
              'content': {
                templateUrl: `${moduleConfig.path}/views/activities.view.html`,
                controller: 'ActivitiesViewController as ctl'
              }
            }
          });
      });

    var ActivitiesViewController = require('./controllers/ActivitiesViewController');
    angular.module('boilerplateApp').controller('ActivitiesViewController', ['$scope', '$state', '$q', 'ActivityDataService', ActivitiesViewController]);
  }

  module.exports = ActivityModule;

})(global.angular);
