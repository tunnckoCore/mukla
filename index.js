/**
 * mukla <https://github.com/tunnckoCore/mukla>
 *
 * Copyright (c) 2014-2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict';

var assert = require('assert');
var globby = require('globby');
// var Ware = require('ware'); // ???
var format = require('util').format;
var eachAsync = require('each-async');
var Deferred = require('native-or-another');
var errs = require('handle-errors')('mukla');
var EventEmitter = require('events').EventEmitter;

module.exports = Mukla;

function Mukla(heading, options) {
  if (!(this instanceof Mukla)) {
    return new Mukla(heading, opts);
  }
  this.options = options || {};
  this.scenario = 1;
  this.count = 0;
  this.fail = 0;
  this.pass = 0;
  this.store = [];
  this.deferred = new Deferred();
  this.promise = this.deferred.resolve('');

  this.defaultOptions();
};

/**
 * > Initialize default options
 *
 * @api private
 */
Mukla.prototype.defaultOptions = function defaultOptions() {
  var self = this;
  this.options.runner = this.options.runner; // todo || new EventEmitter()
  this.options.reporter = this.options.reporter; //todo || new Reporter()
  this.options.files = [];
  globby(['./test.js', './*.test.js', './test'], function(err, files) {
    if (!err) {
      self.options.files.concat(files);
    }
    throw err;
  })
};

/**
 * > Add a `plugin` to the middleware stack.
 *
 * @param {Function|Array|Ware} `plugin`
 * @return {Mukla}
 * @api public
 */
// ???
// Mukla.prototype.use = function use(plugin){
//   this.ware.use(plugin);
//   return this;
// };

/**
 * > Run all test suites or specify their order of running.
 *
 * @param {Object} `files`
 * @return {Object}
 * @api public
 */

Mukla.prototype.run = function run() {};

/**
 * > Add test suite to the stack
 *
 * @param  {String}   `<title>`
 * @param  {Function} `[fn]`
 * @param  {Number}   `[id]`
 * @return {Mukla}
 * @api public
 */
Mukla.prototype.describe =
Mukla.prototype.when =
Mukla.prototype.should = function should(title, fn, id) {
  if (!title) {
    errs.error('`.should` method expect at least 1 argument - string');
  }

  return this;
};

/**
 * > Add test to the suite
 *
 * @param  {String}   `<title>`
 * @param  {Function} `<fn>`
 * @return {Mukla}
 * @api public
 */
Mukla.prototype.it =
Mukla.prototype.test =
Mukla.prototype.then = function then(title, fn) {
  if (!fn) {
    errs.error('`.then/.be` method at least 2 arguments - string and function');
  }

  return this;
};

/**
 * > Add test to the suite
 *
 * @param  {String}   `<title>`
 * @param  {Function} `<fn>`
 * @return {Mukla}
 * @api public
 */
Mukla.prototype.be = function be(title, fn) {
  this.then('be ' + title, fn);
  return this;
}


eachAsync(assert, function(method) {
  Mukla.prototype[method] = function(title, actual, expected) {
    var self = this;
    var emit = this.options.runner.emit;
    var o = {
      type: 'assert',
      title: title,
      pass: false,
      fail: false,
      id: 0
    };

    this.promise
    .then(function() {
      assert[method].apply(assert[method], [actual, expected, title]);
      o.pass = true;
      emit('pass', o);
      emit('assert', o);
      emit('assert pass', o);
    })
    .catch(function(err) {
      emit('error', err);
      o.fail = true;
      emit('fail', o);
      emit('assert', o);
      emit('assert fail', o);
    });

    return self;
  };
});

// possible:
// mukla().equal(title, actual, expected) // scenario 1
// mukla().should(title).equal(title, actual, expected) // scenario 2
// mukla().should(title, fn) // scenario 3
// mukla().then(title, fn) // scenario 4
// mukla().should(title).then(title, fn) // scenario 5
// mukla().should(title).then(title, fn).then(title, fn)

// .should and .then emits `suite`
// .equal emit `assert`, `assert pass`, `assert fail`, `pass` and `fail`
