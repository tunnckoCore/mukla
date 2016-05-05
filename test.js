/*!
 * mukla <https://github.com/tunnckoCore/mukla>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var mukla = require('./index')

mukla('foo bar baz', function (done) {
  mukla.strictEqual(1, 1)
  mukla.deepEqual(1, 1)
  done()
})

mukla('qux should be fail', function (done) {
  mukla.strictEqual(22422, 1)
  mukla.deepEqual(1, 1111)
  done()
})

mukla('should be okey with async', function (done) {
  setTimeout(function () {
    mukla.strictEqual(2, 2)
    done()
  }, Math.random())
})
