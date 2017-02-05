# kv-editor

A reusable UI element for editing lists of key/value data.

[![npm](https://img.shields.io/npm/v/kv-editor.svg)](http://npmjs.com/kv-editor)

## Install

```
npm install --save kv-editor
```

## Usage

The goal of kv-editor is to make it easy to add an editable list of key/value pairs or just values to a page.

Here's a basic example:

```js
var keyValueEditor = require('kv-editor')
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
```

### Adding to the DOM

You can use `document.body.appendChild()` to add the return value of `kvEditor` to the DOM like in the above example.

You might also want to use this component inside other HTML. Here's an example of using `kvEditor()` with [bel](https://github.com/shama/bel):

```js
var html = require('bel')
var keyValueEditor = require('kv-editor')
var kvEditor = keyValueEditor()

var params = {
  items: {
    a: 1,
    b: 2,
    c: 3
  },
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

function render (params) {
  return html`<div class="list-wrapper">
    ${kvEditor(params)}
  </div>`
}

var tree = render(params)
document.body.appendChild(tree)
```

### Using state management helpers

For every event handler in kv-editor, there is a corresponding state management helper in the `kv-editor/helpers.js` file that simplifies manipulating state. If you have unusual needs these helpers may not work for you. Otherwise, the helpers can be a great starting point for setting up state management for this component.

Each helper takes the items object or array, and the data object sent with the corresponding action.

### `var helpers = require('kv-editor/helpers')`

#### `helpers.add(items, data)`
Returns `items` array or object with added item.

#### `helpers.remove(items, data)`
Returns `items` array or object with item removed.

#### `helpers.change(items, data)`
Returns `items` array or object with modified item key & value

## Examples

### Array of items
For an example of usage with an array of items, see [examples/array.js](examples/array.js).

### Flat object of key/value pairs
For an example of usage with a flat object, see [examples/object.js](examples/object.js).


## License
[MIT](LICENSE.md)
