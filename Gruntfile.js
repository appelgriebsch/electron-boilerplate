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
  },

  'electron-redhat-installer': {
    options: {
      productName: 'Boilerplate',
      productDescription: 'An Electron boilerplate project.',
      icon: 'app/assets/boilerplate.png',      
      categories: [
        'Utility'
      ],
      rename: function(dest, src) {
        return dest + '<%= name %>-<%= version %>-<%= revision %>.<%= arch %>.rpm';
      }
    },

    linux32: {
      options: {
        arch: 'x86'
      },
      src: 'pkg/boilerplate-linux-ia32/',
      dest: 'pkg/installer/'
    },

    linux64: {
      options: {
        arch: 'x86_64'
      },
      src: 'pkg/boilerplate-linux-x64/',
      dest: 'pkg/installer/'
    }
  },

  'electron-debian-installer': {
    options: {
      productName: 'Boilerplate',
      productDescription: 'An Electron boilerplate project.',
      icon: 'app/assets/boilerplate.png',
      section: 'devel',
      priority: 'optional',
      lintianOverrides: [
        'changelog-file-missing-in-native-package',
        'executable-not-elf-or-script',
        'extra-license-file'
      ],
      categories: [
        'Utility'
      ],
      rename: function(dest, src) {
        return dest + '<%= name %>_<%= version %>-<%= revision %>_<%= arch %>.deb';
      }
    },

    linux32: {
      options: {
        arch: 'i386'
      },
      src: 'pkg/boilerplate-linux-ia32/',
      dest: 'pkg/installer/'
    },

    linux64: {
      options: {
        arch: 'amd64'
      },
      src: 'pkg/boilerplate-linux-x64/',
      dest: 'pkg/installer/'
    }
  }

});

grunt.registerTask('osx', ['electron:osxBuild']);
grunt.registerTask('win32', ['electron:win32Build']);
grunt.registerTask('linux', ['electron:linuxBuild', 'electron-redhat-installer', 'electron-debian-installer']);
