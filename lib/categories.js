'use strict';

module.exports = function categories(request) {

  /**
   * Gets an category by id
   *
   * @param {string} id - Id of the category
   * @param {function} callback - result handler
   */
  function get(id, callback) {
    if (typeof id !== 'string') {
      throw new Error('an category id is required');
    }

    if (typeof callback !== 'function') {
      throw new Error('a callback is required');
    }

    var route = 'categories/' + id;
    request('GET', route, {}, callback);
  }

  /**
   * Lists categories
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

    request('GET', 'categories', options, callback);
  }

  /**
   * Saves an category
   *
   * @param {object} category - An category object:
   *                              - name
   *                             is required
   * @param {function} callback - result handler
   */
  function save(category, callback) {
    if (typeof category !== 'object') {
      throw new Error('an category is required');
    }

    if (typeof callback !== 'function') {
      throw new Error('a callback is required');
    }

    if (!category.name) {
      throw new Error('name is required');
    }

    request('POST', 'categories', category, callback);
  }

  return {
    get: get,
    list: list,
    save: save
  };
};
