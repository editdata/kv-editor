var assert = require('assert')
var html = require('yo-yo')
var css = require('dom-css')

module.exports = function createList (options) {
  var inputKey = require('./input-key')(options)
  var inputValue = require('./input-value')(options)

  return function renderList (state, send) {
    state.removeButtonText = state.removeButtonText || 'x'
    assert.ok(state.items || typeof state.items === 'object', 'state.items must be an object')
    var keys = Object.keys(state.items)

    function button (state, send) {
      function onclick (e) {
        e.preventDefault()
        send(options.namespace + ':remove', { key: state.key, value: state.value })
      }

      return html`<button class="list-editor-item-remove" onclick=${onclick}>
        ${state.removeButtonText}
      </button>`
    }

    function eachKey (key) {
      var value = state.items[key]
      var el = html`<li class="list-editor-item" id="list-editor-item-key-${state.key}">
        ${inputKey({ key: key, value: value }, send)}
        ${inputValue({ key: key, value: value }, send)}
        ${button({ key: key, value: value, removeButtonText: state.removeButtonText }, send)}
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
