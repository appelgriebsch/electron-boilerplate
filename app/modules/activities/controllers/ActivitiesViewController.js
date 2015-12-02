(function() {

  'use strict';

  function ActivitiesViewController($scope, $state, $q, ActivityDataService) {

    this.events = [];

    this.initialize = function() {

      var init = [ActivityDataService.initialize()];

      Promise.all(init).then(() => {
        return ActivityDataService.events();
      }).then((events) => {
        events.rows.map((event) => {
          var doc = event.doc;
          $q.when(true).then(() => {
            var direction = (this.events.length % 2 == 0 ? 'left' : 'right');
            doc.direction = direction;
            this.events.push(doc);
          });
        });
      });
    };
  }

  module.exports = ActivitiesViewController;

})();
