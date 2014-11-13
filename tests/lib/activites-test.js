'use strict';

var test   = require('tape');
var clone  = require('clone');
var util   = require('util');
var helper = require('../helper');
var client = helper.createClient();
var noop   = function () {};

test('activities', function (t) {
  t.equal(typeof client.activities, 'object', 'client.activites must be an object');
  t.end();
});

test('activities#get', function (t) {
  t.plan(6);

  t.equal(typeof client.activities.get, 'function', 'client.activities.get must be a function');

  t.throws(function () {
    client.activities.get();
  }, /an activity id is required/, 'activity id is required');

  t.throws(function () {
    client.activities.get('test_id');
  }, /a callback is required/, 'callback is required');

  var activity = helper.loadFixture('activities').filter(function (a) {
    return a.id === 'activity_01';
  });

  helper
    .api('GET', 'activities/activity_01')
    .reply(200, activity, { 'Content-Type': 'application/json' });

  client.activities.get('activity_01', function (err, res, body) {
    t.error(err, 'error must be null');
    t.equal(res.statusCode, 200, 'status code must be 200');
    t.deepEqual(activity, body, 'activity must be returned');
  });

});

test('activities#list', function (t) {
  t.plan(6);

  t.equal(typeof client.activities.list, 'function', 'client.activities.list must be a function');

  t.throws(function () {
    client.activities.list();
  }, /a callback is required/, 'callback is required');

  t.throws(function () {
    client.activities.list({ category: 'logins' });
  }, /a callback is required/, 'callback is required');

  var activities = helper.loadFixture('activities');

  helper
    .api('GET', 'activities')
    .reply(200, activities, { 'Content-Type': 'application/json '});

  client.activities.list(function (err, res, body) {
    t.error(err, 'error must be null');
    t.equal(res.statusCode, 200, 'status code must be 200');
    t.deepEqual(activities, body, 'activities must be returned');
  });

});

test('activities#list with params', function (t) {
  t.plan(3);

  var activities = helper.loadFixture('activities').filter(function (a) {
    return a.category === 'logins';
  });

  helper
    .api('GET', 'activities', { category: 'logins' })
    .reply(200, activities, { 'Content-Type': 'application/json '});

  client.activities.list({ category: 'logins'}, function (err, res, body) {
    t.error(err, 'error must be null');
    t.equal(res.statusCode, 200, 'status code must be 200');
    t.deepEqual(activities, body, 'activities must be returned');
  });

});
