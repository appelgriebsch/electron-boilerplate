(function () {
  'use strict'
  /**
   * RDFStoreService - description
   *
   * @return {type}  description
   */
  function RDFStoreService () {

    var rdfStore = require('rdfStore')
    /**
     * DataService - description
     *
     * @param  {type} dbName description
     * @return {type}        description
     */
    function DataService (dbName) {
      var promise = new Promise((resolve, reject) => {
        rdfStore.Store({ persistent: true, name: dbName })
        .then((result) => {
          resolve(result)
        })
        .catch((err) => {
          console.log(err)
          reject(err)
        })
      })
      return promise
    }
    return {
      /**
       * initialize function - description
       *
       * @param  {type} dbName description
       * @return {type}        description
       */
      initialize: function (dbName) {
        return new DataService(dbName)
      }
    }
  }
  module.exports = RDFStoreService
})()
