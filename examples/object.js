var html = require('yo-yo')
var clone = require('clone')
var listEditor = require('../index')()

var state = {
  items: {
    awesome: 'ok',
    nice: 'sure',
    cool: 'poop'
  }
}

function onaction (action, data) {
  if (action === 'list-editor:inputKey') {
    var keys = Object.keys(state.items)
    var items = {}
    keys.forEach(function (key) {
      if (key !== data.previousKey) items[key] = state.items[key]
      else items[data.key] = data.value
    })
    state.items = items
  }

  else if (action === 'list-editor:inputValue') {
    state.items[data.key] = data.value
  }

  else if (action === 'list-editor:add') {
    state.items[data.key] = data.value
  }

  else if (action === 'list-editor:remove') {
    delete state.items[data.key]
  }

  var update = render(clone(state), onaction)
  html.update(app, update)
}

function render (state, onaction) {
  return listEditor(state, onaction)
}

var app = render(state, onaction)
document.body.appendChild(app)
