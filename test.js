/*!
 * mukla <https://github.com/tunnckoCore/mukla>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

// var Emitter = require('component-emitter')
var assert = require('assert')
var mukla = require('./index')

// var reporter = new Emitter()
// reporter
//   .on('pass', function () {
//     console.log('ok')
//   })
//   .on('fail', function () {
//     console.log('fail')
//   })
// mukla.reporter = reporter

mukla('foo bar baz', function (done) {
  assert.strictEqual(1, 1)
  assert.deepEqual(1, 1)
  done()
})

mukla('qux should be fail', function (done) {
  assert.strictEqual(2222, 2222)
  assert.deepEqual(1, 1111)
  done()
})

mukla('should be okey with async', function (done) {
  setTimeout(function () {
    assert.strictEqual(2, 2)
    done()
  }, Math.random())
})
