module.exports = function (source) {
  // no app code should be importing test code, so remove exports
  return source.replace(/export \* from '\.\/__test-utils__';/g, '');
};
