module.exports = function() {
  var randNum = Math.floor(Math.random() * 4294967296);
  return function(num) {
    if (num > randNum) return 'gt';
    if (num < randNum) return 'lt';
    if (num === randNum) return 'eq';
  };
};
