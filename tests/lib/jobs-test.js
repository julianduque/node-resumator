'use strict';

var test   = require('tape');
var clone  = require('clone');
var util   = require('util');
var helper = require('../helper');
var client = helper.createClient();
var noop   = function () {};

test('jobs', function (t) {
  t.equal(typeof client.jobs, 'object', 'client.jobs must be an object');
  t.end();
});

test('jobs#get', function (t) {
  t.plan(6);

  t.equal(typeof client.jobs.get, 'function', 'client.jobs.get must be a function');

  t.throws(function () {
    client.jobs.get();
  }, /an job id is required/, 'job id is required');

  t.throws(function () {
    client.jobs.get('test_id');
  }, /a callback is required/, 'callback is required');

  var job = helper.loadFixture('jobs').filter(function (a) {
    return a.id === 'job_01';
  });

  helper
    .api('GET', 'jobs/job_01')
    .reply(200, job, { 'Content-Type': 'application/json' });

  client.jobs.get('job_01', function (err, res, body) {
    t.error(err, 'error must be null');
    t.equal(res.statusCode, 200, 'status code must be 200');
    t.deepEqual(job, body, 'job must be returned');
  });

});

test('jobs#list', function (t) {
  t.plan(6);

  t.equal(typeof client.jobs.list, 'function', 'client.jobs.list must be a function');

  t.throws(function () {
    client.jobs.list();
  }, /a callback is required/, 'callback is required');

  t.throws(function () {
    client.jobs.list({ title: 'test' });
  }, /a callback is required/, 'callback is required');

  var jobs = helper.loadFixture('jobs');

  helper
    .api('GET', 'jobs')
    .reply(200, jobs, { 'Content-Type': 'application/json '});

  client.jobs.list(function (err, res, body) {
    t.error(err, 'error must be null');
    t.equal(res.statusCode, 200, 'status code must be 200');
    t.deepEqual(jobs, body, 'jobs must be returned');
  });

});

test('jobs#list with params', function (t) {
  t.plan(3);

  var jobs = helper.loadFixture('jobs').filter(function (a) {
    return a.title === 'job';
  });

  helper
    .api('GET', 'jobs', { title: 'job' })
    .reply(200, jobs, { 'Content-Type': 'application/json '});

  client.jobs.list({ title: 'job'}, function (err, res, body) {
    t.error(err, 'error must be null');
    t.equal(res.statusCode, 200, 'status code must be 200');
    t.deepEqual(jobs, body, 'jobs must be returned');
  });

});

test('jobs#save', function (t) {
  t.plan(9);

  var job = {
    title: 'job',
    hiring_lead_id: 'usr_01',
    description: 'A new job'
  };

  t.equal(typeof client.jobs.save, 'function', 'jobs.save must be a function');

  t.throws(function () {
    client.jobs.save();
  }, /an job is required/, 'job is required');

  t.throws(function () {
    client.jobs.save(job);
  }, /a callback is required/, 'callback is required');


  checkRequired('title');
  checkRequired('hiring_lead_id');
  checkRequired('description');

  function checkRequired(property) {
    t.throws(function () {
      var a = clone(job);
      delete a[property];
      client.jobs.save(a, noop);
    }, /.+ is required/, util.format('%s is required', property));
  }

  var jobId = { "job_id": "job_01 "};

  helper
    .api('POST', 'jobs', job)
    .reply(200, jobId , { 'Content-Type': 'application/json '});

  client.jobs.save(job, function (err, res, body) {
    t.error(err, 'error must be null');
    t.equal(res.statusCode, 200, 'status code must be 200');
    t.deepEqual(jobId, body, 'jobs must be returned');
  });

});
