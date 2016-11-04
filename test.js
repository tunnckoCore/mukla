/*!
 * mukla <https://github.com/tunnckoCore/mukla>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var test = require('assertit')
var mukla = require('./index')
var capture = require('capture-stream')

test('should throw TypeError if not at least function passed', function (done) {
  function fixture () {
    mukla(123)
  }
  test.throws(fixture, TypeError)
  test.throws(fixture, /expect at least `fn` be function/)
  done()
})

test('should expose function', function (done) {
  test.strictEqual(typeof mukla, 'function')
  done()
})

test('should expose assert methods', function (done) {
  test.strictEqual(typeof mukla.strictEqual, 'function')
  test.strictEqual(typeof mukla.deepEqual, 'function')
  test.strictEqual(typeof mukla.equal, 'function')
  test.strictEqual(typeof mukla.ok, 'function')
  done()
})

test('should be able to have "unnamed" tests when only function passed', function (done) {
  var restore = capture(process.stdout)
  setTimeout(function () {
    mukla(function (done) {
      console.log('foo')
      done()
    })
  }, 1)
  setTimeout(function () {
    var output = restore(true).trim()
    test.strictEqual(/foo/.test(output), true)
    test.strictEqual(/anonymous/.test(output), true)
    done()
  }, 2)
})

test('should be able to pass "named" tests when `name` and `fn` passed', function (done) {
  var restore = capture(process.stdout)
  setTimeout(function () {
    mukla('foo bar test', function (done) {
      console.log('here some assert')
      done()
    })
  }, 1)
  setTimeout(function () {
    var out = restore(true)
    test.ok(/here some assert/.test(out.trim()))
    test.strictEqual(/foo bar test/.test(out.trim()), true)
    done()
  }, 2)
})

// works but architecture not allows cool and easy handling
//
// var path = require('path')
// test('should create TAP-compliant error outputs', function (done) {
//   var restore = capture(process.stdout)
//   setTimeout(function () {
//     mukla('foo bar test', function someMuklaTest (cb) {
//       path.resolve(123)
//       cb()
//     }/* , true */) // pass `true` as third argument to print stack traces
//   }, 1)
//   setTimeout(function () {
//     var out = restore(true)
//     test.ok(/name: TypeError/.test(out))
//     test.ok(/message: Path must be a string/.test(out))
//     test.ok(/at: Function\.someMuklaTest/.test(out))
//     done()
//   }, 2)
// })
