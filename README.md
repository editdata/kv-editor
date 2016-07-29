# list-editor

A reusable element for editing small lists of items.

[![npm](https://img.shields.io/npm/v/list-editor.svg)](http://npmjs.com/list-editor)

## Install

```
npm install --save editdata/list-editor
```

## Usage

The goal of list-editor is to make it easy to add an editable list of key/value pairs or just values to a page, with the ability to handle state management using any state library.

Here's a basic example:

```js
var createListEditor = require('list-editor')
var listEditor = createListEditor()

var state = {
  items: ['a', 'b', 'c']
}

var tree = listEditor(state, function onaction (action, data) {
  // Manipulate the state as needed for your application
})

document.body.appendChild(tree)
```

### Adding to the DOM

You can use `document.body.appendChild()` to add the return value of `listEditor` to the DOM like in the above example.

You might also want to use this component inside other HTML. Here's an example of using `listEditor()` with [yo-yo.js](https://github.com/maxogden/yo-yo):

```js
var html = require('yo-yo')
var createListEditor = require('list-editor')
var listEditor = createListEditor()

var state = {
  items: ['a', 'b', 'c']
}

function onaction (action, data) {
  // Manipulate the state as needed for your application
}

function render (state, onaction) {
  return html`<div class="list-wrapper">
    ${listEditor(state, onaction)}
  </div>`
}

var tree = render(state, onaction)
document.body.appendChild(tree)
```

### Handling state

list-editor lets you make all the decisions about how to manipulate the state of your application.

It does this by taking a callback that is called anytime an action is triggered by the user.

There are four possible actions that the callback can send:

- `list-editor:add`
- `list-editor:remove`
- `list-editor:inputKey`
- `list-editor:inputValue`

You can change the namespace of the actions by setting `namespace: 'whatever'` in the options object:

```js
var createListEditor = require('list-editor')
var listEditor = createListEditor({ namespace: 'whatever' })
```

The four actions would now be named like this:

- `whatever:add`
- `whatever:remove`
- `whatever:inputKey`
- `whatever:inputValue`

#### `data` sent with each action

Every action in list-editor is accompanied by the key/value pair of the item being added, edited, or removed.

The `list-editor:inputKey` action also provides `data.previousKey` so you can replace the old key with the new one in the application state.

When a new item is added, for instance:

```js
var createListEditor = require('list-editor')
var listEditor = createListEditor()

var state = {
  items: ['a', 'b', 'c']
}

var tree = listEditor(state, function onaction (action, data) {
  // A new item is added, triggering the callback
  console.log(action)
  // -> 'list-editor:add'
  console.log(data)
  // -> { key: 4, value: 'd' }
})

document.body.appendChild(tree)
```

### Using reducer helpers

This module comes with the `list-editor/reducer-helpers.js` file which provides a helper for each action that makes it easier to modify the application state.

Check out the reducer [helpers example](#reducer-helpers) and the [API docs for each helper method](#-var-helpers-require-list-editor-reducer-helpers-).

## Examples

### Array of items
For an example of usage with an array of items, see [examples/array.js](examples/array.js).

### Flat object of key/value pairs
For an example of usage with a flat object, see [examples/object.js](examples/object.js).

### Using list-editor with choo
For an example of usage with [choo](https://github.com/yoshuawuyts/choo), see [examples/choo.js](examples/choo.js).

### Reducer helpers
For an example using this package's provided reducer helpers, see [examples/reducer-helpers](examples/reducer-helpers.js) or look at the full example here:

```js
var clone = require('clone')
var createListEditor = require('list-editor')
var listEditor = createListEditor()

var helpers = require('../reducer-helpers')

var state = {
  items: ['a', 'b', 'c']
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
```

## API

### `var createListEditor = require('list-editor')`

### `var listEditor = createListEditor(options)`

`createListEditor` returns the `listEditor` render function.

**Arguments:**

- `options` – _object_.
  - `options.namespace` – _string_. set a namespace for the actions sent by the callback in the render function

### `listEditor(state, callback)`

The render function takes the state required for the component and a callback to handle actions that are sent based on user interaction.

**Returns:** HTML tree that can be added to the DOM.

**Arguments:**

- `state` – _object_
  - `state.items` – _array_ or flat _object_
- `callback` – _function_
  - Arguments:
    - `action` – _string_. the name of the action the callback is sending
    - `data` – the data the callback is sending

### Actions

list-editor has 4 actions it can send:

- `list-editor:add`
  - data: `{ key: key, value: value }`
- `list-editor:remove`
  - data: `{ key: key, value: value }`
- `list-editor:inputKey`
  - data: `{ key: key, previousKey: previousKey, value: value }`
- `list-editor:inputValue`
  - data: `{ key: key, value: value }`

All actions return the key and value of the item being manipulated. The `list-editor:inputKey` action also provides `data.previousKey` so you can accurately replace the old key with the new one in the application state. This is only needed if `state.items` is an object. If you started with an array of items, the key will be the index of the array. If you started with an object, the key will be the property key.

### `var helpers = require('list-editor/reducer-helpers')`

For every action that list-editor can send, there is a corresponding reducer helper in the `list-editor/reducer-helpers.js` file that simplifies manipulating state. If you have unusual needs these helpers may not work for you. Otherwise, the helpers can be a great starting point for setting up state management for this component.

Each helper takes the items object or array, and the data object sent with the corresponding action.

#### `helpers.add(items, data)`
Returns `items` array or object with added item.

#### `helpers.remove(items, data)`
Returns `items` array or object with item removed.

#### `helpers.inputKey(items, data)`
Returns `items` array or object with modified item key.

#### `helpers.inputValue(items, data)`
Returns modified `items` array or object with modified item value.

## License
[MIT](LICENSE.md)
