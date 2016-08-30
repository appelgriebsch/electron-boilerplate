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
    return plugins
  }

  deletePlugin(plugin:string) {
    console.log(path.join(this.pluginFolder, plugin))
    this.deleteFolderRecursive(path.join(this.pluginFolder, plugin))
  }

  tryLoadPlugin(plugin:string) : ?Object {
    let plugInInfo: ?Object
    try {
      plugInInfo = require(path.join(this.pluginFolder, plugin))
      plugInInfo.location = plugin
      plugInInfo.module = require(path.join(this.pluginFolder, plugin, '/package.json'))
      console.log(plugInInfo)
    } catch(ex) {
      console.log(ex)
      plugInInfo = undefined
    }
    return plugInInfo
  }

  deleteFolderRecursive(path) {
    if( fs.existsSync(path) ) {
      fs.readdirSync(path).forEach(function(file,index){
        var curPath = path + "/" + file;
        if(fs.lstatSync(curPath).isDirectory()) { // recurse
          deleteFolderRecursive(curPath);
        } else { // delete file
          fs.unlinkSync(curPath);
        }
      })
      fs.rmdirSync(path);
    }
  }

}

export default PluginManager
