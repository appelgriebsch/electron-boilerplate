(function() {

  'use strict';

  const electron = require('electron');
  const app = electron.app;

  const path = require('path');
  const os = require('os');

  const BrowserWindow = electron.BrowserWindow;
  const Tray = electron.Tray;

  // initialize service finder module
  const ServiceFinder = require('node-servicefinder').ServiceFinder;

  const appName = app.getName();
  const appVersion = app.getVersion();
  const dataDir = app.getPath('userData') + path.sep;
  const cacheDir = app.getPath('userCache') + path.sep;
  const tempDir = app.getPath('temp') + path.sep;
  const homeDir = app.getPath('home') + path.sep;
  const hostname = os.hostname();
  const username = (process.platform === 'win32') ? process.env.USERNAME : process.env.USER;

  // report crashes to the Electron project
  // require('crash-reporter').start();

  // adds debug features like hotkeys for triggering dev tools and reload
  require('electron-debug')();

  process.on('uncaughtException', onCrash);

  // create main application window
  function createMainWindow() {

    var win = new BrowserWindow({
      width: 1280,
      height: 800,
      frame: false
    });

    win.loadURL('file://' + __dirname + '/main.html');
    win.on('closed', onClosed);
    win.webContents.on('crashed', onCrash);
    win.on('unresponsive', onCrash);
    return win;
  }

  function onClosed() {
    // deref the window
    // for multiple windows store them in an array
    mainWindow = null;
  }

  function onCrash(exc) {
    console.log(exc);
  }

  var handleStartupEvent = function() {

    if (process.platform !== 'win32') {
      return false;
    }

    var cp = require('child_process');
    var path = require('path');
    var updateDotExe = path.resolve(path.dirname(process.execPath), '..', 'update.exe');
    var target = path.basename(process.execPath);

    var squirrelCommand = process.argv[1];
    switch (squirrelCommand) {
    case '--squirrel-install':
    case '--squirrel-updated':

      // Optionally do things such as:
      //
      // - Install desktop and start menu shortcuts
      // - Add your .exe to the PATH
      // - Write to the registry for things like file associations and
      //   explorer context menus

      // create shortcuts
      cp.spawnSync(updateDotExe, ['--createShortcut', target], {
        detached: true
      });

      // Always quit when done
      app.quit();
      return true;

    case '--squirrel-uninstall':
      // Undo anything you did in the --squirrel-install and
      // --squirrel-updated handlers

      cp.spawnSync(updateDotExe, ['--removeShortcut', target], {
        detached: true
      });

      // Always quit when done
      app.quit();
      return true;

    case '--squirrel-obsolete':
      // This is called on the outgoing version of your app before
      // we update to the new version - it's the opposite of
      // --squirrel-updated
      app.quit();
      return true;
    }
  };

  // check if we are being called by insaller routine
  if (handleStartupEvent()) {
    return;
  }

  // prevent window being GC'd
  var mainWindow;
  var trayIcon;

  app.on('activate', function() {
    if (!mainWindow) {
      mainWindow = createMainWindow();
    }
  });

  app.on('ready', function() {
    mainWindow = createMainWindow();

    const isDev = require('electron-is-dev');
    if (isDev) {
      const devToolsPath = path.join(__dirname, '..', 'devTools', 'batarang');    
      BrowserWindow.addDevToolsExtension(devToolsPath);
    }
  });

  app.serviceFinder = function(serviceName, protocol, subTypes, includeLocal) {
    return new ServiceFinder(serviceName, protocol, subTypes, includeLocal);
  };

  app.sysConfig = function() {
    return {
      app: {
        name: appName,
        version: appVersion
      },
      host: hostname,
      platform: process.platform,
      user: username,
      paths: {
        home: homeDir,
        temp: tempDir,
        data: dataDir,
        cache: cacheDir
      }
    };
  };

  app.getMainWindow = function() {
    return mainWindow;
  };

  app.close = function() {
    if (mainWindow) {
      mainWindow.close();
    }
    app.quit();
  };

  app.toggleFullscreen = function() {
    if (mainWindow) {
      mainWindow.setFullScreen(!mainWindow.isFullScreen());
    }
  };

  app.minimizeAppToSysTray = function() {

    trayIcon = new Tray(path.join(__dirname, 'assets', 'boilerplate_tray.png'));
    trayIcon.setToolTip('App is running in background mode.');
    trayIcon.on('click', () => {
      if (mainWindow) {
        mainWindow.show();
        trayIcon.destroy();
      }
    });
    if (mainWindow) {
      mainWindow.hide();
    }
  };

})();
