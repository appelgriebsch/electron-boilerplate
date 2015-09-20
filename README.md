# electron-boilerplate
An electron boilerplate project incl. PouchDB, AngularJS + Material Design

## Included modules
* Electron 0.30.0
* Angular  1.4.6
* Angular Material Design 0.11
* Angular UI Router 0.2.15
* Node-Notifier 4.2.3
* PouchDB 4.0.3
* WS 0.8.0

## Screenshot

![screenshot](https://github.com/appelgriebsch/electron-boilerplate/blob/master/screenshot.png)

## Build
* on OS X: creates application bundle and distributable disk image (x64 only)

  ```bash
  grunt osx
  ```
* on Windows: creates application .exe and distributable setup.exe (x86 only)

  ```bash
  grunt win32
  ```
* on Linux: creates application and distributable packages for deb-style and rpm-style distributions (x64 only)

  ```bash
  grunt linux
  ```
