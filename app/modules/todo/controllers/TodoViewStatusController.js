(function (angular) {
  'use strict'
  /**
   * TodoViewStatusController - description
   *
   * @param  {type} $scope          description
   * @param  {type} $state          description
   * @param  {type} $stateParams    description
   * @param  {type} $q              description
   * @param  {type} TodoDataService description
   * @return {type}                 description
   */
  function TodoViewStatusController ($scope, $state, $stateParams, $q, TodoDataService) {
    var docID = $stateParams.doc
    var appCfg = require('electron').remote.app.sysConfig()
    /**
     *
     */
    this.todo
    /**
     * initialize function - description
     *
     * @return {Promise}  description
     */
    this.initialize = function () {
      var init = [TodoDataService.initialize()]
      Promise.all(init).then(() => {
        return TodoDataService.get(docID)
      }).then((result) => {
        $q.when(true).then(() => {
          result.user = result.user || appCfg.user
          this.todo = result
        })
      }).catch((err) => {
        $scope.setError('AddAction', 'assignment', err)
        $scope.setReady(true)
      })
    }
  }
  module.exports = TodoViewStatusController
})(global.angular)
