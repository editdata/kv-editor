var h = require('virtual-dom/h')
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

  function oninput (e) {}

  state.removeItem = removeItem
  state.onsubmit = onsubmit
  state.oninput = oninput

  return listEditor(h, state)
}

var tree = raf({ items: [], keys: false }, render, require('virtual-dom'))
document.body.appendChild(tree())
