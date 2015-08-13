(function() {

  'use strict';

  var app = require('app');
  var BrowserWindow = require('browser-window');

  // report crashes to the Electron project
  require('crash-reporter').start();

  // adds debug features like hotkeys for triggering dev tools and reload
  require('electron-debug')();

  // initialize pouch db adapter
  var PouchDB = require('pouchdb');
  PouchDB.plugin(require('geopouch'));
  PouchDB.plugin(require('pouchdb-find'));
  PouchDB.plugin(require('pouchdb-quick-search'));
  PouchDB.plugin(require('transform-pouch'));

  // initialize service finder module
  var ServiceFinder = require('./libs/ServiceFinder');

  // create main application window
  function createMainWindow () {

    var win = new BrowserWindow({
  		width: 600,
  		height: 400,
  		resizable: true
  	});

  	win.loadUrl('file://' + __dirname + '/index.html');
  	win.on('closed', onClosed);

  	return win;
  }

  function onClosed() {
  	// deref the window
  	// for multiple windows store them in an array
  	mainWindow = null;
  }

  // prevent window being GC'd
  var mainWindow;

  app.on('window-all-closed', function () {
  	if (process.platform !== 'darwin') {
  		app.quit();
  	}
  });

  app.on('activate-with-no-open-windows', function () {
  	if (!mainWindow) {
  		mainWindow = createMainWindow();
  	}
  });

  app.on('ready', function () {
  	mainWindow = createMainWindow();
  });

  app.serviceFinder = function(serviceName, protocol, subTypes, includeLocal) {
    return new ServiceFinder(serviceName, protocol, subTypes, includeLocal);
  };

  app.hostname = function() {
    var os = require('os');
    return os.hostname();
  };

  app.username = function() {
    if (process.platform === 'win32') {
      return process.env.USERNAME;
    }
    else {
      return process.env.USER;
    }
  };

  app.pouchDB = function (dbName) {
    var path = require('path');
    var userDataDir = app.getPath('userData') + path.sep;
    var opts = {
      prefix: userDataDir
    };
    return new PouchDB(dbName, opts);
  };

})();
