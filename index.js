/**
 * mukla <https://github.com/tunnckoCore/mukla>
 *
 * Copyright (c) 2014-2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict';

var assert = require('assert')
var chalk = require('chalk');
var logSymbols = require('log-symbols');

var mukla = module.exports = function mukla(title, fn) {
  var promise = Promise.resolve(1);
  if (!fn && typeof fn !== 'function') {
    return mode(title, promise);
  }
  return promise.then(fn.bind(this)).then(function() {
    console.log(logSymbols.success, chalk.grey(title));
  })
  .catch(function(err) {
    console.log(logSymbols.error, chalk.red(title));
  });
}

function mode(subtitle, promise) {
  var o = {};
  Object.keys(assert).forEach(function(method) {
    o[method] = function(actual, expected) {
      return promise.then(function(res) {
        assert[method].apply(assert[method], [actual, expected, subtitle]);
        console.log('  %s %s', logSymbols.success, chalk.grey(subtitle));
        return res;
      })
      .catch(function(err) {
        console.log('  %s %s', logSymbols.error, chalk.grey(subtitle));
        console.log('  ---')
        console.log(chalk.red('  actual: %s'), JSON.stringify(err.actual, 0,0))
        console.log(chalk.green('  expected: %s'), JSON.stringify(err.expected, 0,0))
        console.log('  operator: %s', err.operator)
        console.log('  ---')
      });
    }
  });
  return o;
}
