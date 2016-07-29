var test = require('tape')

var createInputValue = require('../input-value')

test('create value input', function (t) {
  var inputValue = createInputValue({ namespace: 'list-editor' })
  var tree = inputValue({ key: 'a', value: 'b' })
  t.equal(typeof tree, 'object')
  t.ok(tree instanceof HTMLInputElement)
  t.equal(tree.value, 'b')
  t.end()
})
