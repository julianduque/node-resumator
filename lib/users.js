'use strict';

module.exports = function users(request) {

  /**
   * Gets an user by id
   *
   * @param {string} id - Id of the user
   * @param {function} callback - result handler
   */
  function get(id, callback) {
    if (typeof id !== 'string') {
      throw new Error('an user id is required');
    }

    if (typeof callback !== 'function') {
      throw new Error('a callback is required');
    }

    var route = 'users/' + id;
    request('GET', route, {}, callback);
  }

  /**
   * Lists users
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

    request('GET', 'users', options, callback);
  }

  return {
    get: get,
    list: list
  };
};
