var assert = require('assert')
var convert = require('object-array-converter')
var isObject = require('is-object')
var isArray = require('isarray')
var html = require('yo-yo')

module.exports = function createEditor (options) {
  options = options || {}
  options.namespace = options.namespace || 'list-editor'
  options.showKeys = options.showKeys == false ? false : true

  var list = require('./list')(options)
  var form = require('./form')(options)

  return function renderEditor (state, send) {
    var items
    if (isArray(state.items)) {
      items = convert.toObject(state.items)
      options.showKeys = false
    }

    assert.ok(state.items || isObject(state.items), 'state.items is required to be an array or object')

    return html`<div class="list-editor">
      ${list(state, send)}
      ${form(state, send)}
    </div>`
  }
}
