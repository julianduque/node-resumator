'use strict';

module.exports = function tasks(request) {

  /**
   * Gets an task by id
   *
   * @param {string} id - Id of the task
   * @param {function} callback - result handler
   */
  function get(id, callback) {
    if (typeof id !== 'string') {
      throw new Error('an task id is required');
    }

    if (typeof callback !== 'function') {
      throw new Error('a callback is required');
    }

    var route = 'tasks/' + id;
    request('GET', route, {}, callback);
  }

  /**
   * Lists tasks
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

    request('GET', 'tasks', options, callback);
  }

  return {
    get: get,
    list: list
  };
};
