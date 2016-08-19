(function () {
  'use strict'
  /**
   * TodoDataService - description
   *
   * @param  {type} PouchDBService description
   * @return {type}                description
   */
  function TodoDataService (PouchDBService) {
    var db
    var uuid = require('uuid')
    /**
     * saveDoc function - description
     *
     * @param  {type} doc description
     * @return {Promise}     description
     */
    var saveDoc = function (doc) {
      var promise = Promise.resolve(
        db.get(doc._id)
        .then(function (result) {
          if ((result.version === undefined) || (result.version !== doc.version)) {
            doc._rev = result._rev
            return db.put(doc)
          }
          return true
        })
        .catch(function (err) {
          if (err.status === 404) {
            return db.put(doc)
          } else {
            throw err
          }
        })
      )
      return promise
    }
    return {
      /**
       * initialize function - description
       *
       * @return {Promise}  description
       */
      initialize: function () {
        var ddoc = {
          _id: '_design/todos',
          version: '0.1.0',
          views: {
            all: {
              map: function mapFun (doc) {
                emit(doc.createdAt)
              }.toString()
            }
          }
        }
        return PouchDBService.initialize('todos').then((pouchdb) => {
          db = pouchdb
          return saveDoc(ddoc)
        })
      },
      /**
       * todos function - description
       *
       * @return {type}  description
       */
      todos: function () {
        var options = {
          descending: true,
          include_docs: true
        }
        return db.query('todos/all', options)
      },
      /**
       * get function - description
       *
       * @param  {type} docID description
       * @return {type}       description
       */
      get: function (docID) {
        return db.get(docID)
      },
      /**
       * save function - description
       *
       * @param  {type} doc description
       * @return {type}     description
       */
      save: function (doc) {
        if (!doc._id) {
          doc._id = uuid.v4()
        }
        return saveDoc(doc)
      },
      /**
       * delete function - description
       *
       * @param  {type} doc description
       * @return {type}     description
       */
      delete: function (doc) {
        return db.remove(doc)
      }
    }
  }
  module.exports = TodoDataService
})()
