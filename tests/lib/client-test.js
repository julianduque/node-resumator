'use strict';

var test      = require('tape');
var helper    = require('../helper');
var resumator = require('../../');
var client    = helper.createClient();

test('client', function (t) {
  t.equal(typeof client, 'object', 'client must be an object');

  t.throws(function () {
    resumator.createClient();
  }, /apiKey is required/, 'apiKey is required');

  t.end();
});
