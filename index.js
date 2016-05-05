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
    name = 'anonymous'
  }
  if (typeof fn !== 'function') {
    throw new TypeError('mukla: expect at least `fn` be function')
  }

  var time = utils.timediff()
  time.start(name)

  return utils.relike.call(this, fn).then(
    onSuccess(name, fn, time),
    onFailure(name, fn, time)
  ).catch(console.error)
}

function onSuccess (name, fn, time) {
  return function pass () {
    if (mukla.reporter && mukla.reporter.emit) {
      mukla.reporter.emit('pass', name, fn)
      return
    }
    time.diff(name, 'success')
  }
}

function onFailure (name, fn, time) {
  return function fail (err) {
    if (mukla.reporter && mukla.reporter.emit) {
      mukla.reporter.emit('fail', err, name, fn)
      return
    }
    time.diff(name, 'error')

    var codes = utils.failingCode(err)
    var code = codes[1]
    var at = code.filename + ':' + code.line + ':' + code.col

    console.error('  -----')
    console.error('  ', err.toString())
    console.error('   at:', at)
    console.error('  -----')
    console.error('')
  }
}
