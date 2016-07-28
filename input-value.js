var html = require('yo-yo')
var css = require('dom-css')

module.exports = function createInputValue (options) {
  return function renderInputValue (state, send) {
    var placeholder = state.value || 'value'

    function oninput (e) {
      e.preventDefault()
      value = e.target.value
      send(options.namespace + ':inputValue', { key: state.key, value: value })
    }

    return html`<input
      type="text"
      name="list-editor-input-value"
      class="list-editor-input-value"
      oninput=${oninput}
      placeholder="${placeholder}"
      value="${state.value || ''}"
    >`
  }
}
