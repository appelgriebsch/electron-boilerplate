(function() {

  'use strict';

  var childProcess = require('child_process');

  // Tell the 'npm install' which is about to start that we want for it
  // to compile for Electron.
  process.env.npm_config_disturl = "https://atom.io/download/atom-shell";
  process.env.npm_config_target = "0.32.3";

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
