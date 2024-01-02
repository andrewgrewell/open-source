/**
 * This is used to remove the export of test utils from packages.
 * Export test utils is convenient for development and keeps the test utils
 * close to their domain, but we don't want the code included in builds.
 * @param source
 * @returns {*}
 */
module.exports = function (source) {
  // no app code should be importing test code, so remove exports
  return source.replace(/export \* from '\.\/__test-utils__';/g, '');
};
