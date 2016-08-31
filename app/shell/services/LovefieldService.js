(function () {
  'use strict'
  /**
   * LovefieldService - description
   *
   * @return {type}  description
   */
  function LovefieldService () {

    var lf = require('lovefield')

    return {
      /**
       * initialize function - description
       *
       * @param  {type} dbName description
       * @return {type}        description
       */
      initialize: function (dbName) {
        return lf.schema.create(dbName);
      }
    }
  }
  module.exports = LovefieldService
})()
