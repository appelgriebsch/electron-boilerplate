(function() {

  'use strict';

  angular.module('boilerplateApp').controller('SidebarController', ['$log', '$q', SidebarController]);

  function SidebarController($log, $q) {

    var self = this;
    self.items = [];
    self.selectedItem = undefined;

    self.selectItem = function(item) {
      self.selectedItem = item;
    }

    self.initialize = function() {

    }

    self.addItem = function() {
      var count = self.items.length + 1;
      self.items.push("Item " + count);
    }
  };

})();
