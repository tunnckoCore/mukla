/**
 * mukla <https://github.com/tunnckoCore/mukla>
 *
 * Copyright (c) 2014-2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict';

var mukla = require('./index')

// possible:
// mukla().equal(title, actual, expected)
// mukla().then(title, fn)
// mukla().should(title, fn)
// mukla().should(title).then(title, fn)
// mukla().should(title).then(title, fn).then(title, fn)
// mukla().should(title).equal(title, actual, expected)

// not possible:
//
// cuz', `.then` requires to have `fn`, so chain assertion methods after `.then` are not reasonable
// if you want assertions open new `.should` or just put them on `.then`s `fn` function
//
// mukla().then(title).equal(title, actual, expected)
//
// cuz', if you want to create `next test/group/nesting` just use `.should`
// mukla().should(title, fn).then(title, fn)

// scenario #1, should count 1 test?
// should show assertion titles? maybe configurable with opts?
// then `.then` will be as `.describe` in mocha
// for grouping/nesting.
mukla('package-name:', opts)
.then('should pass when', function(context) {
  mukla.equal('given string is `one two`', context.str, 'one two');
  mukla.equal('given is typeof string', typeof context.str, 'string');
})
.run(context); // object, array or string? in this is case object

// scenario #2, should count 1 or 3 test(s)?
// should show assertion titles? maybe configurable with opts?
// then `.should` will be as `.describe` in mocha
// for grouping/nesting.
mukla('package-yeah:', opts)
.should('pass when', function(contextString) {
  mukla.equal('given string is `one two`', contextString, 'one two');
  mukla.equal('given is typeof string', typeof contextString, 'string');
  mukla.equal('given be with length 7', contextString.length, 7);
})
.run('one two');

// scenario #3, how much should be the tests count, i think two?
mukla('package-beta:', opts)
.should('pass when')
.then('string given', function(ctx) {
  mukla.equal('string is `one two`', ctx.str, 'one two');
  mukla.equal('is typeof string', typeof ctx.str, 'string');
  mukla.equal('be with length 7', ctx.str.length, 7);
})
.then('array given', function(ctx) {
  mukla.deepEqual('array is `one two`', ctx.arr, [1,2,3]);
  mukla.equal('is typeof array', ctx.arr instanceof Array, true);
  mukla.equal('be with length 3', ctx.arr.length, 3);
})
.run({
  str: 'one two',
  arr: [1,2,3]
});

// scenario #4, should count 3 tests!
// `.should` is just for nesting, like `.describe` in mocha
// for grouping
mukla('package-gama:', opts)
.should('pass when')
.equal('given string be `one two`', str, 'one two')
.equal('given be typeof string', typeof str, 'string')
.equal('given be with length 7', str.length, 7)
.run()

// scenario #5, should count 3 tests?
mukla('package-two:', opts)
.equal('should given string be `one two`', str, 'one two')
.equal('should given be typeof string', typeof str, 'string')
.equal('should given be with length 7', str.length, 7)
.run()







mukla('anonymize-ip1:', {files: files, reporter: reporter})
.should('given `129.89.5.243`', 2)
.then('be awesome and', function() {
  var actual = anonymizeIp('129.89.5.243');
  var expected = '129.89.x.xxx';

  mukla.equal('equal to `129.89.x.xxx`', actual, expected);
  mukla.equal('typeof string', typeof actual, 'string');
})
.run();


mukla('anonymize-ip2:', {})
.should('one plus one').equal('be equal to two', 1+1,2)
.should('two plus two').equal('be equal to four', 2+2,4)
.run();

mukla('anonymize-ip3:', {})
.should('these things', 3).be('be equal', function() {
  mukla.equal('two arrays', [1,2,3], [1,2,3])
  mukla.equal('two objects', {one: 123}, {one: 123})
  mukla.equal('two strings', '[1,2,3]', '[1,2,3]')
})
.should('one plus one', 1).equal('be equal to two', 1+1,2)
.should('two plus two', 2).equal('be equal to four', 2+2,4)
.run();










































// var hybridify = require('hybridify');
// var got = require('got');
// var hybridGot = hybridify(got.get);

// var arr = [1, 2, {four: 'five'}]
// var abc = [1, 2, {four: 'five'}]

// var obj = {one: 111, two: [1,2,3]}
// var met = {one: 111, two: [1,2,3]}

// mukla('some title for test', function() {
//   mukla('should one + one be strict equal to 2').strictEqual(1 + 1, 2);
//   mukla('should arr deepEqual to abc').deepEqual(arr, abc);
//   mukla('some nested testing', function() {
//     var p = mukla('fake data').ok(true);
//     mukla('should mukla(str) methods returns promise').strictEqual(typeof  p.then, 'function')
//     mukla('should two + two be strict equal to 4').strictEqual(2 + 2, 4);
//     mukla('should `obj` deepEqual to `met`').deepEqual(obj, met);
//   })
//   mukla('should `obj` be typeof object').strictEqual(typeof obj, 'object');
// })

// // or just asserts
// var str = 'some long string'
// mukla('should `str` be typeof of string').strictEqual(typeof str, 'string');
// mukla('should be truthy value').ok(str);


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
