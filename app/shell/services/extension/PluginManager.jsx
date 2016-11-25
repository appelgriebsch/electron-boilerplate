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
    this.saveInitalConfiguration()
  }

  performCleanUp () {
    let pluginConfig = this.config
    while(pluginConfig.pluginsToDelete.length > 0)
    {
      const tempPlugin = pluginConfig.pluginsToDelete.pop()
      try {
        this.deletePlugin(tempPlugin)
        pluginConfig.uninstalledPlugins.push(tempPlugin)
      } catch (e) {
        console.log('Error deleting plugin ' + tempPlugin);
        console.log('error ' + e);
      }
    }
    this.config = pluginConfig
    this.saveConfiguration(this.config)
    return pluginConfig
  }

  /** Iterates over all the plugins in the plugins folder, loads and returns the plugins list. */
  getRegisteredPlugins() {
    let plugins = [];
    let id = 0;
    try {
      fs.readdirSync(this.pluginFolder).map((plugin) => {
        if ((this.config.pluginsToDelete.indexOf(plugin) === -1) &&
        (this.config.disabledPlugins.indexOf(plugin) === -1))
        {
          const p = this.tryLoadPlugin(plugin)
          if (p) {
            plugins.push(p)
          }
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
    this.performCleanUp()
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

  saveConfiguration (newConfig: Object) {
    var p = new Promise((resolve, reject) => {
      this.ConfigDb.get('pluginConfig')
      .then((pluginConfig) => {
        newConfig._rev = pluginConfig._rev
        console.log('new Config to be saved ' + JSON.stringify(newConfig));
        return this.ConfigDb.put(newConfig)
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
        this.config = pluginConfig
        resolve(pluginConfig)
      })
      .catch((err) => {
        console.log('Error reading settings from database ' + err);
        reject(err)
      })
    })
    return p
  }

  installPlugin (pluginPath:string, newPlugin:string) {
    if(fs.lstatSync(pluginPath).isDirectory())
      console.log('Cannot process directories');
    else
    {
      let readStream = fs.createReadStream(pluginPath)
      let writeStream = fs.createWriteStream(path.join(this.pluginFolder,newPlugin))
      readStream.pipe(writeStream)

      writeStream.on('error',(err) => {
        console.log('Error occured while installing plugin');
        console.log(err);
      })

      writeStream.on('close',(err) => {
        console.log('Successfullly completed copying the necessary files for plugin installation');
        let newPluginModule = this.tryLoadPlugin(newPlugin)
        if(newPluginModule)
        {
          console.log('newPlugin from PluginManager ' + JSON.stringify(newPluginModule));
          this.PluginControls.mountNewlyInstalledPlugin({ plugins: newPluginModule })
        }
      })
    }
  }

  deletePlugin (plugin:string) {
    const pluginPath = path.join(this.pluginFolder, plugin)
    // const pluginPath = plugin
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

  markForDelete(plugin: string) {
    this.readConfiguration()
    .then((config => {
      config.pluginsToDelete.push(plugin)
      console.log('Config after marking for delete');
      return config
    }))
    .then((newConfig) => this.saveConfiguration(newConfig))
    .then((result) => {
      console.log('Plugin marked for deletion ' + result)
    })
    .catch((err) => {
      console.log('Error in marking plugin for delete')
    })
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
