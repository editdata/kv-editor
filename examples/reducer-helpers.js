var html = require('yo-yo')
var clone = require('clone')
var listEditor = require('../index')()
var helpers = require('../reducer-helpers')

var state = {
  items: {
    awesome: 'ok',
    nice: 'sure',
    cool: 'poop'
  }
}

function onaction (action, data) {
  if (action === 'list-editor:inputKey') {
    state.items = helpers.inputKey(state.items, data)
  }

  else if (action === 'list-editor:inputValue') {
    state.items = helpers.inputValue(state.items, data)
  }

  else if (action === 'list-editor:add') {
    state.items = helpers.add(state.items, data)
  }

  else if (action === 'list-editor:remove') {
    state.items = helpers.remove(state.items, data)
  }

  var update = render(clone(state), onaction)
  html.update(app, update)
}

function render (state, onaction) {
  return listEditor(state, onaction)
}

var app = render(state, onaction)
document.body.appendChild(app)
