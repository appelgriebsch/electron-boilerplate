(function () {

  'use strict';

  var os = require('os');

  var mdns = require('multicast-dns');
  var mdns_types = require('multicast-dns-service-types');
  var nw_address = require('network-address');

  function ServiceFinder(serviceName, protocol, subtypes, includeLocal) {

    var _serviceName = mdns_types.stringify(serviceName, protocol, subtypes);
    var _mdns = mdns({loopback: includeLocal});
    var _localIP = nw_address();

    console.log('initialized service: ', _serviceName);

    return {

      localIP: function () {

        return _localIP;
      },

      registerServiceEndpoint: function (ep, port, info) {

        console.log('registerServiceEndpoint: ', serviceName, ' at: ', ep, ':', port);

        var answer = [{
          name: _serviceName,
          type: 'SRV',
          data: {
            target: ep || _localIP,
            port: port
          }
        }];

        if (info) {
          answer.push({
            name: _serviceName,
            type: 'TXT',
            data: JSON.stringify(info)
          });
        }

        _mdns.on('query', function (query) {
          _mdns.respond(answer);
        });
      },

      searchServiceEndpoints: function (cb) {

        console.log('searchServiceEndpoints: ', _serviceName);

        _mdns.on('response', function (searchResponse) {
          if (_serviceName === searchResponse.answers[0].name) {
            cb(searchResponse);
          }
        });
        _mdns.query(_serviceName, 'SRV');
      },

      stopSearch: function () {

        _mdns.destroy();
      }
    };
  }

  module.exports = ServiceFinder;

})();
