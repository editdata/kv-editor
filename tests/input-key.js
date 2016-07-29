var test = require('tape')

var createInputKey = require('../input-key')

test('create key input', function (t) {
  var inputKey = createInputKey({ namespace: 'list-editor', showKeys: true })
  var tree = inputKey({ key: 'a', value: 'b' })
  t.equal(typeof tree, 'object')
  t.ok(tree instanceof HTMLInputElement)
  t.equal(tree.value, 'a')
  t.end()
})
