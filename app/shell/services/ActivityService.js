(function (angular) {
  'use strict'
  /**
   * ActivityService - description
   *
   * @param  {type} ActivityDataService description
   * @return {type}                     description
   */
  function ActivityService (ActivityDataService) {
    var app = require('electron').remote.app
    var sysCfg = app.sysConfig()
    /**
     * _prefill function - description
     *
     * @param  {type} event description
     * @return {type}       description
     */
    var _prefill = function (event) {
      var today = new Date()
      event.endTime = today.toISOString()
      event.agent = {
        name: sysCfg.user
      }
      event.instrument = {
        name: sysCfg.host
      }
    }
    /**
     * initialize function - description
     *
     * @return {type}  description
     */
    this.initialize = function () {
      ActivityDataService.initialize().then(() => {
        var event = ActivityDataService.createFromTemplate('ControlAction', 'flight_takeoff')
        event.description = 'Application has been started.'
        delete event.result
        delete event.object
        return this.addWarning(event)
      })
    }
    /**
     * createEventFromTemplate function - description
     *
     * @param  {type} template description
     * @param  {type} icon     description
     * @param  {type} error    description
     * @return {type}          description
     */
    this.createEventFromTemplate = function (template, icon, error) {
      return ActivityDataService.createFromTemplate(template, icon, error)
    }
    /**
     * close function - description
     *
     * @return {type}  description
     */
    this.close = function () {
      var event = ActivityDataService.createFromTemplate('ControlAction', 'flight_land')
      event.description = 'Application has been stopped.'
      delete event.result
      delete event.object
      return this.addWarning(event)
    }
    /**
     * addInfo function - description
     *
     * @param  {type} event description
     * @return {type}       description
     */
    this.addInfo = function (event) {
      _prefill(event)
      return ActivityDataService.writeEntry('info', event)
    }
    /**
     * addWarning function - description
     *
     * @param  {type} event description
     * @return {type}       description
     */
    this.addWarning = function (event) {
      _prefill(event)
      return ActivityDataService.writeEntry('warning', event)
    }
    /**
     * addError function - description
     *
     * @param  {type} event description
     * @return {type}       description
     */
    this.addError = function (event) {
      _prefill(event)
      return ActivityDataService.writeEntry('danger', event)
    }
  }
  module.exports = ActivityService
})(global.angular)
