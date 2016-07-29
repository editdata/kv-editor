var isarray = require('isarray')

module.exports = {
  add: function (items, data) {
    items[data.key] = data.value
    return items
  },
  remove: function (items, data) {
    if (isarray(items)) {
      items.splice(data.key, 1)
    } else {
      delete items[data.key]
    }
    return items
  },
  inputKey: function (items, data) {
    if (isarray(items)) {
      items.splice(data.key, 1)
      items[data.key] = data.value
    } else {
      var keys = Object.keys(items)
      var modified = {}
      keys.forEach(function (key) {
        if (key !== data.previousKey) modified[key] = items[key]
        else modified[data.key] = data.value
      })
      items = modified
    }
    return items
  },
  inputValue: function (items, data) {
    items[data.key] = data.value
    return items
  }
}
