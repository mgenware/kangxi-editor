# kangxi-editor

[![MEAN Module](https://img.shields.io/badge/MEAN%20Module-TypeScript-blue.svg?style=flat-square)](https://github.com/mgenware/MEAN-Module)
[![npm version](https://img.shields.io/npm/v/kangxi-editor.svg?style=flat-square)](https://npmjs.com/package/kangxi-editor)

Another WYSIWYG editor

## Demo

[Demo](https://mgenware.github.io/kangxi-editor/)

## Installation

```sh
yarn add kangxi-editor
```

## Usage

### Example

- Clone or download this repo
- Build the project `yarn && yarn r build`
- Run the example in browser `yarn r serve`

### API

```js
class Editor {
  // Gets or sets the inner HTML of the editor.
  contentHTML: string;
  // The underlying ProseMirror editor view.
  view: EditorView;
  // The underlying ProseMirror document schema.
  schema: Schema;
  // The underlying ProseMirror plugin array mounted.
  plugins: Plugin[];
  // The HTML element where editor is mounted.
  rootElement: HTMLElement;
  // The HTML element where editor toolbar is mounted.
  toolbarElement: HTMLElement;
  // The HTML element where editor content area is mounted.
  contentElement: HTMLElement;
  // Fires when editor content changes.
  contentChanged?: (sender: Editor) => void;

  // Creates a new editor.
  //  * `src`: HTML element or a query selector to mount the editor.
  //  * `opt`: Options [see details below].
  constructor(src: string | HTMLElement, opt?: Options): Editor;
}

// Options
interface Options {
  // Initial content HTML upon creation.
  contentHTML?: string;
  // Localized strings. See `./dist/lang.d.ts` for definition.
  lang?: Lang;
}
```

### CSS Variables

```
--kx-back-color
--kx-text-color
--kx-toolbar-separator-color
--kx-toolbar-button-color
```
