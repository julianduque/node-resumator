'use strict';

module.exports = function applicants(request) {

  function get(id, callback) {
    if (typeof id !== 'string') {
      throw new Error('an applicant id is required');
    }

    if (typeof callback !== 'function') {
      throw new Error('a callback is required');
    }

    var route = 'applicants/' + id;
    request('GET', route, {}, callback);
  }

  function list(options, callback) {
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }

    if (typeof callback !== 'function') {
      throw new Error('a callback is required');
    }

    request('GET', 'applicants', options, callback);
  }

  return {
    get: get,
    list: list
  };
};
