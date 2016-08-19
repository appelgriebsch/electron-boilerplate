(function () {
  'use strict'
  /**
   * ModuleProvider - description
   *
   * @return {type}  description
   */
  function ModuleProvider () {
    /**
     * anonymous function - description
     *
     * @return {type}  description
     */
    this.$get = function () {
      return {
        config: appcfg,
        modules: modules
      }
    }
  }
  var modules = []
  var appcfg = require('../appcfg')
  /**
   * anonymous function - description
   *
   * @return {type}  description
   */
  ModuleProvider.loadModules = function () {
    for (var cfgName in appcfg.modules) {
      var cfg = appcfg.modules[cfgName]
      var module = `../${cfg.path}/${cfg.name}`
      var Module = require(module)
      var instance = new Module(cfg)
      modules.push({
        name: cfgName,
        info: cfg,
        instance: instance
      })
    }
  }
  module.exports = ModuleProvider
})()
