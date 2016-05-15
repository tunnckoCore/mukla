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

require('async-done')
require('core-assert')
require('error-symbol')
require('extend-shallow')
require('get-fn-name')
require('stack-utils', 'StackUtils')
require('success-symbol')

/**
 * Restore `require`
 */

require = fn // eslint-disable-line no-undef, no-native-reassign

utils.hasOwn = function hasOwn (self, key) {
  return Object.prototype.hasOwnProperty.call(self, key)
}

/**
 * Expose `utils` modules
 */

module.exports = utils
