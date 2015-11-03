(function() {

  'use strict';

  var os = require('os');
  var path = require('path');
  var childProcess = require('child_process');
  var nconf = require('nconf');

  nconf.use('file', { file: path.join(__dirname, '../build-env.json') });

  var electron_cfg = nconf.get('electron');
  var electron_disturl = electron_cfg.disturl;
  var electron_version = electron_cfg.version;

  // Tell the 'npm install' which is about to start that we want for it
  // to compile for Electron.
  process.env.npm_config_disturl = electron_disturl;
  process.env.npm_config_target = electron_version;
  process.env.npm_config_runtime = 'electron';
  process.env.npm_config_arch = os.arch();

  var params = ['install'];

  // Maybe there was name of package user wants to install passed as a parameter.
  if (process.argv.length > 2) {
    params.push(process.argv[process.argv.length - 1]);
    params.push('--save');
  }

  var installCommand = null;

  if (process.platform === 'win32') {
    installCommand = 'npm.cmd';
  } else {
    installCommand = 'npm';
  }

  var install = childProcess.spawn(installCommand, params, {
    cwd: __dirname + '/../app',
    env: process.env,
    stdio: 'inherit'
  });

})();
