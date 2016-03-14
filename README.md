# list-editor

A virtual-dom element for editing a small list of items. The list can be an array or flat object.

## Example

```js
var raf = require('virtual-raf')
var listEditor = require('list-editor')

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

  state.removeItem = removeItem
  state.onsubmit = onsubmit
  state.oninput = oninput

  return listEditor(state)
}

var tree = raf({ items: {}, keys: true }, render, require('virtual-dom'))
document.body.appendChild(tree())
```

## License
MIT
