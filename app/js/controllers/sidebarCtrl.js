(function() {

  'use strict';

  angular.module('boilerplateApp').controller('SidebarController', ['$state', '$log', '$q', SidebarController]);

  function SidebarController($state, $log, $q) {

    var notifier = require('node-notifier');

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
      this.items.push({
        text: 'Item ' + count
      });

      notifier.notify({
        'title': 'Electron Boilerplate',
        'message': 'Item successfully created!'
      });
    };
  }

})();
