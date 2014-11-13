'use strict';

module.exports = function activities(request) {

  /**
   * Gets an activity by id
   *
   * @param {string} id - Id of the activity
   * @param {function} callback - result handler
   */
  function get(id, callback) {
    if (typeof id !== 'string') {
      throw new Error('an activity id is required');
    }

    if (typeof callback !== 'function') {
      throw new Error('a callback is required');
    }

    var route = 'activities/' + id;
    request('GET', route, {}, callback);
  }

  /**
   * Lists activities
   *
   * @param {object} [options] - Query options
   * @param {function} callback - result handler
   *
   */
  function list(options, callback) {
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }

    if (typeof callback !== 'function') {
      throw new Error('a callback is required');
    }

    request('GET', 'activities', options, callback);
  }

  return {
    get: get,
    list: list
  };
};
