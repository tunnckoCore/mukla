/*!
 * mukla <https://github.com/tunnckoCore/mukla>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var utils = require('./utils')

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

mukla.onSuccess = function onSuccess (name, fn) {
  return function pass () {
    if (mukla.emit) mukla.emit('pass', name, fn)
    else console.log('', utils.successSymbol, name)
  }
}

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

utils.extendShallow(mukla, utils.coreAssert)
