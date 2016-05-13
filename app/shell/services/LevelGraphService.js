(function() {

  'use strict';

  function LevelGraphService() {

    // initialize levelgraph db adapter
    var Level = require('level');
    var LevelGraph = require('levelgraph');
    var LevelN3 = require('levelgraph-n3');
    var LevelJSONLD = require ('levelgraph-jsonld');

    var path = require('path');
    var app = require('electron').remote.app;
    var sysCfg = app.sysConfig();

    function DataService(dbName) {

      var db = new Level(path.join(sysCfg.paths.data, dbName));
      var lDB = LevelN3(LevelJSONLD(LevelGraph(db)));
      return lDB;
    }

    return {

      initialize: function(dbName) {
        return new DataService(dbName);
      }
    };
  }

  module.exports = LevelGraphService;

})();
