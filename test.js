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

var arr = [1, 2, {four: 'five'}]
var abc = [1, 2, {four: 'five'}]

var obj = {one: 111, two: [1,2,3]}
var met = {one: 111, two: [1,2,3]}

mukla('some title for test', function() {
  mukla('should one + one be strict equal to 2').strictEqual(1 + 1, 2);
  mukla('should arr deepEqual to abc').deepEqual(arr, abc);
  mukla('some nested testing', function() {
    var p = mukla('fake data').ok(true);
    mukla('should mukla(str) methods returns promise').strictEqual(typeof  p.then, 'function')
    mukla('should two + two be strict equal to 4').strictEqual(2 + 2, 4);
    mukla('should `obj` deepEqual to `met`').deepEqual(obj, met);
  })
  mukla('should `obj` be typeof object').strictEqual(typeof obj, 'object');
})

// or just asserts
var str = 'some long string'
mukla('should `str` be typeof of string').strictEqual(typeof str, 'string');
mukla('should be truthy value').ok(str);


// mukla('should throw', function() {
//   function fixture() {
//     hybridify('string cannot');
//   }
//   mukla('when first argument not a function').throws(fixture, TypeError)
// });

// mukla('should work with callback api only', function() {
//   hybridGot('http://todomvc.com', function(err, res) {
//     mukla('should `err` be `null` (callback api)').strictEqual(err, null);
//     mukla('should `res[0]` starts with `<` (callback api)').strictEqual(res[0][0], '<');
//     mukla('should `res[1]` be truthy value (callback api)').ok(res[1]);
//   });
// });

// mukla('should work with promise api only', function() {
//   hybridGot('http://todomvc.com').then(function(res) {
//     // promise api
//     mukla('should `res[0]` starts with `<` (promise api)').strictEqual(res[0][0], '<');
//     mukla('should `res[1]` be truthy value (promise api)').ok(res[1]);
//   });
// });


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
