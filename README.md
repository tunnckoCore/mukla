# [mukla][author-www-url] [![npmjs.com][npmjs-img]][npmjs-url] [![The MIT License][license-img]][license-url] [![npm downloads][downloads-img]][downloads-url] 

> Small, parallel and fast test framework with suppport for async/await, promises, callbacks, streams and observables. Targets and works at node.js v0.10 and above.

[![code climate][codeclimate-img]][codeclimate-url] [![standard code style][standard-img]][standard-url] [![travis build status][travis-img]][travis-url] [![coverage status][coveralls-img]][coveralls-url] [![dependency status][david-img]][david-url]

## Install
> Install with [npm](https://www.npmjs.com/)

```sh
$ npm i mukla --save
```

## Usage
> For more use-cases see the [tests](./test.js)

```js
const mukla = require('mukla')
```

## API

### [mukla](index.js#L54)
> Runs `fn` test and outputs the `name` of the test. If only function is given and it is anonymous, the name of the test is `anonymous`, otherwise the name of the `fn` function.

**Params**

* `name` **{String|Function}**: the title of the test or `fn`    
* `[fn]` **{Function}**: test function, wrapped in [always-done][]    
* `showStack` **{Boolean}**: if boolean `true`, will print stack when has error    

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

## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/tunnckoCore/mukla/issues/new).  
But before doing anything, please read the [CONTRIBUTING.md](./CONTRIBUTING.md) guidelines.

## [Charlike Make Reagent](http://j.mp/1stW47C) [![new message to charlike][new-message-img]][new-message-url] [![freenode #charlike][freenode-img]][freenode-url]

[![tunnckoCore.tk][author-www-img]][author-www-url] [![keybase tunnckoCore][keybase-img]][keybase-url] [![tunnckoCore npm][author-npm-img]][author-npm-url] [![tunnckoCore twitter][author-twitter-img]][author-twitter-url] [![tunnckoCore github][author-github-img]][author-github-url]

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

[always-done]: https://github.com/hybridables/always-done