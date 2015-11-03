(function() {

  'use strict';

  angular.module('boilerplateApp').controller('SidebarController', ['$state', '$log', '$q', '$notification', '$mdToast', 'PouchDBService', SidebarController]);

  function SidebarController($state, $log, $q, $notification, $mdToast, PouchDBService) {

    this.items = [];
    this.selectedItem = undefined;
    this.db = PouchDBService.initialize('items');

    this.selectItem = function(item) {
      this.selectedItem = item;
      $state.go('item', {
        'item': item.text
      });
    };

    this.initialize = function() {

      $notification.requestPermission().then(() => {
        this.db.allDocs({ include_docs: true }).then((results) => {
          results.rows.map((row) => {
            $q.when(true).then(() => {
              this.items.push(row.doc);
            });
          });
        });
      });
    };

    this.addItem = function() {
      var count = this.items.length + 1;
      var msg = `Item ${count}`;
      var item = {
        _id: `item_${count}`,
        text: msg,
        created: new Date().toISOString()
      };

      this.items.push(item);

      if (process.platform === 'win32') {
        $mdToast.show(
          $mdToast.simple().content(`${msg} successfully created!`).position('top right').hideDelay(2000));
      } else {
        $notification('Electron Boilerplate', {
          body: `${msg} successfully created!`,
          delay: 2000
        });
      }

      return this.db.post(item);
    };
  }

})();
