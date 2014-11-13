'use strict';

var test   = require('tape');
var helper = require('../helper');
var client = helper.createClient();

test('tasks', function (t) {
  t.equal(typeof client.tasks, 'object', 'client.tasks must be an object');
  t.end();
});

test('tasks#get', function (t) {
  t.plan(6);

  t.equal(typeof client.tasks.get, 'function', 'client.tasks.get must be a function');

  t.throws(function () {
    client.tasks.get();
  }, /an task id is required/, 'task id is required');

  t.throws(function () {
    client.tasks.get('test_id');
  }, /a callback is required/, 'callback is required');

  var task = helper.loadFixture('tasks').filter(function (a) {
    return a.id === 'task_01';
  });

  helper
    .api('GET', 'tasks/task_01')
    .reply(200, task, { 'Content-Type': 'application/json' });

  client.tasks.get('task_01', function (err, res, body) {
    t.error(err, 'error must be null');
    t.equal(res.statusCode, 200, 'status code must be 200');
    t.deepEqual(task, body, 'task must be returned');
  });

});

test('tasks#list', function (t) {
  t.plan(6);

  t.equal(typeof client.tasks.list, 'function', 'client.tasks.list must be a function');

  t.throws(function () {
    client.tasks.list();
  }, /a callback is required/, 'callback is required');

  t.throws(function () {
    client.tasks.list({ name: 'test' });
  }, /a callback is required/, 'callback is required');

  var tasks = helper.loadFixture('tasks');

  helper
    .api('GET', 'tasks')
    .reply(200, tasks, { 'Content-Type': 'application/json '});

  client.tasks.list(function (err, res, body) {
    t.error(err, 'error must be null');
    t.equal(res.statusCode, 200, 'status code must be 200');
    t.deepEqual(tasks, body, 'tasks must be returned');
  });

});

test('tasks#list with params', function (t) {
  t.plan(3);

  var tasks = helper.loadFixture('tasks').filter(function (a) {
    return a.status === 'In Progress';
  });

  helper
    .api('GET', 'tasks', { status: 'In Progress' })
    .reply(200, tasks, { 'Content-Type': 'application/json '});

  client.tasks.list({ status: 'In Progress' }, function (err, res, body) {
    t.error(err, 'error must be null');
    t.equal(res.statusCode, 200, 'status code must be 200');
    t.deepEqual(tasks, body, 'tasks must be returned');
  });

});
