/**
 * mukla <https://github.com/tunnckoCore/mukla>
 *
 * Copyright (c) 2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict';

var Undertaker = require('undertaker');
var inherits = require('util').inherits;

function Mukla() {
  Undertaker.call(this);
  this.suites = 0;
  this.tests = 0;
  this.passing = 0;
  this.failing = 0;
  this.describes = [];
  this._settle = true;
}
inherits(Mukla, Undertaker);

Mukla.prototype.it =
Mukla.prototype.test = function _it(title, fn) {
  if (typeof title !== 'string') {
    throw new TypeError('mukla.it() `title` should be string');
  }
  if (typeof fn !== 'function') {
    throw new TypeError('mukla.it() `fn` should be function');
  }
  if (fn.length !== 1) {
    throw new Error('mukla.it() should be asynchronous.');
  }
  this._setTask(title, fn);
};

Mukla.prototype.it.skip = function _itSkip(title, fn) {
  this.emit('pending', {title: title, fn: fn, duration: 0})
};

Mukla.prototype.describe =
Mukla.prototype.suite = function _describe(title, fn) {
  if (typeof title !== 'string') {
    throw new TypeError('mukla.describe() `title` should be string');
  }
  if (typeof fn !== 'function') {
    throw new TypeError('mukla.describe() `fn` should be function');
  }
  if (fn.length !== 0) {
    throw new Error('mukla.describe() should be synchronous.');
  }
  this.suites++;
  this.describes.push({title: title, fn: fn});
  fn();
  this.run();
};

Mukla.prototype.run = function _run() {
  var self = this;
  var tree = this.tree();
  if (tree.length < 1) {
    throw new Error('mukla.run() should have defined tests.');
  }
  this.emit('start', {init: true});
  var suite = this.describes.shift()

  if (!this.describes.length) {
    self.emit('end', self);
    return;
  }
  self.emit('suite', suite);
  self.series(tree)(function(err, res) {
    self.emit('suite end', suite);
  });

};
Mukla.prototype.Mukla = Mukla;

// var mukla = new Mukla();

// mukla.on('error', function _muklaError(storage) {
//   this.failing++;
//   storage.title = storage.name;
//   this.emit('fail', storage);
//   this.emit('test end', storage);
// });
// mukla.on('stop', function _muklaTestEnd(storage) {
//   this.passing++;
//   storage.title = storage.name;
//   this.emit('pass', storage);
//   this.emit('test end', storage);
// });
// mukla.on('start', function _muklaError(storage) {
//   this.tests++;
//   storage.title = storage.name;
//   this.emit('test', storage);
// });

module.exports = new Mukla();

// start - start of program
// end - end of program
// suite - when `describe` start
// suite end - when `describe` end
// pending - only when `it` skip
// pass - only when `it` pass
// fail - only when `it` fail
// test - always when `it` start
// test end - always when `it` end
