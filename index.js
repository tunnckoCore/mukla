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
var errs = require('handle-errors')('mukla');

module.exports = Mukla;

function Mukla(heading, options) {
  if (!(this instanceof Mukla)) {
    return new Mukla(heading, opts);
  }
  this.id = 0;
  this.title = 'unnamed test ' + this.id;
  this.heading = heading || 'mukla testing:';

  // this.ware = new Ware();
  this.store = [];
  this.options = options || {};
  this.current = false;
  this.isShould = false;
  this.isThen = false;
  this.isAssertion = false;

  this.defaultOptions();
};

/**
 * > Initialize default options
 *
 * @api private
 */
Mukla.prototype.defaultOptions = function defaultOptions() {
  var self = this;
  this.options.runner = new EventEmitter();
  this.options.reporter = new Reporter(this.options.runner, this.options);
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
  if (typeof fn === 'number') {
    id = fn;
    fn = undefined;
  }

  id = this.id = id ? id : this.store.length + 1;

  if (this.store[id].id === id) {
    errs.error(format('this `%s` test id already exist', id);
  }

  this.current = {
    suite: true,
    test: fn ? fn : false,
    assertion: false,
    title: title,
    fn: fn,
    id: id
  };
  if (fn) {
    this.store.push(this.current);
    this.current = false;
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

  if (!this.current) {
    //todo this.current
  }

  this.store.push(test);
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
