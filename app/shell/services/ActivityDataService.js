(function() {

  'use strict';

  function ActivityDataService(PouchDBService) {

    var db = PouchDBService.initialize('activities');
    var uuid = require('uuid');

    var saveDoc = function(doc) {

      var promise = Promise.resolve(
        db.get(doc._id)
        .then(function(result) {

          if ((result) && (result.version !== doc.version)) {
            doc._rev = result._rev;
            return db.put(doc);
          }
          return true;
        })
        .catch(function(err) {

          if (err.status == 404) {
            return db.put(doc);
          } else {
            throw err;
          }
        })
      );

      return promise;
    };

    return {

      initialize: function() {

        var ddoc = {
          _id: '_design/activities',
          version: '1.0',
          views: {
            all: {
              map: function mapFun(doc) {
                emit(doc.activity.endTime);
              }.toString()
            },
            byDate: {
              map: function mapFun(doc) {
                emit(doc.activity.endTime);
              }.toString()
            },
            byType: {
              map: function mapFun(doc) {
                emit(doc.activity['@type']);
              }.toString()
            },
            bySeverity: {
              map: function mapFun(doc) {
                emit(doc.class);
              }.toString()
            }
          }
        };

        var template = {
          _id: '_design/templates',
          version: '1.0',
          action: {
            '@context': 'http://schema.org',
            '@type': '${actionType}',
            actionStatus: '${actionStatus}',
            agent: {
              name: '${userName}'
            },
            description: '${description}', // a printable description of the activity
            endTime: '${endDateTime}', // end date time
            error: { // error if it has happened
              description: '${errorDescription}',
              name: '${errorName}'
            },
            image: '${icon}', // the icon for the activity display
            instrument: { // the PC or notebook used
              description: '${PCDescription}',
              name: '${PCName}'
            },
            object: '${object}', // the meta data of the thing that was worked on
            result: '${result}', // result of the activity
            startTime: '${startTime}' // when the activity has been started
          },
          actionStatus: [
            'CompletedActionStatus', // action was successfull
            'FailedActionStatus' // action was not successfull
          ],
          actionTypes: [
            'ControlAction', // startup/shutdown activity
            'AddAction', // create documents
            'DeleteAction', // remove documents
            'ReplaceAction', // update documents
            'SendAction', // export documents / replicate to action
            'ReceiveAction', // import documents / replicate from action
            'SearchAction' // search for documents
          ]
        };

        this.templates = template;

        return Promise.all([
          saveDoc(ddoc),
          saveDoc(template)
        ]);
      },

      createFromTemplate: function(type, icon, error) {

        var today = new Date();
        var idx = this.templates.actionTypes.indexOf(type);
        if (idx == -1) return null;

        var clone = JSON.parse(JSON.stringify(this.templates.action));
        clone['@type'] = type;
        clone.image = icon;
        clone.startTime = today.toISOString();

        if (error) {
          clone.actionStatus = 'FailedActionStatus';
          clone.error.description = error.message;
          clone.error.name = error.name;
          clone.description = `${error.name}: ${error.message}`;
        } else {
          clone.actionStatus = 'CompletedActionStatus';
          delete clone.error;
        }

        return clone;
      },

      events: function() {

        var options = {
          descending: true,
          include_docs: true
        };

        return db.query('activities/all', options);
      },

      search: function(filter) {

        var options = {
          descending: true
        };

        return db.query('activities/all', options);
      },

      writeEntry: function(severity, event) {

        var doc = {
          _id: uuid.v4(),
          class: severity,
          activity: event
        };

        return saveDoc(doc);
      }
    };
  }

  module.exports = ActivityDataService;

})();
