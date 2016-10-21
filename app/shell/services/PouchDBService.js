(function () {
  'use strict'
  /**
   * PouchDBService - description
   *
   * @return {type}  description
   */
  function PouchDBService () {
    // initialize pouch db adapter
    var PouchDB = require('pouchdb-browser')
    PouchDB.plugin(require('pouchdb-find'))
    PouchDB.plugin(require('pouchdb-quick-search'))
    var settings = { adapter: 'idb', storage: 'persistent' }
    /**
     * DataService - description
     *
     * @param  {type} dbName description
     * @return {type}        description
     */
    function DataService (dbName) {
      var promise = new Promise((resolve, reject) => {
        var result = PouchDB(dbName, settings);
        resolve(result)
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
  module.exports = PouchDBService
})()
