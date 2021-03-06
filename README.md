# mukla [![NPM version](https://img.shields.io/npm/v/mukla.svg?style=flat)](https://www.npmjs.com/package/mukla) [![mit license][license-img]][license-url] [![NPM monthly downloads](https://img.shields.io/npm/dm/mukla.svg?style=flat)](https://npmjs.org/package/mukla) [![npm total downloads][downloads-img]][downloads-url]

> Small, parallel and fast test framework with suppport for async/await, promises, callbacks, streams and observables. Targets and works at node.js v0.10 and above.

[![code climate][codeclimate-img]][codeclimate-url] 
[![code style][standard-img]][standard-url] 
[![linux build][travis-img]][travis-url] 
[![windows build][appveyor-img]][appveyor-url] 
[![code coverage][coverage-img]][coverage-url] 
[![dependency status][david-img]][david-url]
[![paypal donate][paypalme-img]][paypalme-url] 

## Hightlights
- Extremely lightweight and fast
- Small to download and install
- No implicit globals,
- No CLI, use plain `node test.js`
- Powered by [always-done][]
- And so supports async/await, promises, observables streams and callbacks
- Enforces writing atomic tests
- Simple test syntax - just a single `test()` function
- Works seamlessly with [istanbul][] for code coverage
- Stops after first failing test (also known as _"fail fast"_ or _"bail"_)
- Built-in [core-assert][] assertion library
- Targets and works at node.js v0.10 and above
- No need for build/transpilation/compilation step
- Backward-compatible with [assertit][] and so [testit][]
- Easy to porting of [mocha][]-style tests
- Clean stack traces by default, using [stacktrace-metadata][]
- Custom reporters, one built-in

