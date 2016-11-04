'use strict'

/**
 * Module dependencies
 */

var util = require('util')
var path = require('path')
var utils = require('lazy-cache')(require)

/**
 * Temporarily re-assign `require` to trick browserify and
 * webpack into reconizing lazy dependencies.
 *
 * This tiny bit of ugliness has the huge dual advantage of
 * only loading modules that are actually called at some
 * point in the lifecycle of the application, whilst also
 * allowing browserify and webpack to find modules that
 * are depended on but never actually called.
 */

var fn = require
require = utils // eslint-disable-line no-undef, no-native-reassign, no-global-assign

/**
 * Lazily required module dependencies
 */

require('always-done')
require('core-assert')
require('clean-stack')
require('error-symbol')
require('extend-shallow')
require('get-fn-name')
require('success-symbol')

/**
 * Restore `require`
 */

require = fn // eslint-disable-line no-undef, no-native-reassign, no-global-assign

utils.hasOwn = function hasOwn (self, key) {
  return Object.prototype.hasOwnProperty.call(self, key)
}

utils.diag = function diagnostic (err, showStack) {
  var res = ''

  // get message, or toString error object
  var msg = err.message && err.message.length
    ? err.message
    : err.toString()

  // ensure stack exists
  var stack = err.stack && err.stack.length
    ? utils.cleanStack(err.stack)
    : null

  // modify the cleaned up stacktrace if exist
  var lines = stack
    ? stack.split('\n').map(function (line) {
      // transform to relative paths
      var m = /.*\((.*)\).*/.exec(line)
      line = m && m[1]
        ? line.replace(m[1], path.relative(process.cwd(), m[1]))
        : line

      // handle correct ident of each line
      return utils.ident('  ' + line, true)
    })
    : []

  // get `at` position from first of "at" lines
  var at = lines.length
    ? lines[1].trim().slice(3)
    : null

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

  res = at ? res + utils.ident('at: ' + at) : res

  // print stack trace if `showStack` option is `true`
  if (showStack && stack) {
    res += utils.ident('stack:\n' + lines.join('\n'))
  }

  res += utils.ident('...', true)
  return '  ---\n' + res
}

utils.ident = function ident (str, last) {
  return '  ' + str + (last ? '' : '\n')
}

/**
 * Expose `utils` modules
 */

module.exports = utils
