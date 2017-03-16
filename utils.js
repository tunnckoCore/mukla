'use strict'

var util = require('util')
var utils = {}

/**
 * Lazily required module dependencies
 */

utils.alwaysDone = require('always-done')
utils.stackMetadata = require('stacktrace-metadata')
utils.coreAssert = require('core-assert')
utils.errorSymbol = require('error-symbol')
utils.extendShallow = require('extend-shallow')
utils.getFnName = require('get-fn-name')
utils.successSymbol = require('success-symbol')

utils.diag = function diagnostic (err, showStack) {
  var res = '  ---\n'

  // get message, or toString error object
  var msg = err.message && err.message.length
    ? err.message
    : err.toString()

  showStack = showStack ? showStack : false // eslint-disable-line no-unneeded-ternary
  err = utils.stackMetadata(err, { showStack: showStack, shortStack: false })

  res += utils.ident('name: ' + err.name)
  res += utils.ident('message: ' + msg)

  // show inspected expected value if exists
  res = err.expected
    ? res + utils.ident('expected: ' + util.inspect(err.expected))
    : res

  // show inspected actual value if exists
  res = err.actual
    ? res + utils.ident('actual: ' + util.inspect(err.actual))
    : res

  res = err.at ? res + utils.ident('at: ' + err.at) : res

  // print stack trace if `showStack` option is `true`
  if (showStack && err.stack) {
    res += utils.ident('stack:\n' + err.stack.split('\n').slice(1).join('\n'))
  }

  res += utils.ident('...', true)
  return res
}

utils.ident = function ident (str, last) {
  return '  ' + str + (last ? '' : '\n')
}

/**
 * Expose `utils` modules
 */

module.exports = utils
