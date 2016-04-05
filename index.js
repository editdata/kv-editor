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

module.exports = function (h, options) {
  options = extend(defaultProps, options)

  if (isArray(options.items)) {
    options.items = convert.toObject(options.items)
    options.keys = false
  }

  if (!isObject(options.items)) throw Error('options.items is required to be an array or object')

  return h('#list-editor', [
    list(h, options),
    form(h, options)
  ])
}
