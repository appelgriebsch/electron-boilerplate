# electron-boilerplate
An electron boilerplate project incl. PouchDB, AngularJS + Material Design

## Included modules
* Electron
* Angular 
* Angular Material Design
* Angular UI Router
* Node-Notifier 
* PouchDB + Plugins (geo-spatial, MongoDB-style query language and full-text search engine support)
* WS

## Getting started
* install latest node.js from [here](http://www.nodejs.org)
* clone git repository (```git clone https://github.com/appelgriebsch/electron-boilerplate.git```)
* open terminal and run ```npm install``` to install dependencies
* start application in debug by executing ```npm start``` in terminal

## Screenshot

![screenshot](https://github.com/appelgriebsch/electron-boilerplate/blob/master/screenshot.png)

## Build Distributable Packages

**PLEASE NOTE: you will need a virtual machine with the actual operating system and development tools installed to build the native packages for it**

* on OS X (10.9+): creates application bundle and distributable disk image (x64 only)

  ```bash
  grunt osx
  ```
* on Windows (7+): creates application .exe and distributable setup.exe (x86 only)

  ```bash
  grunt win32
  ```
* on Linux (Ubuntu/Fedora): creates application and distributable packages for deb-style and rpm-style distributions (x64 only)

  ```bash
  grunt linux
  ```
