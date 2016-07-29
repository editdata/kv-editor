var test = require('tape')

var createList = require('../list')

test('create empty list', function (t) {
  var list = createList({ namespace: 'list-editor' })
  var tree = list({ items: [] })
  t.ok(tree instanceof HTMLUListElement)
  t.equal(tree.children.length, 0)
  t.end()
})

test('create list', function (t) {
  var list = createList({ namespace: 'list-editor' })
  var tree = list({ items: ['a', 'b', 'c'] })
  t.ok(tree instanceof HTMLUListElement)
  t.equal(tree.children.length, 3)
  t.end()
})
