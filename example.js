var raf = require('virtual-raf')
var listEditor = require('./index')

function render (state) {
  function removeItem (e, items) {
    state.items = items
    tree.update(state)
  }

  function onsubmit (e, items, item) {
    state.items = items
    tree.update(state)
  }

  function oninput (e, value) {}

  return listEditor(state, {
    removeItem: removeItem,
    onsubmit: onsubmit,
    oninput: oninput
  })
}

var tree = raf({ items: {}, keys: true }, render, require('virtual-dom'))
document.body.appendChild(tree())
