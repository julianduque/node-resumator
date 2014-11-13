'use strict';

var test   = require('tape');
var helper = require('../helper');
var client = helper.createClient();

test('contacts', function (t) {
  t.equal(typeof client.contacts, 'object', 'client.contacts must be an object');
  t.end();
});

test('contacts#get', function (t) {
  t.plan(6);

  t.equal(typeof client.contacts.get, 'function', 'client.contacts.get must be a function');

  t.throws(function () {
    client.contacts.get();
  }, /an contact id is required/, 'contact id is required');

  t.throws(function () {
    client.contacts.get('test_id');
  }, /a callback is required/, 'callback is required');

  var contact = helper.loadFixture('contacts').filter(function (a) {
    return a.id === 'contact_01';
  });

  helper
    .api('GET', 'contacts/contact_01')
    .reply(200, contact, { 'Content-Type': 'application/json' });

  client.contacts.get('contact_01', function (err, res, body) {
    t.error(err, 'error must be null');
    t.equal(res.statusCode, 200, 'status code must be 200');
    t.deepEqual(contact, body, 'contact must be returned');
  });

});

test('contacts#list', function (t) {
  t.plan(6);

  t.equal(typeof client.contacts.list, 'function', 'client.contacts.list must be a function');

  t.throws(function () {
    client.contacts.list();
  }, /a callback is required/, 'callback is required');

  t.throws(function () {
    client.contacts.list({ name: 'test' });
  }, /a callback is required/, 'callback is required');

  var contacts = helper.loadFixture('contacts');

  helper
    .api('GET', 'contacts')
    .reply(200, contacts, { 'Content-Type': 'application/json '});

  client.contacts.list(function (err, res, body) {
    t.error(err, 'error must be null');
    t.equal(res.statusCode, 200, 'status code must be 200');
    t.deepEqual(contacts, body, 'contacts must be returned');
  });

});

test('contacts#list with params', function (t) {
  t.plan(3);

  var contacts = helper.loadFixture('contacts').filter(function (a) {
    return a.date_created === '2014-11-11';
  });

  helper
    .api('GET', 'contacts', { from_date: '2014-11-11' })
    .reply(200, contacts, { 'Content-Type': 'application/json '});

  client.contacts.list({ from_date: '2014-11-11' }, function (err, res, body) {
    t.error(err, 'error must be null');
    t.equal(res.statusCode, 200, 'status code must be 200');
    t.deepEqual(contacts, body, 'contacts must be returned');
  });

});
