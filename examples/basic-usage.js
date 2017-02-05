var keyValueEditor = require('../index')
var kvEditor = keyValueEditor()

var params = {
  items: ['a', 'b', 'c'],
  onAdd: function (data) {
    console.log(data.key, data.value)
  },
  onChange: function (data) {
    console.log(data.key, data.previousKey, data.value)
  },
  onRemove: function (data) {
    console.log(data.key)
  }
}

var tree = kvEditor(params)
document.body.appendChild(tree)
