// @flow

import fs from 'fs'
import path from 'path'

class PluginManager {

  pluginFolder:string

  constructor(pluginFolder:string) {
    this.pluginFolder = pluginFolder
  }

  getRegisteredPlugins() {
    let plugins = [];
    try {
      fs.readdirSync(this.pluginFolder).map((plugin) => {
        const p = this.tryLoadPlugin(plugin)
        if (p) {
          plugins.push(p)
        }
      });
    } catch(ex) {
      console.log(ex)
    }
    return plugins;
  }

  tryLoadPlugin(plugin:string) : ?Object {
    let plugInInfo: ?Object
    try {
      plugInInfo = require(path.join(this.pluginFolder, plugin))
      plugInInfo.module = require(path.join(this.pluginFolder, plugin, '/package.json'))
      console.log(plugInInfo)
    } catch(ex) {
      console.log(ex)
      plugInInfo = undefined
    }
    return plugInInfo
  }
}

export default PluginManager
