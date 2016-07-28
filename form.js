var assert = require('assert')
var html = require('yo-yo')
var css = require('dom-css')

module.exports = function createForm (options) {
  var inputKey = require('./input-key')(options)
  var inputValue = require('./input-value')(options)

  return function renderForm (state, send) {
    state.addButtonText = state.addButtonText || 'Add'
    var value
    var key

    function button (state, send) {
      function onclick (e) {
        e.preventDefault()
        if (!key) key = Object.keys(state.items).length
        send(options.namespace + ':add', { key: key, value: value })
      }

      return html`<button class="list-editor-submit" onclick=${onclick}>
        ${state.addButtonText}
      </button>`
    }

    function onaction (action, data) {
      if (action === options.namespace + ':inputKey') key = data.key
      if (action === options.namespace + ':inputValue') value = data.value
    }

    return html`<form class="list-editor-form">
      ${inputKey({ key: key }, onaction)}
      ${inputValue({ value: value }, onaction)}
      ${button(state, send)}
    </form>`
  }
}
