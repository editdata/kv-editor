var getFormData = require('get-form-data')
var h = require('virtual-dom/h')

module.exports = function (state, options) {
  function submit (e) {
    e.preventDefault()
    var form = e.target.parentNode
    var data = getFormData(form)
    if (!state.keys) {
      data.key = Object.keys(state.items).length
    }
    state.items[data.key] = data.value
    var out = options.keys ? data : data.value
    options.onsubmit(e, state.items, out)
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
    h('input.list-editor-input-key' + (state.keys ? '' : '.list-editor-hide-key'), { name: 'key', placeholder: 'key' }),
    h('input.list-editor-input-value', { name: 'value', placeholder: 'value' }),
    h('button.list-editor-submit', { onclick: submit }, options.addButtonText)
  ])
}
