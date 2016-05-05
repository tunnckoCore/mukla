'use strict'

/**
 * Module dependencies
 */

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
require = utils // eslint-disable-line no-undef, no-native-reassign

/**
 * Lazily required module dependencies
 */

require('core-assert', 'assert')
require('error-symbol', 'error')
require('extend-shallow', 'extend')
require('failing-code')
require('relike')
require('success-symbol', 'success')
require('time-diff', 'Time')

/**
 * Restore `require`
 */

require = fn // eslint-disable-line no-undef, no-native-reassign

utils.timediff = function timediff () {
  var time = new utils.Time()
  var res = {}
  res.start = time.start.bind(time)
  res.diff = function diff (name, type) {
    return time.diff(name, {
      nocolor: true,
      formatArgs: function (ts, name, elapsed) {
        return ['', utils[type], name, '(' + elapsed + ')']
      }
    })()
  }
  return res
}

/**
 * Expose `utils` modules
 */

module.exports = utils
