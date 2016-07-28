var choo = require('choo')
var html = require('choo/html')

var listEditor = require('../index')({ namespace: 'list' })
var app = choo()

app.model({
  namespace: 'list',
  state: {
    items: {
      awesome: 'ok',
      nice: 'sure',
      cool: 'poop'
    }
  },
  reducers: {
    submit: function (data, state, a, b) {
      state.items[data.key] = data.value
      return state
    },
    remove: function (data, state) {
      delete state.items[data.key]
      return state
    },
    inputKey: function (data, state) {
      delete state.items[data.key]
      state.items[data.key] = data.value
      return state
    },
    inputValue: function (data, state) {
      state.items[data.key] = data.value
      return state
    }
  }
})

function main (state, prev, send) {
  return html`<main class="app">
    ${listEditor(state.list, send)}
  </main>`
}

app.router(function (route) {
  return [route('/', main)]
})

const tree = app.start()
document.body.appendChild(tree)
