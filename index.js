var assert = require('assert')
var convert = require('object-array-converter')
var isObject = require('is-object')
var isArray = require('isarray')
var html = require('bel')

var createList = require('./list')
var createForm = require('./form')

module.exports = function createEditor (options) {
  options = options || {}

  return function renderEditor (params) {
    assert.ok(params.items || isObject(params.items), 'list-editor: params.items is required and must be an array or object')

    var list = createList(params)
    var form = createForm(params)
    var items

    if (isArray(params.items)) {
      params.items = convert.toObject(params.items)
      params.showKeys = false
    } else {
      params.showKeys = true
    }

    console.log('renderEditor', params.items)
    return html`<div class="list-editor">
      ${list(params)}
      ${form(params)}
    </div>`
  }
}
