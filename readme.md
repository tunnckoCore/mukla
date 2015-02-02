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


## Usage
> For more use-cases see the [tests](./test.js)

```js
var mukla = require('mukla');

var arr = [1, 2, {four: 'five'}]
var abc = [1, 2, {four: 'five'}]

mukla('some title for test', function() {
  mukla('should one + one be strict equal to 2').strictEqual(1 + 1, 2);
  mukla('should arr deepEqual to abc').deepEqual(arr, abc);
})

// or just asserts
var str = 'some long string'
mukla('should `str` be typeof of string').strictEqual(typeof str, 'string');
mukla('should be truthy value').ok(str);
```


## API / CLI


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

_Powered and automated by [kdf](https://github.com/tunnckoCore), February 2, 2015_