// @flow
import { Reactor } from 'nuclear-js';
const isDev = require('electron-is-dev');

const reactor = new Reactor({ debug: isDev });
export default reactor;
