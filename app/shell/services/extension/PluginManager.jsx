// @flow

import fs from 'original-fs'
import path from 'path'
import uri from 'url'
import PouchDB from 'pouchdb-browser'

import SettingsManager from './SettingsManager'
import PluginActions from '../routing/actions/PluginActions'

/** PluginManager includes a set of api methods. */
class PluginManager {

  pluginFolder:string
  PluginControls: PluginActions
  ConfigDb: PouchDB
  dbName: string
  config: Object

  /**
  * Represents a PluginManager.
  * Checks if the plugins folder path exists and creates a new plugins folder otherwise.
  * @constructor
  * @param {string} pluginFolder - path to the plugins folder
  */
  constructor(pluginFolder:string, pluginControls: PluginActions) {
    this.dbName = 'PluginConfig'
    this.config = {}
    this.pluginFolder = pluginFolder
    this.PluginControls = pluginControls
    this.installPlugin = this.installPlugin.bind(this)
    this.uninstallPlugin = this.uninstallPlugin.bind(this)
    this.ConfigDb = new PouchDB(this.dbName, {
      adapter: 'idb',
      storage: 'persistent'
    })
    this.readConfiguration().then((config) => {
      console.log('After initial read of the config from db ' + JSON.stringify(this.config));
      this.config = config
      this.performCleanUp()
    }).catch((err) => {
      console.log(err)
      if(err.status == 404) {
        console.log('Initializing database configuration for first use')
        this.saveInitalConfiguration().then((result) => {
          console.log('Initialized the configuration for first use')
        })
        .catch((err) => {
          console.log('Error in initializing app for first use')
        })
      }
      else {
        console.log('Error with the db ' + err);
      }
    })
  }

  /** Iterates over all the plugins in the plugins folder, loads and returns the plugins list. */
  getRegisteredPlugins() {
    let plugins = [];
    let id = 0;
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
    plugins.push({
      path: 'settings',
      component: SettingsManager,
      root: uri.parse(__dirname),
      location: '../../..',
      module: {
        name: 'Settings',
        description: 'Maintain application settings',
        config: {
          label: 'Settings',
          icon: 'settings',
          banner: 'assets/settings.png',
          removable: false
        }
      },
      'installPlugin': this.installPlugin,
      'uninstallPlugin': this.uninstallPlugin
    })
    return plugins
  }

  saveInitalConfiguration () {
    var p = new Promise((resolve, reject) => {
      this.config = {
        _id: 'pluginConfig',
        "pluginsToDelete": [],
        "uninstalledPlugins":[],
        "disabledPlugins":[]
      }
      this.ConfigDb.put(this.config)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        console.log('error in initializing for first time');
        reject(err)
      })
    })
    return p
  }

  saveConfiguration () {
    var p = new Promise((resolve, reject) => {
      this.ConfigDb.get('pluginConfig')
      .then((pluginConfig) => {
        this.config._rev = pluginConfig._rev
        return this.ConfigDb.put(this.config)
        .catch((err) => {
          console.log('Error in saving the configuration' + err);
        })
      })
    })
    return p
  }

  readConfiguration () {
    var p = new Promise((resolve, reject) => {
      this.ConfigDb.get('pluginConfig')
      .then((pluginConfig) => {
        console.log('In readConfig ' + JSON.stringify(this.config));
        resolve(pluginConfig)
      })
      .catch((err) => {
        console.log('Error reading settings from database ' + err);
        reject(err)
      })
    })
    return p
  }

  markForDelete (plugin:string) {
    this.readConfiguration()
    this.config.pluginsToDelete.push(plugin)
    this.saveConfiguration()
  }

  performCleanUp () {
    this.readConfiguration().then((pluginConfig) => {
      while(this.config.pluginsToDelete.length > 0)
      {
        const tempPlugin = this.config.pluginsToDelete.pop()
        try {
          this.deletePlugin(tempPlugin)
          this.config.uninstalledPlugins.push(tempPlugin)
        } catch (e) {
          console.log('Error deleting plugin ' + tempPlugin);
          console.log('error ' + e);
          // this.config.pluginsToDelete.push(tempPlugin)
        }
      }
      this.saveConfiguration().then((result) => {
        console.log('Configuration updated after cleanup');
      })
    })
  }

  installPlugin (pluginPath:string, name:string) {
    if(fs.lstatSync(pluginPath).isDirectory())
    console.log('Cannot process directories');
    else
    fs.createReadStream(pluginPath).pipe(fs.createWriteStream(path.join(this.pluginFolder,name)))

    // pluginManager.PluginControls.mountInstalledPlugins({plugins:pluginManager.getRegisteredPlugins()});
    window.location.reload()
  }

  deletePlugin (plugin:string) {
    // const pluginPath = path.join(this.pluginFolder, plugin)
    const pluginPath = plugin
    if(pluginPath.includes('asar'))
      fs.unlinkSync(pluginPath)
    else
      this.deleteFolderRecursive(path.join(this.pluginFolder, plugin))
  }

  /**
  * Deletes the plugin.
  * @param {string} plugin - path of the plugin to be deleted.
  */
  uninstallPlugin(plugin:string) {
    console.log('Uninstalled plugin received ' + JSON.stringify(plugin));
    this.PluginControls.unmountPlugin(plugin)
    this.markForDelete(plugin)
  }

  tryLoadPlugin(plugin:string) : ?Object {
    let plugInInfo: ?Object
    try {
      const pluginObject = require(path.join(this.pluginFolder, plugin))
      const pluginMeta = require(path.join(this.pluginFolder, plugin, '/package.json'))
      plugInInfo = {
        component: pluginObject.default,
        root: uri.parse(this.pluginFolder),
        location: plugin,
        module: pluginMeta,
        path: pluginMeta.config.path
      }
    } catch(ex) {
      console.log(ex)
      plugInInfo = undefined
    }
    return plugInInfo
  }

  deleteFolderRecursive(pluginPath:string) {
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
