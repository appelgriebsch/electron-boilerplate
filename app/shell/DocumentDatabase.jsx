// @flow
import PouchDB from 'pouchdb';
PouchDB.plugin(require('pouchdb-find'));
PouchDB.plugin(require('pouchdb-quick-search'));

class DocumentDatabase {

  constructor(dbName, dbVersion = 1) {
    this.db = new PouchDB(`${dbName}.${dbVersion}`, { db: 'idb', storage: 'persistent' });
  }

  save(doc) {
    this.db.put(doc);
  }

  get(id) {
    this.db.get(id);
  }
}

export default DocumentDatabase;