## Table of Contents
- [Install](#install)
- [Usage](#usage)
  * [Write tests in ES2015](#write-tests-in-es2015)
  * [The old way](#the-old-way)
- [API](#api)
  * [mukla](#mukla)
- [Supports](#supports)
  * [Async/await function support](#asyncawait-function-support)
  * [Promise support](#promise-support)
  * [Observable support](#observable-support)
  * [Regular callbacks support](#regular-callbacks-support)
  * [Synchronous functions support](#synchronous-functions-support)
  * [Support functions that returns streams](#support-functions-that-returns-streams)
  * [Support functions that returns Child Process](#support-functions-that-returns-child-process)
  * [Handles any errors](#handles-any-errors)
- [Related](#related)
- [Contributing](#contributing)
- [Building docs](#building-docs)
- [Running tests](#running-tests)
- [Author](#author)
- [License](#license)

_(TOC generated by [verb](https://github.com/verbose/verb) using [markdown-toc](https://github.com/jonschlinkert/markdown-toc))_

## Install
Install with [npm](https://www.npmjs.com/)

```
$ npm install mukla --save
```

or install using [yarn](https://yarnpkg.com)

```
$ yarn add mukla
```

## Usage
> For more use-cases see the [tests](./test.js)

### Write tests in ES2015

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

// or without `done`, returning Promise
// stream, observerable and so on
test(function () {
  return fs.createReadStream('not exists') // failing
})
```

## API

### [mukla](index.js#L43)
> Runs `fn` test and outputs the `name` of the test. If only function is given and it is anonymous, the name of the test is `anonymous`, otherwise the name of the `fn` function.

**Params**

* `name` **{String|Function}**: the title of the test or `fn`    
* `[fn]` **{Function}**: test function, wrapped in [always-done][]    
* `showStack` **{Boolean}**: if boolean `true`, will print stack when has error    

**Example**

```js
var test = require('mukla')

// failing regular callbacks test
test('title of test', function (done) {
  test.strictEqual(1, 2)
  done()
})

// passing test with anonymous title
test(function (done) {
  test.strictEqual(222, 222)
  done()
})
```

## Supports
> Handles completion and errors of async/await, synchronous and asynchronous (callback) functions, also tests that returns streams, promises, child process and observables.

### Async/await function support

```js
var test = require('mukla')

test('passing modern test', async function () {
  return await Promise.resolve('foobar')
})
```

**[back to top](#readme)**

### Promise support

#### Returning a resolved Promise

```js
var test = require('mukla')

test('passing promise test', function () {
  return Promise.resolve(12345)
})
```

#### Returning a rejected Promise

```js
var test = require('mukla')

test('failing test with promise', function () {
  return Promise.reject(new Error('foo bar'))
})
```

**[back to top](#readme)**

### Observable support
> Using `.subscribe` method of the observable

#### Empty observable
```js
var test = require('mukla')
var Observable = require('rx').Observable

test('passing test with empty observable', function () {
  return Observable.empty()
})
```

#### Successful test wtih observable

```js
var test = require('mukla')
var Observable = require('rx').Observable

alwaysDone(function () {
  return Observable.return([1, 2, 3])
})
```

#### Failing observable

```js
var test = require('mukla')
var Observable = require('rx').Observable

test(function () {
  return Observable.throw(new Error('observable error'))
})
```

**[back to top](#readme)**

### Regular callbacks support

```js
var test = require('mukla')
var fs = require('fs')

test('some callback test', function (done) {
  fs.readFile('./package.json', 'utf8', function (err, res) {
    test.strictEqual(err, null)
    test.strictEqual(typeof res, 'string')
    test.strictEqual(res.length > 0, true)
    done()
  })
})
```

**[back to top](#readme)**

### Synchronous functions support

#### Passing sync test

```js
var fs = require('fs')
var test = require('mukla')

test(function () {
  var res = fs.readFileSync('./package.json')
  test.strictEqual(typeof res, 'string')
})
```

#### Failing test with title

```js
var test = require('mukla')

test('some failing test', function () {
  JSON.parse('{Sjkfsf:"dfgfg')
})
```

**[back to top](#readme)**

### Support functions that returns streams
> Handles completion of tests using [on-stream-end][] and [stream-exhaust][], behind the scenes, using [always-done][]

#### Passing test with unpiped streams

```js
var fs = require('fs')
var test = require('mukla')

test(function () {
  return fs.createReadStream('./package.json')
})
```

#### Failing test unpiped streams

```js
var fs = require('fs')
var test = require('mukla')

test('failing stream test', function () {
  return fs.createReadStream('foo bar')
})
```

#### Failing test with piped streams

```js
var fs = require('fs')
var test = require('mukla')
var through2 = require('through2')

test(function () {
  var read = fs.createReadStream('foo bar')
  return read.pipe(through2())
})
```

**[back to top](#readme)**

### Support functions that returns Child Process
> Basically, they are streams, so completion is handled using [on-stream-end][] which is drop-in replacement for [end-of-stream][]

#### Successful exec

```js
var test = require('mukla')
var cp = require('child_process')
var isChildProcess = require('is-child-process')

test('returning child processes', function () {
  var proc = cp.exec('echo hello world')
  test.strictEqual(isChildProcess(proc), true)
  return proc
})
```

#### Failing exec

```js
var test = require('mukla')
var cp = require('child_process')

test('should be failing exec test', function () {
  return cp.exec('foo-bar-baz sasa')
})
```

#### Failing spawn

```js
var test = require('mukla')
var cp = require('child_process')

test('failing child process spawn test', function () {
  return cp.spawn('foo-bar-baz', ['hello world'])
})
```

**[back to top](#readme)**

### Handles any errors

#### uncaught exceptions

```js
var test = require('mukla')

test('should be failing test with ReferenceError', function () {
  foo // ReferenceError
  return 55
})
```

#### if test throws

```js
var test = require('mukla')

test('failing test with SyntaxError', function () {
  JSON.parse('{"foo":')
})
```

**[back to top](#readme)**

## Related
- [always-done](https://www.npmjs.com/package/always-done): Handle completion and errors with elegance! Support for streams, callbacks, promises, child processes, async/await and sync functions. A drop-in replacement… [more](https://github.com/hybridables/always-done#readme) | [homepage](https://github.com/hybridables/always-done#readme "Handle completion and errors with elegance! Support for streams, callbacks, promises, child processes, async/await and sync functions. A drop-in replacement for [async-done][] - pass 100% of its tests plus more")
- [core-assert](https://www.npmjs.com/package/core-assert): Node.js `assert` as a standalone module | [homepage](https://github.com/sindresorhus/core-assert#readme "Node.js `assert` as a standalone module")
- [each-promise](https://www.npmjs.com/package/each-promise): Iterate over promises, promise-returning or async/await functions in series or parallel. Support settle (fail-fast), concurrency (limiting) and hooks system (start… [more](https://github.com/tunnckocore/each-promise#readme) | [homepage](https://github.com/tunnckocore/each-promise#readme "Iterate over promises, promise-returning or async/await functions in series or parallel. Support settle (fail-fast), concurrency (limiting) and hooks system (start, beforeEach, afterEach, finish)")
- [gruu](https://www.npmjs.com/package/gruu): Modern, small and powerful testing with TAP output and support for async/await, promises, callbacks, streams and observables, built on [always-done][]. | [homepage](https://github.com/tunnckocore/gruu#readme "Modern, small and powerful testing with TAP output and support for async/await, promises, callbacks, streams and observables, built on [always-done][].")
- [minibase-is-registered](https://www.npmjs.com/package/minibase-is-registered): Plugin for [minibase][] and [base][], that adds `isRegistered` method to your application to detect if plugin is already registered and… [more](https://github.com/node-minibase/minibase-is-registered#readme) | [homepage](https://github.com/node-minibase/minibase-is-registered#readme "Plugin for [minibase][] and [base][], that adds `isRegistered` method to your application to detect if plugin is already registered and returns true or false if named plugin is already registered on the instance.")
- [minibase](https://www.npmjs.com/package/minibase): Minimalist alternative for Base. Build complex APIs with small units called plugins. Works well with most of the already existing… [more](https://github.com/node-minibase/minibase#readme) | [homepage](https://github.com/node-minibase/minibase#readme "Minimalist alternative for Base. Build complex APIs with small units called plugins. Works well with most of the already existing [base][] plugins.")
- [try-catch-core](https://www.npmjs.com/package/try-catch-core): Low-level package to handle completion and errors of sync or asynchronous functions, using [once][] and [dezalgo][] libs. Useful for and… [more](https://github.com/hybridables/try-catch-core#readme) | [homepage](https://github.com/hybridables/try-catch-core#readme "Low-level package to handle completion and errors of sync or asynchronous functions, using [once][] and [dezalgo][] libs. Useful for and used in higher-level libs such as [always-done][] to handle completion of anything.")

## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/tunnckoCore/mukla/issues/new).  
Please read the [contributing guidelines](CONTRIBUTING.md) for advice on opening issues, pull requests, and coding standards.  
If you need some help and can spent some cash, feel free to [contact me at CodeMentor.io](https://www.codementor.io/tunnckocore?utm_source=github&utm_medium=button&utm_term=tunnckocore&utm_campaign=github) too.

**In short:** If you want to contribute to that project, please follow these things

1. Please DO NOT edit [README.md](README.md), [CHANGELOG.md](CHANGELOG.md) and [.verb.md](.verb.md) files. See ["Building docs"](#building-docs) section.
2. Ensure anything is okey by installing the dependencies and run the tests. See ["Running tests"](#running-tests) section.
3. Always use `npm run commit` to commit changes instead of `git commit`, because it is interactive and user-friendly. It uses [commitizen][] behind the scenes, which follows Conventional Changelog idealogy.
4. Do NOT bump the version in package.json. For that we use `npm run release`, which is [standard-version][] and follows Conventional Changelog idealogy.

Thanks a lot! :)

## Building docs
Documentation and that readme is generated using [verb-generate-readme][], which is a [verb][] generator, so you need to install both of them and then run `verb` command like that

```
$ npm install verbose/verb#dev verb-generate-readme --global && verb
```

_Please don't edit the README directly. Any changes to the readme must be made in [.verb.md](.verb.md)._

## Running tests
Clone repository and run the following in that cloned directory

```
$ npm install && npm test
```

## Author
**Charlike Mike Reagent**

+ [github/tunnckoCore](https://github.com/tunnckoCore)
+ [twitter/tunnckoCore](https://twitter.com/tunnckoCore)
+ [codementor/tunnckoCore](https://codementor.io/tunnckoCore)

## License
Copyright © 2015, 2017, [Charlike Mike Reagent](http://www.tunnckocore.tk). Released under the [MIT License](LICENSE).

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.4.3, on March 17, 2017._  
_Project scaffolded using [charlike][] cli._

[always-done]: https://github.com/hybridables/always-done
[assertit]: https://github.com/tunnckoCore/assertit
[async-done]: https://github.com/gulpjs/async-done
[base]: https://github.com/node-base/base
[charlike]: https://github.com/tunnckocore/charlike
[clean-stacktrace]: https://github.com/tunnckocore/clean-stacktrace
[commitizen]: https://github.com/commitizen/cz-cli
[core-assert]: https://github.com/sindresorhus/core-assert
[dezalgo]: https://github.com/npm/dezalgo
[end-of-stream]: https://github.com/mafintosh/end-of-stream
[istanbul]: https://github.com/gotwarlost/istanbul
[minibase]: https://github.com/node-minibase/minibase
[mocha]: https://mochajs.org
[on-stream-end]: https://github.com/tunnckocore/on-stream-end
[once]: https://github.com/isaacs/once
[standard-version]: https://github.com/conventional-changelog/standard-version
[stream-exhaust]: https://github.com/chrisdickinson/stream-exhaust.git
[testit]: https://github.com/ForbesLindesay/testit
[verb-generate-readme]: https://github.com/verbose/verb-generate-readme
[verb]: https://github.com/verbose/verb

[license-url]: https://www.npmjs.com/package/mukla
[license-img]: https://img.shields.io/npm/l/mukla.svg

[downloads-url]: https://www.npmjs.com/package/mukla
[downloads-img]: https://img.shields.io/npm/dt/mukla.svg

[codeclimate-url]: https://codeclimate.com/github/tunnckoCore/mukla
[codeclimate-img]: https://img.shields.io/codeclimate/github/tunnckoCore/mukla.svg

[travis-url]: https://travis-ci.org/tunnckoCore/mukla
[travis-img]: https://img.shields.io/travis/tunnckoCore/mukla/master.svg?label=linux

[appveyor-url]: https://ci.appveyor.com/project/tunnckoCore/mukla
[appveyor-img]: https://img.shields.io/appveyor/ci/tunnckoCore/mukla/master.svg?label=windows

[coverage-url]: https://codecov.io/gh/tunnckoCore/mukla
[coverage-img]: https://img.shields.io/codecov/c/github/tunnckoCore/mukla/master.svg

[david-url]: https://david-dm.org/tunnckoCore/mukla
[david-img]: https://img.shields.io/david/tunnckoCore/mukla.svg

[standard-url]: https://github.com/feross/standard
[standard-img]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg

[paypalme-url]: https://www.paypal.me/tunnckoCore
[paypalme-img]: https://img.shields.io/badge/paypal-donate-brightgreen.svg

[stacktrace-metadata]: https://github.com/tunnckocore/stacktrace-metadata