# electron-boilerplate
An electron boilerplate project incl. PouchDB, React + NuclearJS, React-MDL UI library based on Google Material-Lite

[![JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

## Included modules
* [Electron](http://electron.atom.io)
* [ReactJS](http://facebook.github.io/react/)
* [React-Router](https://github.com/reactjs/react-router)
* [NuclearJS](https://optimizely.github.io/nuclear-js/) (ImmutableJS and Flux-based architecture)
* [React-MDL](https://tleunen.github.io/react-mdl/)
* [PouchDB](https://pouchdb.com/) + Plugins (MongoDB-style query language and full-text search engine support)
* [Lovefield](https://google.github.io/lovefield/)
* [rdfstore-js](http://antoniogarrote.github.io/rdfstore-js/)

## Getting started
* install node.js (at least Node 4.4.x+ and NPM 2.14.x+ required) from [here](http://www.nodejs.org)
* install Git from [here](https://git-scm.com/)
* install Python 2.7 from [here](http://www.python.org) and add the installation directory to your system path variable
* For Windows, install Windows SDK for Windows Server 2008 and .NET Framework 3.5 from [here](http://www.microsoft.com/en-us/download/details.aspx?id=11310)
* For Windows, install Visual Studio 2013/2015 (Express for Desktop is sufficient).
* clone git repository (```git clone -b reactjs https://github.com/appelgriebsch/electron-boilerplate.git ./myproject```)
* open terminal and run ```npm install``` to install dependencies
* start application in debug by executing ```npm start``` in terminal

## Screenshot

![screenshot](screenshot.png)

## Extensions
* extensions can be added as self-contained asar modules, please check the [HelloWorldModule](https://github.com/appelgriebsch/HelloWorldModule) for more information

## Build Distributable Packages

* on OS X (10.9+): creates application bundle and distributable disk image (x64 only, Mac AppStore compatible variant incl.)

  ```bash
  npm run build-mac             // will execute sub-tasks npm run build:osx-app (standalone) and npm run build:osx-mas (Mac AppStore version)
  ```
* on Windows (7+): creates application .exe and distributable setup.exe (x86 and x64)

  ```bash
  npm run build-win         // will execute sub-tasks npm run build:win32-ia32 and npm run build:win32-x64
  ```
* on Linux (Ubuntu/Fedora): creates application and distributable packages for deb-style and rpm-style distributions (x86 and x64)

  ```bash
  npm run build-linux       // will execute sub-tasks npm run build:linux-ia32 and npm run build:linux-x64
  ```
