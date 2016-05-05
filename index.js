/*!
 * mukla <https://github.com/tunnckoCore/mukla>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var utils = require('./utils')

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
 * // without need to call `done`
 * // with `anonymous` title
 * test(function () {
 *   test.ok(555)
 * })
 *
 * // ES2015 successful test
 * // with `anonymous` title
 * test((done) => {
 *   test.strictEqual(1, 1)
 *   done()
 * })
 *
 * // returning rejected promise
 * test('should be failing test', () => {
 *   return Promise.reject(new Error('oooh no!'))
 * })
 *
 * // regular test, returning (promise) another test
 * test('old school javascript', function () {
 *   test.deepEqual([1, 2, 3], [1, 2, 3]) // pass
 *
 *   return test('nested?', function (done) {
 *     mukla.deepEqual([1, 2, 3], 555)
 *     // => throws and shows `nested?` as title, not the other
 *     done()
 *   })
 * })
 * ```
 *
 * @param  {String|Function} `name` The name of the test or `fn`.
 * @param  {Function=} `[fn]` Test function, wrapped in promise.
 * @return {Promise}
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

  return utils.relike.call(this, fn)
    .then(
      mukla.onSuccess(name, fn),
      mukla.onFailure(name, fn)
    )
    .catch(function (err) {
      console.error(err && err.stack)
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
    if (mukla.emit) mukla.emit('pass', name, fn)
    else console.log('', utils.successSymbol, name)
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
    if (mukla.emit) mukla.emit('fail', err, name, fn)
    else console.log('', utils.errorSymbol, name)

    var codes = utils.failingCode(err)
    var code = codes[1]
    var at = code.filename + ':' + code.line + ':' + code.col

    console.error('  -----')
    console.error('  ', err.toString())
    console.error('     at:', at)
    console.error('   line:', code.code)
    console.error('  -----')
    process.exit(1)
  }
}
