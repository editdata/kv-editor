var html = require('yo-yo')
var clone = require('clone')
var listEditor = require('../index')()

var state = {
  items: ['a', 'b', 'c']
}

function onaction (action, data) {
  if (action === 'list-editor:inputKey') {
    state.items.splice(data.key, 1)
    state.items[data.key] = data.value
  }

  else if (action === 'list-editor:inputValue') {
    state.items[data.key] = data.value
  }

  else if (action === 'list-editor:add') {
    state.items[data.key] = data.value
  }

  else if (action === 'list-editor:remove') {
    state.items.splice(data.key, 1)
  }

  var update = render(clone(state), onaction)
  html.update(app, update)
}

function render (state, onaction) {
  return listEditor(state, onaction)
}

var app = render(state, onaction)
document.body.appendChild(app)
