(function() {

  'use strict';

  angular.module('boilerplateApp').service('PouchDBService', [PouchDBService]);

  function PouchDBService() {

    // initialize pouch db adapter
    var PouchDB = require('pouchdb');
    PouchDB.plugin(require('geopouch'));
    PouchDB.plugin(require('pouchdb-find'));
    PouchDB.plugin(require('pouchdb-quick-search'));
    PouchDB.plugin(require('transform-pouch'));
    PouchDB.plugin(require('pouchdb-auth'));

    PouchDB.adapter('socket', require('socket-pouch/client'));

    var adapter;

    try {
      adapter = require('leveldown');
    } catch(err) {
      console.log('leveldown-adapter not working, fallback to level.js (IndexedDB)');
      adapter = require('level-js');
    }

    function DataService(dbName) {

      var remote = require('remote');
      var app = remote.require('app');
      var sysCfg = app.sysConfig();

      var _db = new PouchDB(dbName, { db: adapter, prefix: sysCfg.paths.data });

      return {

        instance: function() {
          return _db;
        }
      };
    }

    return {

      initialize: function(dbName) {
        return new DataService(dbName).instance();
      }
    };
  }

})();
