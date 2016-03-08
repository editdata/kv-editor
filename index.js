var h = require('virtual-dom/h')
var convert = require('object-array-converter')
var isObject = require('is-object')
var isArray = require('isarray')
var extend = require('xtend')
var list = require('./list')
var form = require('./form')

var defaultProps = {
  removeButtonText: 'x',
  addButtonText: 'add'
}

module.exports = function (state, options) {
  options = extend(defaultProps, options)

  if (isArray(state.items)) state.items = convert.toObject(state.items)
  if (!isObject(state.items)) throw Error('state.items is required to be an array or object')

  return h('#list-editor', [
    list(state, options),
    form(state, options)
  ])
}
