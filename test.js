/**
 * mukla <https://github.com/tunnckoCore/mukla>
 *
 * Copyright (c) 2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict';

var ms = require('pretty-hrtime');
var assert = require('assert');
var mukla = require('./index');

mukla.once('start', function(stats) {
  if (stats.init) return;
  console.log()
  mukla.removeAllListeners('start')
})
mukla.on('error', function _muklaError(storage) {
  this.failing++;
  storage.title = storage.name;
  this.emit('fail', storage);
  this.emit('test end', storage);
});
mukla.on('stop', function _muklaTestEnd(storage) {
  this.passing++;
  storage.title = storage.name;
  this.emit('pass', storage);
  this.emit('test end', storage);
});
mukla.on('start', function _muklaError(storage) {
  this.tests++;
  storage.title = storage.name;
  this.emit('test', storage);
});
mukla.on('suite', function(suite) {
   console.log('# suite:', suite.title);
});
mukla.on('suite end', function(suite) {
   console.log('# suite end:', suite.title);
});
mukla.on('pass', function(test) {
  console.log('  ok %s (%s)', test.title, test.duration);
});
mukla.on('fail', function(test) {
  console.log('  not ok %s (%s)', test.title, test.duration);
});
mukla.once('end', function(stats) {
  console.log();
  console.log('\u001b[32mpassing', stats.passing + '\u001b[39m');
  console.log('\u001b[31mfailing', stats.failing + '\u001b[39m');
  console.log('----------');
  console.log('\u001b[90mtotal  ', stats.tests + '\u001b[39m');
});

// var describe = mukla.describe;
// var it = mukla.it;

mukla.describe('mukla:', function() {
  mukla.it('test 1', function(done) {
    assert.strictEqual(typeof 123, 'function');
    done();
  });
  mukla.it('test 2', function(done) {
    assert.strictEqual(typeof 2134234, 'function');
    done();
  });
});
// describe('mukla:', function() {
//   it('test 1', function(done) {
//     assert.strictEqual(typeof done, 'function');
//     done();
//   });
//   it('test 2', function(done) {
//     assert.strictEqual(typeof mukla.it, 'function');
//     done();
//   });
// });
