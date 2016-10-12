// @flow

import fs from 'original-fs'
import path from 'path'

/** PluginManager includes a set of api methods. */
class PluginManager {

  pluginFolder:string

  /**
   * Represents a PluginManager.
   * Checks if the plugins folder path exists and creates a new plugins folder otherwise.
   * @constructor
   * @param {string} pluginFolder - path to the plugins folder
   */
  constructor(pluginFolder:string) {
    this.pluginFolder = pluginFolder
    // this.pluginFolder = path.join(__dirname, '../../../', 'plugins')
    if(!fs.existsSync(this.pluginFolder) ) {
      console.log("Plugins folder doesn't exist. Creating folder");
      fs.mkdirSync(this.pluginFolder, err => {
        if(err)
        {
          alert('Error creating plugins folder ' + err)
          console.log('Error creating plugins folder ' + err)
        }
        console.log('created plugins folder ' + path.join(__dirname, '../../../../', 'plugins'));
      })
    }
  }

/** Iterates over all the plugins in the plugins folder, loads and returns the plugins list. */
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

  installPlugin (pluginPath:string, name:string) {
    if(fs.lstatSync(pluginPath).isDirectory())
      console.log('Cannot process directories');
     else
      fs.createReadStream(pluginPath).pipe(fs.createWriteStream(path.join(this.pluginFolder,name)))
  }

/**
 * Deletes the plugin.
 * @param {string} plugin - path of the plugin to be deleted.
*/
  deletePlugin(plugin:string) {
    const pluginPath = path.join(this.pluginFolder, plugin)
    console.log(pluginPath)
    if(pluginPath.includes('asar'))
      fs.unlinkSync(pluginPath)
    else
      this.deleteFolderRecursive(path.join(this.pluginFolder, plugin))
  }

  tryLoadPlugin(plugin:string) : ?Object {
    let plugInInfo: ?Object
    try {
      plugInInfo = require(path.join(this.pluginFolder, plugin))
      plugInInfo.location = plugin
      console.log(path.join(this.pluginFolder, plugin, '/package.json'))
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
