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
      },
      activities: {
        path: 'modules/activities',
        name: 'ActivityModule',
        url: '/app/activities/view',
        state: 'app.activities',
        tooltip: 'Access your activities',
        icon: 'import_export'
      }
    }
  };

})();
