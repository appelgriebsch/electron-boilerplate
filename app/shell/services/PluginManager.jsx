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
    let id = 0;
    try {
      fs.readdirSync(this.pluginFolder).map((plugin) => {
        const p = this.tryLoadPlugin(plugin)
        if (p) {
          // p._id = id;
          plugins.push(p)
          // id++;
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

  deleteFolderRecursive(pluginPath) {
    var deleteSubDir = function(file,index){
        var curPath = path.join(pluginPath, '\\', file)
        if(fs.lstatSync(curPath).isDirectory()) { // recurse
          this.deleteFolderRecursive(curPath);
        } else { // delete file
          fs.unlinkSync(curPath);
        }
      }
    if( fs.existsSync(pluginPath) ) {
      fs.readdirSync(pluginPath).forEach(deleteSubDir, this)
      fs.rmdirSync(pluginPath)
    }
  }
}

export default PluginManager
