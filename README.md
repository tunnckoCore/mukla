# [mukla][author-www-url] [![npmjs.com][npmjs-img]][npmjs-url] [![The MIT License][license-img]][license-url] [![npm downloads][downloads-img]][downloads-url] 

> Simple and fast test runner, based on promises with basic reporter and clean stacktraces. Support custom reporters, sync, async and generator functions.

[![code climate][codeclimate-img]][codeclimate-url] [![standard code style][standard-img]][standard-url] [![travis build status][travis-img]][travis-url] [![coverage status][coveralls-img]][coveralls-url] [![dependency status][david-img]][david-url]

## Features / Main Points
- Lightweight, simple and fast.
- Small to download and install.
- Easy to learn, actually nothing - it is just a simple function.
- Includes [core-assert][] to provide few modern things down to `0.10`.
- Promises based - native promise is used on modern, bluebird on `0.10`.
- No stacktraces. Shows you `err.toString()`, filename, position and the failing line.
- Backward-compatible with [assertit][]. I'm using it from 1+ year everywhere in my 270+ packages.
- Support for node 0.10 for next couple of months.
- Support for custom reporters - it just emits two events: `pass` and `fail`.
  + Reporeter should be just event emitter.
  + One simple built-in reporter.
- "Fail-first", meaining it stops after the first failing test.
  + Not wanted, but with that design that's all we can do.

## Install
```
npm i mukla --save
```

## Usage
> For more use-cases see the [tests](./test.js)

### ES2015 way

```js
import test from 'mukla'

test(done => {
  test.deepEqual([1, 2], [1, 2]) // passing
  done()
})

// or without `done`
test(() => {
  test.strictEqual(1, 2) // failing
})
```

### The old way

```js
var test = require('mukla')

test(function (done) {
  test.deepEqual([1, 2], [1, 2]) // passing
  done()
})

// or without `done`
test(function () {
  test.strictEqual(1, 2) // failing
})
```

## API

### [mukla](index.js#L65)
> Runs `fn` test and outputs the `name` of the test. If only function is given and it is anonymous, the name of the test is `anonymous`, otherwise the name of the `fn` function.

**Params**

* `name` **{String|Function}**: The name of the test or `fn`.    
* `[fn]` **{Function=}**: Test function, wrapped in promise.    
* `returns` **{Promise}**  

**Example**

```js
var test = require('mukla')

// regular failing test
test('title of test', function (done) {
  test.strictEqual(1, 2)
  done()
})

// without need to call `done`
// with `anonymous` title
test(function () {
  test.ok(555)
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

// regular test, returning (promise) another test
test('old school javascript', function () {
  test.deepEqual([1, 2, 3], [1, 2, 3]) // pass

  return test('nested?', function (done) {
    mukla.deepEqual([1, 2, 3], 555)
    // => throws and shows `nested?` as title, not the other
    done()
  })
})
```

## Related
* [assertit](https://www.npmjs.com/package/assertit): Thin sugar layer on top of `testit` framework, `is-kindof` and `assert`. | [homepage](https://github.com/tunnckoCore/assertit)
* [limon-prev-next](https://www.npmjs.com/package/limon-prev-next): Plugin for [limon][] pluggable lexer that adds `prev` and `next` methods. | [homepage](https://github.com/limonjs/limon-prev-next)
* [limon](https://www.npmjs.com/package/limon): The pluggable JavaScript lexer on per character basis. | [homepage](https://github.com/limonjs/limon)
* [postjson](https://www.npmjs.com/package/postjson): Transforming JSON with plugins. | [homepage](https://github.com/postjson/postjson)
* [relike](https://www.npmjs.com/package/relike): Simple promisify a callback-style function with sane defaults. Support promisify-ing sync functions. | [homepage](https://github.com/hybridables/relike)
* [use-ware](https://www.npmjs.com/package/use-ware): Adds sync plugin support to your application. Kinda fork of [use][] -… [more](https://www.npmjs.com/package/use-ware) | [homepage](https://github.com/tunnckocore/use-ware)
* [use](https://www.npmjs.com/package/use): Easily add plugin support to your node.js application. | [homepage](https://github.com/jonschlinkert/use)

## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/tunnckoCore/mukla/issues/new).  
But before doing anything, please read the [CONTRIBUTING.md](./CONTRIBUTING.md) guidelines.

## [Charlike Make Reagent](http://j.mp/1stW47C) [![new message to charlike][new-message-img]][new-message-url] [![freenode #charlike][freenode-img]][freenode-url]

[![tunnckoCore.tk][author-www-img]][author-www-url] [![keybase tunnckoCore][keybase-img]][keybase-url] [![tunnckoCore npm][author-npm-img]][author-npm-url] [![tunnckoCore twitter][author-twitter-img]][author-twitter-url] [![tunnckoCore github][author-github-img]][author-github-url]

[use]: https://github.com/jonschlinkert/use
[assertit]: https://github.com/tunnckoCore/assertit
[core-assert]: https://github.com/sindresorhus/core-assert
[limon]: https://github.com/limonjs/limon

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