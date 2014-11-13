'use strict';

var test   = require('tape');
var clone  = require('clone');
var util   = require('util');
var helper = require('../helper');
var client = helper.createClient();
var noop   = function () {};

test('categories', function (t) {
  t.equal(typeof client.categories, 'object', 'client.categories must be an object');
  t.end();
});

test('categories#get', function (t) {
  t.plan(6);

  t.equal(typeof client.categories.get, 'function', 'client.categories.get must be a function');

  t.throws(function () {
    client.categories.get();
  }, /an category id is required/, 'category id is required');

  t.throws(function () {
    client.categories.get('test_id');
  }, /a callback is required/, 'callback is required');

  var category = helper.loadFixture('categories').filter(function (a) {
    return a.id === 'category_01';
  });

  helper
    .api('GET', 'categories/category_01')
    .reply(200, category, { 'Content-Type': 'application/json' });

  client.categories.get('category_01', function (err, res, body) {
    t.error(err, 'error must be null');
    t.equal(res.statusCode, 200, 'status code must be 200');
    t.deepEqual(category, body, 'category must be returned');
  });

});

test('categories#list', function (t) {
  t.plan(6);

  t.equal(typeof client.categories.list, 'function', 'client.categories.list must be a function');

  t.throws(function () {
    client.categories.list();
  }, /a callback is required/, 'callback is required');

  t.throws(function () {
    client.categories.list({ name: 'test' });
  }, /a callback is required/, 'callback is required');

  var categories = helper.loadFixture('categories');

  helper
    .api('GET', 'categories')
    .reply(200, categories, { 'Content-Type': 'application/json '});

  client.categories.list(function (err, res, body) {
    t.error(err, 'error must be null');
    t.equal(res.statusCode, 200, 'status code must be 200');
    t.deepEqual(categories, body, 'categories must be returned');
  });

});

test('categories#list with params', function (t) {
  t.plan(3);

  var categories = helper.loadFixture('categories').filter(function (a) {
    return a.name === 'category';
  });

  helper
    .api('GET', 'categories', { name: 'category' })
    .reply(200, categories, { 'Content-Type': 'application/json '});

  client.categories.list({ name: 'category'}, function (err, res, body) {
    t.error(err, 'error must be null');
    t.equal(res.statusCode, 200, 'status code must be 200');
    t.deepEqual(categories, body, 'categories must be returned');
  });

});

test('categories#save', function (t) {
  t.plan(7);

  var category = {
    name: 'category',
    status: '1'
  };

  t.equal(typeof client.categories.save, 'function', 'categories.save must be a function');

  t.throws(function () {
    client.categories.save();
  }, /an category is required/, 'category is required');

  t.throws(function () {
    client.categories.save(category);
  }, /a callback is required/, 'callback is required');


  checkRequired('name');

  function checkRequired(property) {
    t.throws(function () {
      var a = clone(category);
      delete a[property];
      client.categories.save(a, noop);
    }, /.+ is required/, util.format('%s is required', property));
  }

  var categoryId = { "category_id": "category_01 "};

  helper
    .api('POST', 'categories', category)
    .reply(200, categoryId , { 'Content-Type': 'application/json '});

  client.categories.save(category, function (err, res, body) {
    t.error(err, 'error must be null');
    t.equal(res.statusCode, 200, 'status code must be 200');
    t.deepEqual(categoryId, body, 'categories must be returned');
  });

});
