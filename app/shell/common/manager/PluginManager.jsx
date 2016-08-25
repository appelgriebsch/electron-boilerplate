"use strict";

import fs from 'fs';
import path from 'path';

var PluginManager = exports;

PluginManager.getRegisteredPlugins = function () {
  return fs.readdirSync(path.resolve('app/plugins'));
}

/*PluginManager.registerNewPlugin = function(plugin) {
  DatabaseApi.savePlugin(plugin);
}*/
