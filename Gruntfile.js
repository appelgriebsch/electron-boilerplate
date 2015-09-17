var grunt = require('grunt');
var nconf = require('nconf');

nconf.file('build-env.json');

var electron_disturl = nconf.get('electron:disturl');
var electron_version = nconf.get('electron:version');

require('load-grunt-tasks')(grunt);

grunt.initConfig({

  clean: {
    osxBuild: ['dist/osx-build', 'pkg/boilerplate-darwin-x64'],
    win32Build: ['dist/win32-build', 'pkg/boilerplate-win32-ia32'],
    linuxBuild: ['dist/linux-build', 'pkg/boilerplate-linux-x64/']
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
    linuxBuild: {
      expand: true,
      cwd: 'app',
      src: ['**', '!node_modules/**/*'],
      dest: 'dist/linux-build/'
    }
  },

  'npm-install': {
    osxBuild: {
      options: {
        cwd: 'dist/osx-build',
        disturl: electron_disturl,
        distver: electron_version,
        arch: 'x64'
      }
    },
    win32Build: {
      options: {
        cwd: 'dist/win32-build',
        disturl: electron_disturl,
        distver: electron_version,
        arch: 'ia32'
      }
    },
    linuxBuild: {
      options: {
        cwd: 'dist/linuxBuild-build',
        disturl: electron_disturl,
        distver: electron_version,
        arch: 'x64'
      }
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
    linuxBuild: {
      options: {
        name: 'boilerplate',
        dir: 'dist/linux-build',
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

grunt.registerTask('osx', ['clean:osxBuild', 'copy:osxBuild', 'npm-install:osxBuild', 'electron:osxBuild', 'appdmg']);
grunt.registerTask('win32', ['clean:win32Build', 'copy:win32Build', 'npm-install:win32Build', 'electron:win32Build', 'electron-windows-installer']);
grunt.registerTask('linux', ['clean:linuxBuild', 'copy:linuxBuild', 'npm-install:linuxBuild', 'electron:linuxBuild', 'electron-redhat-installer', 'electron-debian-installer']);
