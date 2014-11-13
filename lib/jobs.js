'use strict';

module.exports = function jobs(request) {

  /**
   * Gets an job by id
   *
   * @param {string} id - Id of the job
   * @param {function} callback - result handler
   */
  function get(id, callback) {
    if (typeof id !== 'string') {
      throw new Error('an job id is required');
    }

    if (typeof callback !== 'function') {
      throw new Error('a callback is required');
    }

    var route = 'jobs/' + id;
    request('GET', route, {}, callback);
  }

  /**
   * Lists jobs
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

    request('GET', 'jobs', options, callback);
  }

  /**
   * Saves an job
   *
   * @param {object} job - An job object:
   *                              - title
   *                              - hiring_lead_id
   *                              - description
   *                             are required
   * @param {function} callback - result handler
   */
  function save(job, callback) {
    if (typeof job !== 'object') {
      throw new Error('an job is required');
    }

    if (typeof callback !== 'function') {
      throw new Error('a callback is required');
    }

    if (!job.title) {
      throw new Error('title is required');
    }

    if (!job.hiring_lead_id) {
      throw new Error('hiring_lead_id is required');
    }

    if (!job.description) {
      throw new Error('description is required');
    }

    request('POST', 'jobs', job, callback);
  }

  return {
    get: get,
    list: list,
    save: save
  };
};
