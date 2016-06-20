// @flow
import lf from 'lovefield';

class SqlDatabase {

  constructor(dbName, dbVersion = 1) {
    this.db = lf.schema.create(dbName, dbVersion);
  }

}

export default SqlDatabase;
