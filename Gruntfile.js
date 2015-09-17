var grunt = require('grunt');
var nconf = require('nconf');

nconf.file('build-env.json');
var electron_version = nconf.get('electron:version');

require('load-grunt-tasks')(grunt);

grunt.initConfig({

  clean: {
    osxBuild: ['dist/osx-build'],
    win32Build: ['dist/win32-build'],
    linuxBuild: ['dist/linux32-build', 'dist/linux64-build']
  },

  copy: {
    osxBuild: {
      expand: true,
      cwd: 'app',
      src: ['**', '!node_modules/**/*'],
      dest: 'dist/osx-build'
    },
    win32Build: {
      expand: true,
      cwd: 'app',
      src: ['**', '!node_modules/**/*'],
      dest: 'dist/win32-build/'
    },
    linux32Build: {
      expand: true,
      cwd: 'app',
      src: ['**', '!node_modules/**/*'],
      dest: 'dist/linux32-build/'
    },
    linux64Build: {
      expand: true,
      cwd: 'app',
      src: ['**', '!node_modules/**/*'],
      dest: 'dist/linux64-build/'
    }
  },

  electron: {
    osxBuild: {
      options: {
        name: 'boilerplate',
        dir: 'dist/osx-build',
        out: 'pkg',
        version: electron_version,
        platform: 'darwin',
        arch: 'x64',
        icon: 'app/assets/boilerplate.icns',
        prune: true,
        asar: true,
        ignore: 'pkg'
      }
    },
    win32Build: {
      options: {
        name: 'boilerplate',
        dir: 'dist/win32-build',
        out: 'pkg',
        version: electron_version,
        platform: 'win32',
        arch: 'ia32',
        icon: 'app/assets/boilerplate.ico',
        prune: true,
        asar: true,
        ignore: 'pkg'
      }
    },
    linux32Build: {
      options: {
        name: 'boilerplate',
        dir: 'dist/linux32-build',
        out: 'pkg',
        version: electron_version,
        platform: 'linux',
        arch: 'ia32',
        icon: 'app/assets/boilerplate.png',
        prune: true,
        asar: true,
        ignore: 'pkg'
      }
    },
    linux64Build: {
      options: {
        name: 'boilerplate',
        dir: 'dist/linux64-build',
        out: 'pkg',
        version: electron_version,
        platform: 'linux',
        arch: 'x64',
        icon: 'app/assets/boilerplate.png',
        prune: true,
        asar: true,
        ignore: 'pkg'
      }
    }
  },

  appdmg: {
    options: {
      basepath: '.',
      title: 'boilerplate',
      icon: 'app/assets/boilerplate.icns',
      background: 'app/assets/background.png',
      'icon-size': 80,
      contents: [{
        x: 300,
        y: 250,
        type: 'link',
        path: '/Applications'
      }, {
        x: 120,
        y: 130,
        type: 'file',
        path: 'pkg/boilerplate-darwin-x64/boilerplate.app/'
      }]
    },
    target: {
      dest: 'pkg/installer/boilerplate.dmg'
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
  },

  'electron-windows-installer': {
    options: {
      productName: 'Boilerplate',
      productDescription: 'An Electron boilerplate project.',
      icon: 'app/assets/boilerplate.png',
      rename: function(dest, src) {
        if (/\.exe$/.test(src)) {
          src = '<%= name %>-<%= version %>-setup.exe';
        }
        return dest + src;
      }
    },

    win32: {
      src: 'pkg/boilerplate-win32-ia32/',
      dest: 'pkg/installer/win32/'
    }
  }

});

grunt.registerTask('osx', ['clean:osxBuild', 'copy:osxBuild', 'electron:osxBuild', 'appdmg']);
grunt.registerTask('win32', ['clean:win32Build', 'copy:win32Build', 'electron:win32Build', 'electron-windows-installer']);
grunt.registerTask('linux', ['clean:linuxBuild', 'copy:linux32Build', 'copy:linux64Build', 'electron:linux32Build', 'electron:linux64Build', 'electron-redhat-installer', 'electron-debian-installer']);
