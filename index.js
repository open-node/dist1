#! /usr/bin/env node

var random  = require('./lib/random')
  , todo    = require('./todo')
  , times   = Math.max(+process.argv[2] || 1000, 1)
  , attempt = 0
  , startAt = Date.now()
  , map     = new Map()

var exec = function() {
  if (times === 0) return log();
  times -= 1;
  var rand = random();
  map.set(rand, false);
  todo(function(num) {
    attempt += 1;
    var ret = rand(num);
    if (ret === 'eq' && map.get(rand) === false) {
      process.nextTick(function() {
        map.set(rand, true);
        exec();
      });
    }
    return ret;
  });
};

var log = function() {
  console.log('Complete: ' + Math.max(+process.argv[2] || 1000, 1) + ' times');
  console.log('Time consuming: ' + (Date.now() - startAt) + '(ms)');
  console.log('Attempt times: ' + attempt);
  console.log('Attempt times average: ' + (attempt / Math.max(+process.argv[2] || 1000, 1)));
  process.exit();
};

exec();
