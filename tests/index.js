var test = require('tape')

var createListEditor = require('../index')

test('create list editor', function (t) {
  var listEditor = createListEditor()
  t.equal(typeof listEditor, 'function')
  t.end()
})

test('render list editor', function (t) {
  var listEditor = createListEditor()
  t.equal(typeof listEditor, 'function')
  var tree = listEditor({ items: [] }, function (action, data) {})
  t.ok(tree instanceof HTMLDivElement)
  t.ok(tree.children[0] instanceof HTMLUListElement)
  t.ok(tree.children[1] instanceof HTMLFormElement)
  t.end()
})

test('render callback is requiredr', function (t) {
  var listEditor = createListEditor()
  t.equal(typeof listEditor, 'function')
  try {
    var tree = listEditor({ items: [] })
  } catch (err) {
    t.ok(err)
    t.equal(err.message, 'callback function is required')
    t.end()
  }
})
