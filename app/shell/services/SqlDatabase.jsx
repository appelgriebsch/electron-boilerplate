// @flow
import lf from 'lovefield';

/**
 * 
 * 
 * @class SqlDatabase
 */
class SqlDatabase {

  /**
   * Creates an instance of SqlDatabase.
   * 
   * @param {any} dbName
   * @param {number} [dbVersion=1]
   */
  constructor(dbName, dbVersion = 1) {
    this.db = lf.schema.create(dbName, dbVersion);
  }

}

export default SqlDatabase;
