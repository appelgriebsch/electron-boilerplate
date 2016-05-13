(function(angular) {

  'use strict';

  function ShellController($scope, $log, $q, $mdSidenav, $mdToast, modulesProvider, ActivityService) {

    var app = require('electron').remote.app;
    var appCfg = app.sysConfig();

    this.appName = `${appCfg.app.name} v${appCfg.app.version}`;
    this.modules = [];
    this.isBusy = false;
    this.statusMessage = '';
    this.isDirty = false;
    this.fabOpen = false;

    $scope.setBusy = (msg) => {
      $q.when(true).then(() => {
        this.isBusy = true;
        this.statusMessage = msg;
        this.isDirty = false;
      });
    };

    $scope.setReady = (dirty) => {
      $q.when(true).then(() => {
        this.isBusy = false;
        this.statusMessage = '';
        this.isDirty = dirty;
      });
    };

    $scope.notify = (title, message) => {

      $mdToast.show({
        template: `<md-toast><span flex>${message}</span></md-toast>`,
        position: 'bottom right',
        hideDelay: 2000
      });
    };

    $scope.createEventFromTemplate = (template, icon, error) => {
      return ActivityService.createEventFromTemplate(template, icon, error);
    };

    $scope.setError = (template, icon, error) => {
      $scope.notify('An error occured!', error.message);

      console.log(error);

      var info = $scope.createEventFromTemplate(template, icon, error);
      return $scope.writeLog('error', info);
    };

    $scope.writeLog = (type, info) => {

      var result;

      switch (type) {
      case 'info':
        result = ActivityService.addInfo(info);
        break;

      case 'warning':
        result = ActivityService.addWarning(info);
        break;

      case 'error':
        result = ActivityService.addError(info);
        break;
      }

      return result;
    };

    this.initialize = function() {
      this.modules = modulesProvider.modules;
      return Promise.all([
        ActivityService.initialize()
      ]);
    };

    this.toggleFullscreen = function() {
      app.toggleFullscreen();
    };

    this.platform = function() {
      return appCfg.platform;
    };

    this.minimizeApp = function() {
      app.minimizeAppToSysTray();
    };

    this.closeApp = function() {
      ActivityService.close().then(() => {
        app.close();
      });
    };

    this.sendEvent = (event, arg) => {
      $q.when(true).then(() => {
        $scope.$broadcast(event, arg);
      });
    };

    this.toggleSidebar = function() {
      var pending = $q.when(true);
      pending.then(() => {
        $mdSidenav('sidebar').toggle();
      });
    };
  }

  module.exports = ShellController;

})(global.angular);
