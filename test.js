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

mukla.on('pass', function(test) {
  console.log('ok %s (%s)', test.title, ms(test.duration).replace(' ', ''));
});
mukla.on('fail', function(test) {
  console.log('not ok %s (%s)', test.title, ms(test.duration).replace(' ', ''));
});
mukla.on('end', function(stats) {
  console.log();
  console.log('\u001b[32mpassing', stats.passing + '\u001b[39m');
  console.log('\u001b[31mfailing', stats.failing + '\u001b[39m');
  console.log('----------');
  console.log('\u001b[90mtotal  ', stats.tests + '\u001b[39m');
});

var sasa = mukla.describe;
var da = mukla.it;

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
