var isarray = require('isarray')

module.exports = {
  add: function (items, data) {
    items[data.key] = data.value
    return items
  },
  remove: function (items, data) {
    if (isarray(items)) {
      items.splice(parseFloat(data.key), 1)
    } else {
      delete items[data.key]
    }

    return items
  },
  change: function (items, data) {
    if (isarray(items)) {
      items[data.key] = data.value
    } else {
      var keys = Object.keys(items)
      var modified = {}

      keys.forEach(function (key) {
        if (data.previousKey && key === data.previousKey) {
          modified[data.key] = data.value || items[data.previousKey]
        } else {
          modified[key] = (key === data.key) ? data.value : items[key]
        }
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
