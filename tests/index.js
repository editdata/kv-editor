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

  var tree = listEditor({
    items: [],
    onAdd: function () {},
    onChange: function () {},
    onRemove: function () {}
  })

  t.ok(tree instanceof HTMLDivElement)
  t.ok(tree.children[0] instanceof HTMLUListElement)
  t.ok(tree.children[1] instanceof HTMLFormElement)
  t.end()
})
