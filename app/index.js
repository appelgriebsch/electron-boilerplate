(function() {

  'use strict';

  var app = require('app');
  var BrowserWindow = require('browser-window');

  // report crashes to the Electron project
  require('crash-reporter').start();

  // adds debug features like hotkeys for triggering dev tools and reload
  require('electron-debug')();

  // initialize service finder module
  var ServiceFinder = require('node-servicefinder').ServiceFinder;

  // create main application window
  function createMainWindow() {

    var win = new BrowserWindow({
      width: 600,
      height: 400,
      resizable: true
    });

    win.loadUrl('file://' + __dirname + '/main.html');
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

  app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate-with-no-open-windows', function() {
    if (!mainWindow) {
      mainWindow = createMainWindow();
    }
  });

  app.on('ready', function() {
    mainWindow = createMainWindow();
  });

  var path = require('path');
  var os = require('os');

  const dataDir = app.getPath('userData') + path.sep;
  const cacheDir = app.getPath('userCache') + path.sep;
  const tempDir = app.getPath('temp') + path.sep;
  const homeDir = app.getPath('home') + path.sep;
  const hostname = os.hostname();
  const username = (process.platform === 'win32') ? process.env.USERNAME : process.env.USER;

  app.serviceFinder = function(serviceName, protocol, subTypes, includeLocal) {
    return new ServiceFinder(serviceName, protocol, subTypes, includeLocal);
  };

  app.sysConfig = function() {
    return {
      host: hostname,
      user: username,
      paths: {
        home: homeDir,
        temp: tempDir,
        data: dataDir,
        cache: cacheDir
      }
    };
  };

})();
