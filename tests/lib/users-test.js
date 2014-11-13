'use strict';

var test   = require('tape');
var clone  = require('clone');
var util   = require('util');
var helper = require('../helper');
var client = helper.createClient();
var noop   = function () {};

test('users', function (t) {
  t.equal(typeof client.users, 'object', 'client.users must be an object');
  t.end();
});

test('users#get', function (t) {
  t.plan(6);

  t.equal(typeof client.users.get, 'function', 'client.users.get must be a function');

  t.throws(function () {
    client.users.get();
  }, /an user id is required/, 'user id is required');

  t.throws(function () {
    client.users.get('test_id');
  }, /a callback is required/, 'callback is required');

  var user = helper.loadFixture('users').filter(function (a) {
    return a.id === 'usr_01';
  });

  helper
    .api('GET', 'users/usr_01')
    .reply(200, user, { 'Content-Type': 'application/json' });

  client.users.get('usr_01', function (err, res, body) {
    t.error(err, 'error must be null');
    t.equal(res.statusCode, 200, 'status code must be 200');
    t.deepEqual(user, body, 'user must be returned');
  });

});

test('users#list', function (t) {
  t.plan(6);

  t.equal(typeof client.users.list, 'function', 'client.users.list must be a function');

  t.throws(function () {
    client.users.list();
  }, /a callback is required/, 'callback is required');

  t.throws(function () {
    client.users.list({ name: 'test' });
  }, /a callback is required/, 'callback is required');

  var users = helper.loadFixture('users');

  helper
    .api('GET', 'users')
    .reply(200, users, { 'Content-Type': 'application/json '});

  client.users.list(function (err, res, body) {
    t.error(err, 'error must be null');
    t.equal(res.statusCode, 200, 'status code must be 200');
    t.deepEqual(users, body, 'users must be returned');
  });

});

test('users#list with params', function (t) {
  t.plan(3);

  var users = helper.loadFixture('users').filter(function (a) {
    return a.first_name === 'User';
  });

  helper
    .api('GET', 'users', { name: 'User' })
    .reply(200, users, { 'Content-Type': 'application/json '});

  client.users.list({ name: 'User' }, function (err, res, body) {
    t.error(err, 'error must be null');
    t.equal(res.statusCode, 200, 'status code must be 200');
    t.deepEqual(users, body, 'users must be returned');
  });

});
