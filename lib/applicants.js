'use strict';

module.exports = function applicants(request) {

  /**
   * Gets an applicant by id
   *
   * @param {string} id - Id of the applicant
   * @param {function} callback - result handler
   */
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

  /**
   * Lists applicants
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

    request('GET', 'applicants', options, callback);
  }

  /**
   * Saves an applicant
   *
   * @param {object} applicant - An applicant object:
   *                              - first_name
   *                              - last_name
   *                              - email
   *                             are required
   * @param {function} callback - result handler
   */
  function save(applicant, callback) {
    if (typeof applicant !== 'object') {
      throw new Error('an applicant is required');
    }

    if (typeof callback !== 'function') {
      throw new Error('a callback is required');
    }

    if (!applicant.first_name) {
      throw new Error('first_name is required');
    }

    if (!applicant.last_name) {
      throw new Error('last_name is required');
    }

    if (!applicant.email) {
      throw new Error('email is required');
    }

    request('POST', 'applicants', applicant, callback);
  }

  return {
    get: get,
    list: list,
    save: save
  };
};
