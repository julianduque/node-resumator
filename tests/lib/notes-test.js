'use strict';

var test   = require('tape');
var clone  = require('clone');
var util   = require('util');
var helper = require('../helper');
var client = helper.createClient();
var noop   = function () {};

test('notes', function (t) {
  t.equal(typeof client.notes, 'object', 'client.notes must be an object');
  t.end();
});

test('notes#save', function (t) {
  t.plan(7);

  var note = {
    applicant_id: 'prospect_01',
    contents: 'This is a note'
  };

  t.equal(typeof client.notes.save, 'function', 'notes.save must be a function');

  t.throws(function () {
    client.notes.save();
  }, /a note is required/, 'note is required');

  t.throws(function () {
    client.notes.save(note);
  }, /a callback is required/, 'callback is required');


  checkRequired('applicant_id');

  function checkRequired(property) {
    t.throws(function () {
      var a = clone(note);
      delete a[property];
      client.notes.save(a, noop);
    }, /.+ is required/, util.format('%s is required', property));
  }

  var commentId = { 'comment_id': 'comment_01 '};

  helper
    .api('POST', 'notes', note)
    .reply(200, commentId , { 'Content-Type': 'application/json '});

  client.notes.save(note, function (err, res, body) {
    t.error(err, 'error must be null');
    t.equal(res.statusCode, 200, 'status code must be 200');
    t.deepEqual(commentId, body, 'note must be returned');
  });

});
