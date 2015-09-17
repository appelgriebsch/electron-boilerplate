(function() {

  'use strict';

  var childProcess = require('child_process');
  var nconf = require('nconf');

  nconf.file('../build-env.json');

  var electron_disturl = nconf.get('electron:disturl');
  var electron_version = nconf.get('electron:version');

  // Tell the 'npm install' which is about to start that we want for it
  // to compile for Electron.
  process.env.npm_config_disturl = electron_disturl;
  process.env.npm_config_target = electron_version;

  var params = ['install'];

  // Maybe there was name of package user wants to install passed as a parameter.
  if (process.argv.length > 2) {
    params.push(process.argv[process.argv.length - 1]);
    params.push('--save');
  }

  var installCommand = null;

  if (process.platform === 'win32') {
    process.env.npm_config_arch = 'ia32';      // currently only x86 binaries on Windows supported
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
