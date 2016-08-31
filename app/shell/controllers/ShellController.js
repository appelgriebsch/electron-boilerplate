(function (angular) {
  'use strict'
  /**
   * ShellController - description
   *
   * @param  {type} $scope          description
   * @param  {type} $log            description
   * @param  {type} $q              description
   * @param  {type} $mdSidenav      description
   * @param  {type} modulesProvider description
   * @param  {type} ActivityService description
   * @return {type}                 description
   */
  function ShellController ($scope, $log, $q, $mdSidenav, modulesProvider, ActivityService) {
    var app = require('electron').remote.app
    var notifier = require('electron-notifications')
    var appCfg = app.sysConfig()
    /**
     *
     */
    this.appName = `${appCfg.app.name} v${appCfg.app.version}`
    /**
     *
     */
    this.modules = []
    /**
     *
     */
    this.isBusy = false
    /**
     *
     */
    this.statusMessage = ''
    /**
     *
     */
    this.isDirty = false
    /**
     *
     */
    this.fabOpen = false
    /**
     *
     */
    $scope.setBusy = (msg) => {
      $q.when(true).then(() => {
        this.isBusy = true
        this.statusMessage = msg
        this.isDirty = false
      })
    }
    /**
     *
     */
    $scope.setReady = (dirty) => {
      $q.when(true).then(() => {
        this.isBusy = false
        this.statusMessage = ''
        this.isDirty = dirty
      })
    }
    /**
     *
     */
    $scope.notify = (title, message) => {
      $q.when(true).then(() => {
        notifier.notify(title, {
          message: message,
          icon: appCfg.app.icon
        })
      })
    }
    /**
     *
     */
    $scope.createEventFromTemplate = (template, icon, error) => {
      return ActivityService.createEventFromTemplate(template, icon, error)
    }
    /**
     *
     */
    $scope.setError = (template, icon, error) => {
      $scope.notify('An error occured!', error.message)
      console.log(error)
      var info = $scope.createEventFromTemplate(template, icon, error)
      return $scope.writeLog('error', info)
    }
    /**
     *
     */
    $scope.writeLog = (type, info) => {
      var result
      switch (type) {
        case 'info':
          result = ActivityService.addInfo(info)
          break
        case 'warning':
          result = ActivityService.addWarning(info)
          break
        case 'error':
          result = ActivityService.addError(info)
          break
      }
      return result
    }
    /**
     * initialize function - description
     *
     * @return {type}  description
     */
    this.initialize = function () {
      this.modules = modulesProvider.modules
      return Promise.all([
        ActivityService.initialize()
      ])
    }
    /**
     * toggleFullscreen function - description
     *
     * @return {type}  description
     */
    this.toggleFullscreen = function () {
      app.toggleFullscreen()
    }
    /**
     * platform function - description
     *
     * @return {type}  description
     */
    this.platform = function () {
      return appCfg.platform
    }
    /**
     * minimizeApp function - description
     *
     * @return {type}  description
     */
    this.minimizeApp = function () {
      app.minimizeAppToSysTray()
    }
    /**
     * closeApp function - description
     *
     * @return {type}  description
     */
    this.closeApp = function () {
      ActivityService.close().then(() => {
        app.close()
      })
    }
    /**
     * sendEvent function - description
     */
    this.sendEvent = (event, arg) => {
      $q.when(true).then(() => {
        $scope.$broadcast(event, arg)
      })
    }
    /**
     * toggleSidebar function - description
     *
     * @return {type}  description
     */
    this.toggleSidebar = function () {
      var pending = $q.when(true)
      pending.then(() => {
        $mdSidenav('sidebar').toggle()
      })
    }
  }
  module.exports = ShellController
})(global.angular)
