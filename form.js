var getFormData = require('get-form-data')

module.exports = function (h, options) {
  function submit (e) {
    e.preventDefault()
    var form = e.target.parentNode
    var data = getFormData(form)
    if (!options.keys) {
      data.key = Object.keys(options.items).length
    }
    options.items[data.key] = data.value
    var out = options.keys ? data : data.value
    if (options.onsubmit) options.onsubmit(e, options.items, out)
    var keyEl = form.querySelector('.list-editor-input-key')
    var valueEl = form.querySelector('.list-editor-input-value')
    valueEl.value = ''
    keyEl.value = ''
    if (options.keys) {
      keyEl.focus()
    } else {
      valueEl.focus()
    }
    return false
  }

  return h('form.list-editor-form', [
    h('input.list-editor-input-key' + (options.keys ? '' : '.list-editor-hide-key'), { type: 'text', name: 'key', placeholder: 'key' }),
    h('input.list-editor-input-value', { type: 'text', name: 'value', placeholder: 'value' }),
    h('button.list-editor-submit', { onclick: submit }, options.addButtonText)
  ])
}
