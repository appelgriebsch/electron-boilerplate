// @flow
import PouchDB from 'pouchdb/lib/index-browser';
import uuid from 'uuid';

PouchDB.plugin(require('pouchdb-find'));
PouchDB.plugin(require('pouchdb-quick-search'));

/**
 * 
 * 
 * @class DocumentDatabase
 */
class DocumentDatabase {

  /**
   * Creates an instance of DocumentDatabase.
   * 
   * @param {any} dbName
   * @param {number} [dbVersion=1]
   */
  constructor(dbName, dbVersion = 1) {
    this.db = new PouchDB(`${dbName}.${dbVersion}`, {
      adapter: 'idb',
      storage: 'persistent'
    });
  }

  /**
   * 
   * 
   * @param {any} doc
   * @returns
   */
  save(doc) {

    if (!doc._id) {
      doc._id = uuid.v4();
    }

    if (!doc.timestamp) {
      doc.timestamp = new Date();
    }

    var promise = Promise.resolve(this.db.get(doc._id).then((result) => {
      if ((result.version === undefined) || (result.version !== doc.version)) {
        doc._rev = result._rev;
        return this.db.put(doc);
      }
      return true;
    }).catch((err) => {
      if (err.status == 404) {
        return this.db.put(doc);
      } else {
        throw err;
      }
    }));

    return promise;
  }

  /**
   * 
   * 
   * @param {any} id
   * @returns
   */
  get(id) {
    return this.db.get(id);
  }
}

export default DocumentDatabase;
