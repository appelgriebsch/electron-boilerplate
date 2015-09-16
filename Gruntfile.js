var grunt = require('grunt');
require('load-grunt-tasks')(grunt);

grunt.initConfig({
  electron: {
    osxBuild: {
      options: {
        name: 'boilerplate',
        dir: 'app',
        out: 'pkg',
        version: '0.32.3',
        platform: 'darwin',
        arch: 'all',
        icon: 'app/assets/boilerplate.icns',
        prune: true,
        asar: true,
        ignore: 'pkg'
      }
    },
    win32Build: {
      options: {
        name: 'boilerplate',
        dir: 'app',
        out: 'pkg',
        version: '0.32.3',
        platform: 'win32',
        arch: 'all',
        icon: 'app/assets/boilerplate.ico',
        prune: true,
        asar: true,
        ignore: 'pkg'
      }
    },
    linuxBuild: {
      options: {
        name: 'boilerplate',
        dir: 'app',
        out: 'pkg',
        version: '0.32.3',
        platform: 'linux',
        arch: 'all',
        icon: 'app/assets/boilerplate.png',
        prune: true,
        asar: true,
        ignore: 'pkg'
      }
    }
  }
});

grunt.registerTask('osx', ['electron:osxBuild']);
grunt.registerTask('win32', ['electron:win32Build']);
grunt.registerTask('linux', ['electron:linuxBuild']);
