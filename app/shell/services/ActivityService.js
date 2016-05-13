(function(angular) {

  'use strict';

  function ActivityService(ActivityDataService) {

    var app = require('electron').remote.app;
    var sysCfg = app.sysConfig();

    var _prefill = function(event) {

      var today = new Date();

      event.endTime = today.toISOString();
      event.agent = {
        name: sysCfg.user
      };
      event.instrument = {
        name: sysCfg.host
      };
    };

    this.initialize = function() {

      ActivityDataService.initialize().then(() => {
        var event = ActivityDataService.createFromTemplate('ControlAction', 'flight_takeoff');
        event.description = 'Application has been started.';

        delete event.result;
        delete event.object;
        return this.addWarning(event);
      });
    };

    this.createEventFromTemplate = function(template, icon, error) {
      return ActivityDataService.createFromTemplate(template, icon, error);
    };

    this.close = function() {
      var event = ActivityDataService.createFromTemplate('ControlAction', 'flight_land');
      event.description = 'Application has been stopped.';

      delete event.result;
      delete event.object;
      return this.addWarning(event);
    };

    this.addInfo = function(event) {
      _prefill(event);
      return ActivityDataService.writeEntry('info', event);
    };

    this.addWarning = function(event) {
      _prefill(event);
      return ActivityDataService.writeEntry('warning', event);
    };

    this.addError = function(event) {
      _prefill(event);
      return ActivityDataService.writeEntry('danger', event);
    };
  }

  module.exports = ActivityService;

})(global.angular);
