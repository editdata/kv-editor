var assert = require('assert')
var html = require('bel')
var css = require('dom-css')

module.exports = function createList (options) {
  return function renderList (state) {
    state.removeButtonText = state.removeButtonText || 'x'
    assert.ok(state.items || typeof state.items === 'object', 'state.items must be an object')
    var keys = Object.keys(state.items)

    function eachKey (key) {
      var value = state.items[key]
      var previousKey = key

      var keyInput = html`<input
        type="text"
        name="list-editor-input-key"
        class="list-editor-input-key ${options.showKeys ? '' : 'list-editor-hide-key'}"
        oninput=${onKeyChange}
        placeholder="key"
        data-key=${key}
        value="${key}"
      />`

      css(keyInput, { display: options.showKeys ? 'initial' : 'none' })

      var valueInput = html`<input
        type="text"
        name="list-editor-input-value"
        class="list-editor-input-value"
        oninput=${onValueChange}
        placeholder="value"
        data-key="${key}"
        value="${value}"
      />`

      function onKeyChange (e) {
        previousKey = key
        key = e.target.value
        options.onChange({ key: key, previousKey: previousKey, value: value })
      }

      function onValueChange (e) {
        options.onChange({ key: key, value: e.target.value })
      }

      function onclick (e) {
        e.preventDefault()
        options.onRemove({ key: key })
        key = e.target.parentNode.children[0].value
      }

      var button = html`<button class="list-editor-item-remove" onclick=${onclick}>
        ${options.removeButtonText}
      </button>`

      var el = html`<li class="list-editor-item" id="list-editor-item-key-${key}">
        ${keyInput}
        ${valueInput}
        ${button}
      </li>`

      css(el, { listStyleType: 'none' })
      return el
    }

    var el = html`<ul class="list-editor-items">
      ${keys.map(eachKey)}
    </ul>`

    css(el, { padding: 0, margin: 0 })
    return el
  }
}
