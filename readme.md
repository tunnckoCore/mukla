## [![npm][npmjs-img]][npmjs-url] [![mit license][license-img]][license-url] [![build status][travis-img]][travis-url] [![coverage status][coveralls-img]][coveralls-url] [![deps status][daviddm-img]][daviddm-url]

> (wip) Mukla - promise-based test framework.

Very, very raw ... but easy, lightweight and awesome!
It is fully async and output results are completely unordered.
Just a proof of concept.

## Install
```
npm i --save mukla
node test.js
```


## Features / Goals
- human-readable and human-respectable
- lightweight and easy to use
- promise-based
- assertion library agnostic
- reporter agnostic
- asynchronous
- no more `done`, `end` or etc...


## Usage
> For more use-cases see the [tests](./test.js)

```js
var mukla = require('mukla');

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
.should('pass when', 2)
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
.should('fail when', 1)
.then('object given', function(ctx) {
  mukla.throws('Error: "cant give an object"', fixture, Error);
  mukla.equal('error is instanceof Error', fixture instanceof Error, true);
  mukla.falsey(' ctx.obj be falsey value', ctx.obj);
})
.run({
  str: 'one two',
  arr: [1,2,3],
  obj: {one: 123}
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
```


## PRs welcome!
> Review the examples above and please comment on
[issue#1](https://github.com/tunnckoCore/mukla/issues/1)


## Author
**Charlike Mike Reagent**
+ [gratipay/tunnckoCore][author-gratipay]
+ [twitter/tunnckoCore][author-twitter]
+ [github/tunnckoCore][author-github]
+ [npmjs/tunnckoCore][author-npmjs]
+ [more ...][contrib-more]


## License [![MIT license][license-img]][license-url]
Copyright (c) 2014-2015 [Charlike Mike Reagent][contrib-more], [contributors][contrib-graf].  
Released under the [`MIT`][license-url] license.


[npmjs-url]: http://npm.im/mukla
[npmjs-img]: https://img.shields.io/npm/v/mukla.svg?style=flat&label=mukla

[coveralls-url]: https://coveralls.io/r/tunnckoCore/mukla?branch=master
[coveralls-img]: https://img.shields.io/coveralls/tunnckoCore/mukla.svg?style=flat

[license-url]: https://github.com/tunnckoCore/mukla/blob/master/license.md
[license-img]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat

[travis-url]: https://travis-ci.org/tunnckoCore/mukla
[travis-img]: https://img.shields.io/travis/tunnckoCore/mukla.svg?style=flat

[daviddm-url]: https://david-dm.org/tunnckoCore/mukla
[daviddm-img]: https://img.shields.io/david/tunnckoCore/mukla.svg?style=flat

[author-gratipay]: https://gratipay.com/tunnckoCore
[author-twitter]: https://twitter.com/tunnckoCore
[author-github]: https://github.com/tunnckoCore
[author-npmjs]: https://npmjs.org/~tunnckocore

[contrib-more]: http://j.mp/1stW47C
[contrib-graf]: https://github.com/tunnckoCore/mukla/graphs/contributors

***

_Powered and automated by [kdf](https://github.com/tunnckoCore), February 4, 2015_
