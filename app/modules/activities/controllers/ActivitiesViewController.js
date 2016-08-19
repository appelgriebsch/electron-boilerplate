(function () {
  'use strict'
  /**
  * ActivitiesViewController - description
   *
   * @param  {type} $scope              description
   * @param  {type} $state              description
   * @param  {type} $q                  description
   * @param  {type} ActivityDataService description
   * @return {ActivitiesViewController} description
   */
  function ActivitiesViewController ($scope, $state, $q, ActivityDataService) {
    /**
     *
     */
    this.events = []
    /**
     * initialize function - description
     *
     * @return {Promise}  description
     */
    this.initialize = function () {
      var init = [ActivityDataService.initialize()]
      Promise.all(init).then(() => {
        return ActivityDataService.events()
      }).then((events) => {
        events.rows.map((event) => {
          var doc = event.doc
          $q.when(true).then(() => {
            var direction = (this.events.length % 2 === 0 ? 'left' : 'right')
            doc.direction = direction
            this.events.push(doc)
          })
        })
      })
    }
  }
  module.exports = ActivitiesViewController
})()
