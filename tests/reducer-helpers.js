var test = require('tape')

var helpers = require('../helpers')

test('add - object', function (t) {
  var items = {}
  items = helpers.add(items, { key: 'a', value: 'b' })
  t.ok(items)
  t.equal(Object.keys(items)[0], 'a')
  t.equal(Object.keys(items).length, 1)
  t.equal(items.a, 'b')
  t.end()
})

test('remove - object', function (t) {
  var items = { a: 'b' }
  items = helpers.remove(items, { key: 'a', value: 'b' })
  t.ok(items)
  t.equal(Object.keys(items).length, 0)
  t.end()
})

test('inputKey - object', function (t) {
  var items = { a: 'b' }
  items = helpers.change(items, { key: 'c', value: 'b', previousKey: 'a' })
  t.ok(items)
  t.equal(Object.keys(items)[0], 'c')
  t.equal(Object.keys(items).length, 1)
  t.equal(items.c, 'b')
  t.end()
})

test('inputValue - object', function (t) {
  var items = { a: 'b' }
  items = helpers.change(items, { key: 'a', value: 'c' })
  t.ok(items)
  t.equal(Object.keys(items)[0], 'a')
  t.equal(Object.keys(items).length, 1)
  t.equal(items.a, 'c')
  t.end()
})

test('add - array', function (t) {
  var items = []
  items = helpers.add(items, { key: 0, value: 'a' })
  t.ok(items)
  t.equal(items[0], 'a')
  t.equal(items.length, 1)
  t.end()
})

test('remove - array', function (t) {
  var items = ['a']
  items = helpers.remove(items, { key: 0 })
  console.log(helpers.remove(items, { key: 0 }))
  t.ok(items)
  t.equal(items.length, 0)
  t.end()
})

test('inputValue - array', function (t) {
  var items = ['a']
  items = helpers.change(items, { key: 0, value: 'b' })
  t.ok(items)
  t.equal(items[0], 'b')
  t.equal(items.length, 1)
  t.end()
})
