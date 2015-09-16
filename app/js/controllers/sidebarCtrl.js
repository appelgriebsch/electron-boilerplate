(function() {

  'use strict';

  angular.module('boilerplateApp').controller('SidebarController', ['$state', '$log', '$q', SidebarController]);

  function SidebarController($state, $log, $q) {

    var notifier = require('node-notifier');
    var path = require('path');

    this.items = [];
    this.selectedItem = undefined;

    this.selectItem = function(item) {
      this.selectedItem = item;
      $state.go('item', {
        'item': item.text
      });
    };

    this.initialize = function() {

    };

    this.addItem = function() {
      var count = this.items.length + 1;
      var msg = `Item ${count}`;
      this.items.push({
        text: msg
      });

      notifier.notify({
        title: 'Electron Boilerplate',
        message: `${msg} successfully created!`,
        icon: path.join(__dirname, 'assets', 'boilerplate.png')
      });
    };
  }

})();
