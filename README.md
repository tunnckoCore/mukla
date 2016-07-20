# [mukla][author-www-url] [![npmjs.com][npmjs-img]][npmjs-url] [![The MIT License][license-img]][license-url] [![npm downloads][downloads-img]][downloads-url] 

> Simple and fast test runner based on [async-done][] - so, works with callbacks, promises, observables, child processes and streams. Shows meaningful output on fail and support for custom reporters.

[![code climate][codeclimate-img]][codeclimate-url] [![standard code style][standard-img]][standard-url] [![travis build status][travis-img]][travis-url] [![coverage status][coveralls-img]][coveralls-url] [![dependency status][david-img]][david-url]

## Hightlights

- Extremely lightweight and fast
- Small to download and install
- No implicit globals
- Powered by [async-done][], currently
- Enforces writing atomic tests
- Simple test syntax - just a single `test()` function
- Runs tests in parallel - they even are not ordered
- Works seamlessly with istanbul for code coverage
- Stops after the first failing test (_"bail"_)
- Built-in [core-assert][] assertion library
- Support `node@0.10` for the next few months
- Backward-compatible with [assertit][] and so [testit][]
- Easy to port [mocha][] and [co-mocha][] tests
- [No stack traces](#no-stack-traces)
- [Regular callback support](#regular-callback-support)
- [Async function support](#async-function-support)
- [Generator function support](#generator-function-support)
- [Promise support](#promise-support)
- [Observable support](#observable-support)
- [Stream and Child Process support](#stream-and-child-process-support)
- [Custom reporters support](#custom-reporters-support)
- [Meaningful output on failing test](#meaningful-output-on-failing-test)
- more... ?

## Install
```
npm i mukla --save-dev
```

## Usage
> For more use-cases see the [tests](./test.js)

### ES2015 way

```js
import fs from 'fs'
import test from 'mukla'

test(done => {
  test.deepEqual([1, 2], [1, 2]) // passing
  done()
})

// or without `done`, returning Promise
// stream, observerable and so on
test(() => {
  return fs.createReadStream('not exist') // failing test
})
```

### The old way

```js
var fs = require('fs')
var test = require('mukla')

test(function (done) {
  test.deepEqual([1, 2], [1, 2]) // passing
  done()
})

// or without `done`
test(function () {
  return fs.createReadStream('not exists') // failing
})
```

## API

### [mukla](index.js#L55)
> Runs `fn` test and outputs the `name` of the test. If only function is given and it is anonymous, the name of the test is `anonymous`, otherwise the name of the `fn` function.

**Params**

* `name` **{String|Function}**: The name of the test or `fn`.    
* `[fn]` **{Function=}**: Test function, wrapped in [async-done][], can be 1st argument.    

**Example**

```js
var test = require('mukla')

// regular failing test
test('title of test', function (done) {
  test.strictEqual(1, 2)
  done()
})

// ES2015 successful test
// with `anonymous` title
test(done => {
  test.strictEqual(1, 1)
  done()
})

// returning rejected promise
test('should be failing test', () => {
  return Promise.reject(new Error('oooh no!'))
})

// returning failing stream
test('should be failing test', function () {
  return fs.createReadStream('foo not exist')
})
```

## Related
- [assertit](https://www.npmjs.com/package/assertit): Thin sugar layer on top of `testit` framework, `is-kindof` and `assert`. | [homepage](https://github.com/tunnckoCore/assertit "Thin sugar layer on top of `testit` framework, `is-kindof` and `assert`.")
- [limon-prev-next](https://www.npmjs.com/package/limon-prev-next): Plugin for [limon][] pluggable lexer that adds `prev` and `next` methods. | [homepage](https://github.com/limonjs/limon-prev-next "Plugin for [limon][] pluggable lexer that adds `prev` and `next` methods.")
- [limon](https://www.npmjs.com/package/limon): The pluggable JavaScript lexer. Limon = Lemon. | [homepage](https://github.com/limonjs/limon "The pluggable JavaScript lexer. Limon = Lemon.")
- [postjson](https://www.npmjs.com/package/postjson): Transforming JSON with plugins. | [homepage](https://github.com/postjson/postjson "Transforming JSON with plugins.")
- [relike](https://www.npmjs.com/package/relike): Simple promisify async or sync function with sane defaults. Lower level than… [more](https://github.com/hybridables/relike) | [homepage](https://github.com/hybridables/relike "Simple promisify async or sync function with sane defaults. Lower level than `promisify` thing. Can be used to create `promisify` method.")
- [use-ware](https://www.npmjs.com/package/use-ware): Adds sync plugin support to your application. Kinda fork of [use… [more](https://github.com/tunnckocore/use-ware) | [homepage](https://github.com/tunnckocore/use-ware "Adds sync plugin support to your application. Kinda fork of [use][] - use it if you need to support nesting. Or use [ware][] if you need async middleware system.")
- [use](https://www.npmjs.com/package/use): Easily add plugin support to your node.js application. | [homepage](https://github.com/jonschlinkert/use "Easily add plugin support to your node.js application.")

## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/tunnckoCore/mukla/issues/new).  
But before doing anything, please read the [CONTRIBUTING.md](./CONTRIBUTING.md) guidelines.

## [Charlike Make Reagent](http://j.mp/1stW47C) [![new message to charlike][new-message-img]][new-message-url] [![freenode #charlike][freenode-img]][freenode-url]

[![tunnckoCore.tk][author-www-img]][author-www-url] [![keybase tunnckoCore][keybase-img]][keybase-url] [![tunnckoCore npm][author-npm-img]][author-npm-url] [![tunnckoCore twitter][author-twitter-img]][author-twitter-url] [![tunnckoCore github][author-github-img]][author-github-url]

[assertit]: https://github.com/tunnckoCore/assertit
[async-done]: https://github.com/gulpjs/async-done
[co-mocha]: https://github.com/blakeembrey/co-mocha
[core-assert]: https://github.com/sindresorhus/core-assert
[limon]: https://github.com/limonjs/limon
[mocha]: https://github.com/mochajs/mocha
[testit]: https://github.com/ForbesLindesay/testit
[use]: https://github.com/jonschlinkert/use

[npmjs-url]: https://www.npmjs.com/package/mukla
[npmjs-img]: https://img.shields.io/npm/v/mukla.svg?label=mukla

[license-url]: https://github.com/tunnckoCore/mukla/blob/master/LICENSE
[license-img]: https://img.shields.io/npm/l/mukla.svg

[downloads-url]: https://www.npmjs.com/package/mukla
[downloads-img]: https://img.shields.io/npm/dm/mukla.svg

[codeclimate-url]: https://codeclimate.com/github/tunnckoCore/mukla
[codeclimate-img]: https://img.shields.io/codeclimate/github/tunnckoCore/mukla.svg

[travis-url]: https://travis-ci.org/tunnckoCore/mukla
[travis-img]: https://img.shields.io/travis/tunnckoCore/mukla/master.svg

[coveralls-url]: https://coveralls.io/r/tunnckoCore/mukla
[coveralls-img]: https://img.shields.io/coveralls/tunnckoCore/mukla.svg

[david-url]: https://david-dm.org/tunnckoCore/mukla
[david-img]: https://img.shields.io/david/tunnckoCore/mukla.svg

[standard-url]: https://github.com/feross/standard
[standard-img]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg

[author-www-url]: http://www.tunnckocore.tk
[author-www-img]: https://img.shields.io/badge/www-tunnckocore.tk-fe7d37.svg

[keybase-url]: https://keybase.io/tunnckocore
[keybase-img]: https://img.shields.io/badge/keybase-tunnckocore-8a7967.svg

[author-npm-url]: https://www.npmjs.com/~tunnckocore
[author-npm-img]: https://img.shields.io/badge/npm-~tunnckocore-cb3837.svg

[author-twitter-url]: https://twitter.com/tunnckoCore
[author-twitter-img]: https://img.shields.io/badge/twitter-@tunnckoCore-55acee.svg

[author-github-url]: https://github.com/tunnckoCore
[author-github-img]: https://img.shields.io/badge/github-@tunnckoCore-4183c4.svg

[freenode-url]: http://webchat.freenode.net/?channels=charlike
[freenode-img]: https://img.shields.io/badge/freenode-%23charlike-5654a4.svg

[new-message-url]: https://github.com/tunnckoCore/ama
[new-message-img]: https://img.shields.io/badge/ask%20me-anything-green.svg