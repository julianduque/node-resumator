'use strict';

var defaults = require('defaults');
var nock     = require('nock');
var path     = require('path');
var util     = require('util');
var qs       = require('querystring');
var client   = require('../lib/client');
var helper   = exports;
var endpoint = 'http://localhost:12345';
var apiKey   = 'testkey';

helper.createClient = function createClient() {
  return client({ apiKey: apiKey, endpoint: endpoint });
};

helper.loadFixture = function loadFixture(name) {
  return require(path.join(__dirname, 'fixtures', name));
};

helper.api = function api(method, route, params) {
  params = defaults(params, {
    apikey: apiKey
  });

  var uri = util.format('/%s', route);

  if (method === 'GET') {
    uri = util.format('/%s?%s', route, qs.stringify(params));
    params = undefined;
  }

  return nock(endpoint).intercept(uri, method, params);
};
