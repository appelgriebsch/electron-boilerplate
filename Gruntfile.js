var grunt = require('grunt');
var nconf = require('nconf');
var path = require('path');

nconf.use('file', {
  file: path.join(__dirname, 'build-env.json')
});

var electron_cfg = nconf.get('electron');
var electron_disturl = electron_cfg.disturl;
var electron_version = electron_cfg.version;

var app_bundle_id = nconf.get('app:id');
var app_name = nconf.get('app:name');
var app_description = nconf.get('app:description');
var app_version = nconf.get('app:version');
var app_author = nconf.get('app:author');
var app_icons = nconf.get('app:icons');

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
    win64Build: {
      expand: true,
      cwd: 'app',
      src: ['**', '!node_modules/**/*'],
      dest: 'build/win64/'
    },
    linux64Build: {
      expand: true,
      cwd: 'app',
      src: ['**', '!node_modules/**/*'],
      dest: 'build/linux64/'
    }
  },

  'npm-install': {
    osxBuild: {
      options: {
        cwd: path.join(__dirname, 'build/osx'),
        disturl: electron_disturl,
        distver: electron_version,
        target: 'darwin',
        arch: 'x64',
        runtime: 'electron'
      }
    },
    win32Build: {
      options: {
        cwd: path.join(__dirname, 'build/win32'),
        disturl: electron_disturl,
        distver: electron_version,
        target: 'win32',
        arch: 'ia32',
        runtime: 'electron'
      }
    },
    win64Build: {
      options: {
        cwd: path.join(__dirname, 'build/win64'),
        disturl: electron_disturl,
        distver: electron_version,
        target: 'win32',
        arch: 'x64',
        runtime: 'electron'
      }
    },
    linux64Build: {
      options: {
        cwd: path.join(__dirname, 'build/linux64'),
        disturl: electron_disturl,
        distver: electron_version,
        target: 'linux',
        arch: 'x64',
        runtime: 'electron'
      }
    }
  },

  electron: {
    osxBuild: {
      options: {
        name: app_name,
        dir: 'build/osx',
        out: 'build',
        version: electron_version,
        platform: 'darwin',
        arch: 'x64',
        icon: app_icons.icns,
        'app-version': app_version,
        'app-bundle-id': app_bundle_id,
        prune: true,
        asar: true
      }
    },
    win32Build: {
      options: {
        name: app_name,
        dir: 'build/win32',
        out: 'build',
        version: electron_version,
        platform: 'win32',
        arch: 'ia32',
        icon: app_icons.ico,
        'app-version': app_version,
        'app-bundle-id': app_bundle_id,
        prune: true,
        asar: true,
        'version-string': {
          CompanyName: app_author,
          FileDescription: app_description,
          FileVersion: app_version,
          OriginalFileName: app_name,
          ProductVersion: app_version,
          ProductName: app_name
        }
      }
    },
    win64Build: {
      options: {
        name: app_name,
        dir: 'build/win64',
        out: 'build',
        version: electron_version,
        platform: 'win32',
        arch: 'x64',
        icon: app_icons.ico,
        'app-version': app_version,
        'app-bundle-id': app_bundle_id,
        prune: true,
        asar: true,
        'version-string': {
          CompanyName: app_author,
          FileDescription: app_description,
          FileVersion: app_version,
          OriginalFileName: app_name,
          ProductVersion: app_version,
          ProductName: app_name
        }
      }
    },
    linux64Build: {
      options: {
        name: app_name,
        dir: 'build/linux64',
        out: 'build',
        version: electron_version,
        platform: 'linux',
        arch: 'x64',
        icon: app_icons.png,
        'app-version': app_version,
        'app-bundle-id': app_bundle_id,
        prune: true,
        asar: true
      }
    }
  },

  appdmg: {
    options: {
      basepath: '.',
      title: app_name,
      icon: app_icons.icns,
      background: app_icons.installer,
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
        path: 'build/' + app_name + '-darwin-x64/' + app_name + '.app/'
      }]
    },
    target: {
      dest: 'build/pkg/' + app_name + '.dmg'
    }
  },

  'electron-redhat-installer': {
    options: {
      productName: app_name,
      productDescription: app_description,
      productVersion: app_version,
      bin: app_name,
      icon: app_icons.png,
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
      src: 'build/' + app_name + '-linux-x64/',
      dest: 'build/pkg/'
    }
  },

  'electron-debian-installer': {
    options: {
      productName: app_name,
      productDescription: app_description,
      productVersion: app_version,
      bin: app_name,
      icon: app_icons.png,
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
        return dest + '<%= name %>_<%= version %>-<%= revision %>.<%= arch %>.deb';
      }
    },
    linux64: {
      options: {
        arch: 'amd64'
      },
      src: 'build/' + app_name + '-linux-x64/',
      dest: 'build/pkg/'
    }
  },

  'create-windows-installer': {
    ia32: {
      appDirectory: 'build/' + app_name + '-win32-ia32/',
      outputDirectory: 'build/pkg/',
      authors: app_author,
      loadingGif: app_icons.installer,
      title: app_name,
      description: app_description,
      version: app_version,
      iconUrl: 'file:///' + __dirname + '/' + app_icons.ico,
      setupIcon: app_icons.ico
    },
    x64: {
      appDirectory: 'build/' + app_name + '-win32-x64/',
      outputDirectory: 'build/pkg/',
      authors: app_author,
      loadingGif: app_icons.installer,
      title: app_name,
      description: app_description,
      version: app_version,
      iconUrl: 'file:///' + __dirname + '/' + app_icons.ico,
      setupIcon: app_icons.ico
    }
  }

});

grunt.registerTask('osx', ['clean:build', 'copy:osxBuild', 'npm-install:osxBuild', 'electron:osxBuild', 'appdmg']);
grunt.registerTask('win', ['clean:build', 'copy:win32Build', 'copy:win64Build', 'npm-install:win32Build','npm-install:win64Build',
                           'electron:win32Build', 'create-windows-installer:ia32', 'electron:win64Build', 'create-windows-installer:x64']);
grunt.registerTask('linux', ['clean:build', 'copy:linux64Build', 'npm-install:linux64Build', 'electron:linux64Build',
                             'electron-redhat-installer:linux64', 'electron-debian-installer:linux64']);
