(function() {

  'use strict';

  function PouchDBService() {

    // initialize pouch db adapter
    var PouchDB = require('pouchdb/lib/index-browser');
    PouchDB.plugin(require('pouchdb-find'));
    PouchDB.plugin(require('pouchdb-quick-search'));

    var settings = { adapter: 'idb', storage: 'persistent' };

    function DataService(dbName) {

      var promise = new Promise((resolve, reject) => {

        new PouchDB(dbName, settings)
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
      });

      return promise;
    }

    return {

      initialize: function(dbName) {
        return new DataService(dbName);
      }
    };
  }

  module.exports = PouchDBService;

})();
