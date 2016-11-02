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
  config: JSON

  /**
  * Represents a PluginManager.
  * Checks if the plugins folder path exists and creates a new plugins folder otherwise.
  * @constructor
  * @param {string} pluginFolder - path to the plugins folder
  */
  constructor(pluginFolder:string, pluginControls: PluginActions) {
    this.dbName = 'PluginConfig'
    this.config = {
      _id: 'pluginConfig',
      "pluginsToDelete": [],
      "uninstalledPlugins":[],
      "disabledPlugins":[]
    }

    this.pluginFolder = pluginFolder
    this.PluginControls = pluginControls
    this.installPlugin = this.installPlugin.bind(this)
    this.uninstallPlugin = this.uninstallPlugin.bind(this)
    this.ConfigDb = new PouchDB(this.dbName, {
      adapter: 'idb',
      storage: 'persistent'
    })
    console.log('saving first configuration from constructor');
    this.saveConfiguration()
    this.performCleanUp()

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

  saveConfiguration () {
    this.config._rev = this.config._rev
    this.ConfigDb.put(this.config)
    .then((res) => {
      console.log('Successfully saved settings to database');
    })
    .catch((err) => {
      console.log('Error saving settings to database' + err);
    })
  }

  readConfiguration () {
    this.ConfigDb.get('pluginConfig')
    .then((pluginConfig) => {
      this.config = pluginConfig
      console.log('Loaded plugin config ' + this.config);
    })
    .catch((err) => {
      console.log('Error reading settings from database ' + err);
    })
  }

  markForDelete (plugin:string) {
    this.readConfiguration()
    this.config.pluginsToDelete.push(plugin)
    this.saveConfiguration()
  }

  performCleanUp () {
    this.readConfiguration()
    while(this.config.pluginsToDelete.length > 0)
    {
      const tempPlugin = this.config.pluginsToDelete.pop()
      try {
        this.deletePlugin(tempPlugin)
        this.config.uninstalledPlugins.push(tempPlugin)
      } catch (e) {
        console.log('Error deleting plugin ' + tempPlugin);
        this.config.pluginsToDelete.push(tempPlugin)
      }
    }
    console.log('Saving configuration after clean up');
    this.saveConfiguration()
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
    const pluginPath = path.join(this.pluginFolder, plugin)
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
