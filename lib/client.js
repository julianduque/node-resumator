'use strict';

var defaults = require('defaults');
var request  = require('request');
var util     = require('util');
var qs       = require('querystring');

module.exports = function client(opts) {
  var opts = defaults(opts, {
    endpoint: 'https://resumatorapi.com/v1'
  });

  if (!opts.apiKey) {
    throw new Error('apiKey is required');
  }

  function _request(method, route, params, callback) {
    params = defaults(params, {
      apikey: opts.apiKey
    });

    var url = util.format(
      "%s/%s", // http://api.resumatorapi.com/v1/<route>
      opts.endpoint,
      route
    );

    if (method === 'GET') {
      url = url + "?" + qs.stringify(params);
    }

    var options = {
      method: method,
      url: url,
      json: true
    };

    if (method === 'POST') {
      options.body = params;
    }

    return request(options, callback);
  }

  return {
    applicants: require('./applicants')(_request),
    activities: require('./activities')(_request),
    contacts: require('./contacts')(_request),
    users : require('./users')(_request),
    tasks: require('./tasks')(_request)
  };
};
