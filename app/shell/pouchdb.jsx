// @flow
import PouchDB from 'pouchdb';
import electron from 'electron';

PouchDB.plugin(require('geopouch'));
PouchDB.plugin(require('pouchdb-find'));
PouchDB.plugin(require('pouchdb-quick-search'));
PouchDB.plugin(require('transform-pouch'));

class PouchDBService {

  constructor(name) {
    const appCfg = electron.remote.app.sysConfig();
    this.pouchdbService = new PouchDB(name, { adapter: 'leveldb', prefix: appCfg.paths.data });
  }

  query(view, options) {
    return this.pouchdbService.query(view, options);
  }

  get(id) {
    return this.pouchdbService.get(id);
  }

  delete(id) {
    return this.pouchdbService.remove(id);
  }

  save(doc) {

    var promise = Promise.resolve(

      this.pouchdbService.get(doc._id).then((result) => {
        if ((result.version === undefined) || (result.version !== doc.version)) {
          doc._rev = result._rev;
          return this.pouchdbService.put(doc);
        }
        return true;
      }).catch((err) => {
        if (err.status == 404) {
          return this.pouchdbService.put(doc);
        } else {
          throw err;
        }
      })
    );
    return promise;
  }

}

export default PouchDBService;
