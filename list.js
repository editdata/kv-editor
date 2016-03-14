module.exports = function createitems (h, options) {
  function remove (e) {
    var key = e.target.parentNode.querySelector('.list-editor-item-key').value
    var value = e.target.parentNode.querySelector('.list-editor-item-value').value
    delete options.items[key]
    if (options.removeItem) options.removeItem(e, options.items, key, value)
  }

  function input (e) {
    if (options.oninput) options.oninput(e, e.target.value)
  }

  var list = Object.keys(options.items).map(function (key) {
    var value = String(options.items[key])
    return h('li.list-editor-item', [
      h('input.list-editor-item-key' + (options.keys ? '' : '.list-editor-hide-key'), { type: 'text', oninput: input, value: key }),
      h('input.list-editor-item-value', { type: 'text', oninput: input, value: value }),
      h('button.list-editor-item-close', { onclick: remove }, options.removeButtonText)
    ])
  })

  return h('ul.list-editor-items', list)
}
