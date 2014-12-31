'use strict';

module.exports = function notes(request) {

  /**
   * Saves a note
   *
   * @param {object} applicant - A note object:
   *                              - applicant_id
   *                             are required
   * @param {function} callback - result handler
   */
  function save(note, callback) {
    if (typeof note !== 'object') {
      throw new Error('a note is required');
    }

    if (!note.applicant_id) {
      throw new Error('applicant_id is required');
    }

    if (typeof callback !== 'function') {
      throw new Error('a callback is required');
    }

    request('POST', 'notes', note, callback);
  }

  return {
    save: save
  };
};
