/*!
 * mukla <https://github.com/tunnckoCore/mukla>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var exit = process.exit
var util = require('util')
var utils = require('./utils')
var stackUtils = new utils.StackUtils()

/**
 * > Runs `fn` test and outputs the `name` of the test.
 * If only function is given and it is anonymous, the
 * name of the test is `anonymous`, otherwise the name
 * of the `fn` function.
 *
 * **Example**
 *
 * ```js
 * var test = require('mukla')
 *
 * // regular failing test
 * test('title of test', function (done) {
 *   test.strictEqual(1, 2)
 *   done()
 * })
 *
 * // ES2015 successful test
 * // with `anonymous` title
 * test(done => {
 *   test.strictEqual(1, 1)
 *   done()
 * })
 *
 * // returning rejected promise
 * test('should be failing test', () => {
 *   return Promise.reject(new Error('oooh no!'))
 * })
 *
 * // returning failing stream
 * test('should be failing test', function () {
 *   return fs.createReadStream('foo not exist')
 * })
 * ```
 *
 * @param  {String|Function} `name` The name of the test or `fn`.
 * @param  {Function=} `[fn]` Test function, wrapped in [async-done][], can be 1st argument.
 * @api public
 */

var mukla = module.exports = function mukla (name, fn) {
  if (typeof name === 'function') {
    fn = name
    name = null
  }
  if (typeof fn !== 'function') {
    throw new TypeError('mukla: expect at least `fn` be function')
  }
  name = name || utils.getFnName(fn) || 'anonymous'
  mukla.emit = mukla.reporter && mukla.reporter.emit || null
  mukla.emit = typeof mukla.emit === 'function' ? mukla.emit : null

  utils.asyncDone(fn.bind(this || mukla.context), function (err, res) {
    if (err) return mukla.onFailure(name, fn)(err)
    mukla.onSuccess(name, fn)()
  })
}

/**
 * Extending `mukla` with `core-assert` methods.
 *
 * @api private
 */

utils.extendShallow(mukla, utils.coreAssert)

/**
 * > When test is successful.
 *
 * @param  {String}   `name`
 * @param  {Function} `fn`
 * @return {Function}
 * @api private
 */

mukla.onSuccess = function onSuccess (name, fn) {
  return function pass () {
    if (mukla.emit) {
      mukla.emit('pass', name, fn)
      return
    }
    console.log('', utils.successSymbol, name)
  }
}

/**
 * > When test is failure.
 *
 * @param  {String}   `name`
 * @param  {Function} `fn`
 * @return {Function}
 * @api private
 */

mukla.onFailure = function onFailure (name, fn) {
  /* istanbul ignore next */
  return function fail (err) {
    if (mukla.emit) {
      mukla.emit('fail', err, name, fn)
      return
    }
    var stack = stackUtils.clean(err.stack)
    var newline = stack.indexOf('\n')

    console.error('', utils.errorSymbol, name)
    console.error(' ---')
    console.error('', err.toString())
    console.error('       at:', stack.slice(0, newline))

    if (utils.hasOwn(err, 'actual')) {
      console.error('   actual:', util.inspect(err.actual))
    }
    if (utils.hasOwn(err, 'expected')) {
      console.error(' expected:', util.inspect(err.expected))
    }

    console.error(' ---')
    exit(1)
  }
}
