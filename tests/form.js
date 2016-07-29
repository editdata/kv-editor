var test = require('tape')

var createForm = require('../form')

test('create a form', function (t) {
  var form = createForm({ namespace: 'list-editor' })
  t.equal(typeof form, 'function')
  t.end()
})

test('render a form', function (t) {
  var form = createForm({ namespace: 'list-editor' })
  var tree = form({ items: {} })
  t.equal(typeof tree, 'object')
  t.ok(tree instanceof HTMLFormElement)
  t.ok(tree['0'] instanceof HTMLInputElement)
  t.ok(tree['1'] instanceof HTMLInputElement)
  t.ok(tree['2'] instanceof HTMLButtonElement)
  t.end()
})

test('render a form without the key input', function (t) {
  var form = createForm({ namespace: 'list-editor', showKeys: false })
  var tree = form({ items: [] })
  t.equal(typeof tree, 'object')
  t.ok(tree instanceof HTMLFormElement)
  t.ok(tree['0'] instanceof HTMLInputElement)
  t.ok(tree['2'] instanceof HTMLButtonElement)
  t.end()
})
