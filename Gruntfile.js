var grunt = require('grunt');
var nconf = require('nconf');

nconf.file('build-env.json');

var electron_disturl = nconf.get('electron:disturl');
var electron_version = nconf.get('electron:version');

require('load-grunt-tasks')(grunt);

grunt.initConfig({

  clean: {
    build: ['build']
  },

  copy: {
    osxBuild: {
      expand: true,
      cwd: 'app',
      src: ['**', '!node_modules/**/*'],
      dest: 'build/osx/'
    },
    win32Build: {
      expand: true,
      cwd: 'app',
      src: ['**', '!node_modules/**/*'],
      dest: 'build/win32/'
    },
    linuxBuild: {
      expand: true,
      cwd: 'app',
      src: ['**', '!node_modules/**/*'],
      dest: 'build/linux/'
    }
  },

  'npm-install': {
    osxBuild: {
      options: {
        cwd: 'build/osx',
        disturl: electron_disturl,
        distver: electron_version,
        target: 'darwin',
        arch: 'x64'
      }
    },
    win32Build: {
      options: {
        cwd: 'build/win32',
        disturl: electron_disturl,
        distver: electron_version,
        target: 'win32',
        arch: 'ia32'
      }
    },
    linuxBuild: {
      options: {
        cwd: 'build/linux',
        disturl: electron_disturl,
        distver: electron_version,
        target: 'linux',
        arch: 'x64'
      }
    }
  },

  electron: {
    osxBuild: {
      options: {
        name: 'boilerplate',
        dir: 'build/osx',
        out: 'build',
        version: electron_version,
        platform: 'darwin',
        arch: 'x64',
        icon: 'app/assets/boilerplate.icns',
        prune: true,
        asar: true
      }
    },
    win32Build: {
      options: {
        name: 'boilerplate',
        dir: 'build/win32',
        out: 'build',
        version: electron_version,
        platform: 'win32',
        arch: 'ia32',
        icon: 'app/assets/boilerplate.ico',
        prune: true,
        asar: true
      }
    },
    linuxBuild: {
      options: {
        name: 'boilerplate',
        dir: 'build/linux',
        out: 'build',
        version: electron_version,
        platform: 'linux',
        arch: 'x64',
        icon: 'app/assets/boilerplate.png',
        prune: true,
        asar: true
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
        path: 'build/boilerplate-darwin-x64/boilerplate.app/'
      }]
    },
    target: {
      dest: 'build/pkg/boilerplate.dmg'
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
      src: 'build/boilerplate-linux-x64/',
      dest: 'build/pkg/'
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
      src: 'build/boilerplate-linux-x64/',
      dest: 'build/pkg/'
    }
  },

  'electron-windows-installer': {
    options: {
      productName: 'Boilerplate',
      productDescription: 'An Electron boilerplate project.',
      icon: 'app/assets/boilerplate.ico',
      rename: function(dest, src) {
        if (/\.exe$/.test(src)) {
          src = '<%= name %>-<%= version %>-setup.exe';
        }
        return dest + src;
      }
    },
    win32: {
      src: 'build/boilerplate-win32-ia32/',
      dest: 'build/pkg/'
    }
  }

});

grunt.registerTask('osx', ['clean:build', 'copy:osxBuild', 'npm-install:osxBuild', 'electron:osxBuild', 'appdmg']);
grunt.registerTask('win32', ['clean:build', 'copy:win32Build', 'npm-install:win32Build', 'electron:win32Build', 'electron-windows-installer']);
grunt.registerTask('linux', ['clean:build', 'copy:linuxBuild', 'npm-install:linuxBuild', 'electron:linuxBuild', 'electron-redhat-installer', 'electron-debian-installer']);
