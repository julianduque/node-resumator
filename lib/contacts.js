'use strict';

module.exports = function contacts(request) {

  /**
   * Gets an contact by id
   *
   * @param {string} id - Id of the contact
   * @param {function} callback - result handler
   */
  function get(id, callback) {
    if (typeof id !== 'string') {
      throw new Error('an contact id is required');
    }

    if (typeof callback !== 'function') {
      throw new Error('a callback is required');
    }

    var route = 'contacts/' + id;
    request('GET', route, {}, callback);
  }

  /**
   * Lists contacts
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

    request('GET', 'contacts', options, callback);
  }

  return {
    get: get,
    list: list
  };
};
