(function() {

  'use strict';

  angular.module('boilerplateApp').controller('SidebarController', ['$state', '$log', '$q', '$notification', 'PouchDBService', SidebarController]);

  function SidebarController($state, $log, $q, $notification, PouchDBService) {

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
        this.db.allDocs({ include_docs: true}).then((results) => {
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
        text: msg
      };

      this.items.push(item);

      $notification('Electron Boilerplate', {
        body: `${msg} successfully created!`,
        delay: 2000
      });

      return this.db.post(item);
    };
  }

})();
