# kv-editor

A reusable UI element for editing lists of key/value data.

[![npm][npm-image]][npm-url]
[![travis][travis-image]][travis-url]
[![standard][standard-image]][standard-url]
[![conduct][conduct]][conduct-url]

[npm-image]: https://img.shields.io/npm/v/kv-editor.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/kv-editor
[travis-image]: https://img.shields.io/travis/editdata/kv-editor.svg?style=flat-square
[travis-url]: https://travis-ci.org/editdata/kv-editor
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: http://npm.im/standard
[conduct]: https://img.shields.io/badge/code%20of%20conduct-contributor%20covenant-green.svg?style=flat-square
[conduct-url]: CONDUCT.md

## About

The goal of kv-editor is to make it easy to add an editable list of key/value pairs or just values to a page.

This editor only works with arrays or flat objects. No objects with nested properties will work.

## Install

```sh
npm install --save kv-editor
```

## Usage

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


## Documentation
- [Getting started](docs/getting-started.md)
- [Related modules](docs/related-modules.md)
- [API](docs/api.md)
- [Tests](tests/)

### Examples
- [Basic example](examples/basic-usage.js)

## Contributing

Contributions are welcome! Please read the [contributing guidelines](CONTRIBUTING.md) first.

## Conduct

It's important that this project contributes to a friendly, safe, and welcoming environment for all, particularly for folks that are historically underrepresented in technology. Read this project's [code of conduct](CONDUCT.md)

## Change log

Read about the changes to this project in [CHANGELOG.md](CHANGELOG.md). The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## Contact

- **chat** – You can chat about this project at [http://gitter.im/editdata/discuss](http://gitter.im/editdata/discuss)
- **issues** – Please open issues in the [issues queue](https://github.com/editdata/kv-editor/issues)
- **twitter** – [@edit_data](https://twitter.com/edit_data)
- **email** – Need in-depth support via paid contract? Send an email to sethvincent@gmail.com

## License

[ISC](LICENSE.md)
