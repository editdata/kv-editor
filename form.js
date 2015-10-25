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
    form.querySelector('.list-editor-input-value').value = ''
    var keyEl = form.querySelector('.list-editor-input-key')
    keyEl.value = ''
    keyEl.focus()
    return false
  }

  return h('form.list-editor-form', [
    h('input.list-editor-input-key' + (state.keys ? '' : '.list-editor-hide-key'), { name: 'key' }),
    h('input.list-editor-input-value', { name: 'value' }),
    h('button.list-editor-submit', { onclick: submit }, options.addButtonText)
  ])
}
