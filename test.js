/**
 * mukla <https://github.com/tunnckoCore/mukla>
 *
 * Copyright (c) 2014-2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict';

var mukla = require('./index');
var hybridify = require('hybridify');
var got = require('got');
var hybridGot = hybridify(got.get);


mukla('should throw', function() {
  function fixture() {
    hybridify('string cannot');
  }
  mukla('when first argument not a function').throws(fixture, TypeError)
});

mukla('should work with callback api only', function() {
  hybridGot('http://todomvc.com', function(err, res) {
    mukla('should `err` be `null` (callback api)').strictEqual(err, null);
    mukla('should `res[0]` starts with `<` (callback api)').strictEqual(res[0][0], '<');
    mukla('should `res[1]` be truthy value (callback api)').ok(res[1]);
  });
});

mukla('should work with promise api only', function() {
  hybridGot('http://todomvc.com').then(function(res) {
    // promise api
    mukla('should `res[0]` starts with `<` (promise api)').strictEqual(res[0][0], '<');
    mukla('should `res[1]` be truthy value (promise api)').ok(res[1]);
  });
});


// mukla('should work with both callback and promise api', function() {
//   hybridGot('http://todomvc.com', function(err, res) {
//     mukla('should `err` be `null` (callback)').equal(err, null);
//     mukla('should `res[0]` starts with `<` (callback)').equal(res[0][0], '<');
//     mukla('should `res[1]` be truthy value (callback)').truthy(res[1]);
//   })
//   .then(function(res) {
//     mukla('should `res[0]` starts with `<` (promise)').equal(res[0][0], '<');
//     mukla('should `res[1]` be truthy value (promise)').truthy(res[1]);
//   });
// });

// mukla('should every hybrid has `.hybridify` method', function() {
//   hybridGot('https://github.com');

//   mukla('should be equal').equal(typeof hybrid.hybridify, 'function');
//   mukla('should be equal').equal(typeof hybridGot.hybridify, 'function');
// });

// mukla('should every hybrid be Promise and has `.then` and `.catch` methods', function() {
//   var hybrid = hybridGot('https://github.com');

//   mukla('should be equal').equal(typeof hybrid.then, 'function');
//   mukla('should be equal').equal(typeof hybrid.catch, 'function');
//   mukla('should be equal').equal(typeof hybrid.hybridify, 'function');
//   mukla('should be equal').equal(typeof hybridGot.hybridify, 'function');
// });
