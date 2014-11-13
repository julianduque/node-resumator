'use strict';

var test   = require('tape');
var clone  = require('clone');
var util   = require('util');
var helper = require('../helper');
var client = helper.createClient();
var noop   = function () {};

test('applicants', function (t) {
  t.equal(typeof client.applicants, 'object', 'client.applicants must be an object');
  t.end();
});

test('applicants#get', function (t) {
  t.plan(6);

  t.equal(typeof client.applicants.get, 'function', 'client.applicants.get must be a function');

  t.throws(function () {
    client.applicants.get();
  }, /an applicant id is required/, 'applicant id is required');

  t.throws(function () {
    client.applicants.get('test_id');
  }, /a callback is required/, 'callback is required');

  var applicant = helper.loadFixture('applicants').filter(function (a) {
    return a.id === 'prospect_01';
  });

  helper
    .api('GET', 'applicants/prospect_01')
    .reply(200, applicant, { 'Content-Type': 'application/json' });

  client.applicants.get('prospect_01', function (err, res, body) {
    t.error(err, 'error must be null');
    t.equal(res.statusCode, 200, 'status code must be 200');
    t.deepEqual(applicant, body, 'applicant must be returned');
  });

});

test('applicants#list', function (t) {
  t.plan(6);

  t.equal(typeof client.applicants.list, 'function', 'client.applicants.list must be a function');

  t.throws(function () {
    client.applicants.list();
  }, /a callback is required/, 'callback is required');

  t.throws(function () {
    client.applicants.list({ name: 'test' });
  }, /a callback is required/, 'callback is required');

  var applicants = helper.loadFixture('applicants');

  helper
    .api('GET', 'applicants')
    .reply(200, applicants, { 'Content-Type': 'application/json '});

  client.applicants.list(function (err, res, body) {
    t.error(err, 'error must be null');
    t.equal(res.statusCode, 200, 'status code must be 200');
    t.deepEqual(applicants, body, 'applicants must be returned');
  });

});

test('applicants#list with params', function (t) {
  t.plan(3);

  var applicants = helper.loadFixture('applicants').filter(function (a) {
    return a.first_name === 'Applicant';
  });

  helper
    .api('GET', 'applicants', { name: 'Applicant' })
    .reply(200, applicants, { 'Content-Type': 'application/json '});

  client.applicants.list({ name: 'Applicant'}, function (err, res, body) {
    t.error(err, 'error must be null');
    t.equal(res.statusCode, 200, 'status code must be 200');
    t.deepEqual(applicants, body, 'applicants must be returned');
  });

});

test('applicants#save', function (t) {
  t.plan(9);

  var applicant = {
    first_name: 'A new',
    last_name: 'Applicant',
    email: 'new@applicant.io'
  };

  t.equal(typeof client.applicants.save, 'function', 'applicants.save must be a function');

  t.throws(function () {
    client.applicants.save();
  }, /an applicant is required/, 'applicant is required');

  t.throws(function () {
    client.applicants.save(applicant);
  }, /a callback is required/, 'callback is required');


  checkRequired('first_name');
  checkRequired('last_name');
  checkRequired('email');

  function checkRequired(property) {
    t.throws(function () {
      var a = clone(applicant);
      delete a[property];
      client.applicants.save(a, noop);
    }, /.+ is required/, util.format('%s is required', property));
  }

  var applicantId = { "prospect_id": "prospect_01 "};

  helper
    .api('POST', 'applicants', applicant)
    .reply(200, applicantId , { 'Content-Type': 'application/json '});

  client.applicants.save(applicant, function (err, res, body) {
    t.error(err, 'error must be null');
    t.equal(res.statusCode, 200, 'status code must be 200');
    t.deepEqual(applicantId, body, 'applicants must be returned');
  });

});
