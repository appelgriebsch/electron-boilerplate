// @flow
import { Store } from 'rdfstore'


/**
 *
 */
class TripleStore {

  db: Object;

  /**
   * Creates an instance of TripleStore.
   *
   * @param {any} dbName
   * @param {number} [dbVersion=1]
   */
  constructor (dbName:string, dbVersion:number = 1) {
    Store({ persistent: true, name: `${dbName}.${dbVersion}` }, (err, db) => {
      this.db = db;
    })
  }
}

export default TripleStore
