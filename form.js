var assert = require('assert')
var html = require('bel')
var css = require('dom-css')

module.exports = function createForm (options) {
  return function renderForm (state, send) {
    state.addButtonText = state.addButtonText || 'Add'

    var key = state.showKeys ? '' : Object.keys(state.items).length.toString()

    var keyInput = html`<input
      type="text"
      name="list-editor-input-key"
      class="list-editor-input-key ${options.showKeys ? '' : 'list-editor-hide-key'}"
      placeholder="key"
      value="${key}"
    />`

    css(keyInput, { display: options.showKeys ? 'initial' : 'none' })

    var valueInput = html`<input
      type="text"
      name="list-editor-input-value"
      class="list-editor-input-value"
      placeholder="value"
      value=""
    />`

    function onsubmit (e) {
      e.preventDefault()
      key = keyInput.value
      options.onAdd({ key: key, value: valueInput.value })
      valueInput.value = null
      keyInput.value = state.showKeys ? null : parseFloat(key) + 1
      if (options.showKeys) {
        keyInput.focus()
      } else  {
        valueInput.focus()
      }
    }

    console.log('render form', Object.keys(state.items).length)
    return html`<form class="list-editor-form" onsubmit=${onsubmit}>
      ${keyInput}
      ${valueInput}
      <button class="list-editor-submit">
        ${state.addButtonText}
      </button>
    </form>`
  }
}
