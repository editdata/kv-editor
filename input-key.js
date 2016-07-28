var html = require('yo-yo')
var css = require('dom-css')

module.exports = function createInputKey (options) {
  return function renderInputKey (state, send) {
    var placeholder = state.key || 'key'
    var previousKey = state.key

    function oninput (e) {
      key = e.target.value
      send(options.namespace + ':inputKey', { key: key, previousKey: previousKey, value: state.value })
    }

    var el = html`<input
      type="text"
      name="list-editor-input-key"
      class="list-editor-input-key ${options.showKeys ? '' : '.list-editor-hide-key'}"
      oninput=${oninput}
      placeholder="${placeholder}"
      value="${state.key || ''}"
    >`

    css(el, { display: options.showKeys ? 'initial' : 'none' })
    return el
  }
}
