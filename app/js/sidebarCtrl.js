(function() {

  'use strict';

  angular.module('boilerplateApp').controller('SidebarController', ['$state', '$log', '$q', SidebarController]);

  function SidebarController($state, $log, $q) {

    var self = this;
    var notifier = require('node-notifier');

    self.items = [];
    self.selectedItem = undefined;

    self.selectItem = function(item) {
      self.selectedItem = item;
      $state.go('item',  { "item": item.text });
    }

    self.initialize = function() {

    }

    self.addItem = function() {
      var count = self.items.length + 1;
      self.items.push({ text: "Item " + count });

      notifier.notify({
        'title': 'Electron Boilerplate',
        'message': 'Item successfully created!'
      });
    }
  };

})();
