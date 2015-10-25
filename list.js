var h = require('virtual-dom/h')

module.exports = function createitems (state, options) {
  function remove (e) {
    var key = e.target.parentNode.querySelector('.list-editor-item-key').value
    var value = e.target.parentNode.querySelector('.list-editor-item-value').value
    delete state.items[key]
    options.removeItem(e, state.items, key, value)
  }

  function input (e) {
    options.oninput(e, e.target.value)
  }

  var list = Object.keys(state.items).map(function (key) {
    var value = String(state.items[key])
    return h('li.list-editor-item', [
      h('input.list-editor-item-key' + (state.keys ? '' : '.list-editor-hide-key'), { type: 'text', oninput: input, value: key }),
      h('input.list-editor-item-value', { type: 'text', oninput: input, value: value }),
      h('button.list-editor-item-close', { onclick: remove }, options.removeButtonText)
    ])
  })

  return h('ul.list-editor-items', list)
}
