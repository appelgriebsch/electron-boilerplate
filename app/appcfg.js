(function() {

  module.exports = {
    defaultModule: 'todo',
    modules: {
      todo: {
        path: 'modules/todo',
        name: 'TodoModule',
        url: '/app/todo/view',
        state: 'app.todo',
        tooltip: 'Access your todos',
        icon: 'toc'
      }
    }
  };

})();
