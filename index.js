var assert = require('assert')
var h = require('virtual-dom/h')
var convert = require('object-array-converter')
var isarray = require('isarray')
var extend = require('xtend')
var list = require('./list')
var form = require('./form')

module.exports = function (state, options) {
  options = extend({
    removeButtonText: 'x',
    addButtonText: 'add'
  }, options)

  assert.ok(typeof state.items === 'object', 'items object is required')
  assert.ok(options.onsubmit, 'options.onsubmit function is required')
  assert.ok(options.oninput, 'options.oninput function is required')
  assert.ok(options.removeItem, 'options.removeItem function is required')

  if (isarray(state.items)) {
    state.items = convert.toObject(state.items)
  }

  return h('#list-editor', [
    list(state, options),
    form(state, options)
  ])
}
