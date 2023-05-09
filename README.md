# kangxi-editor

[![Build Status](https://github.com/mgenware/kangxi-editor/workflows/Build/badge.svg)](https://github.com/mgenware/kangxi-editor/actions)
[![MEAN Module](https://img.shields.io/badge/MEAN%20Module-TypeScript-blue.svg?style=flat-square)](https://github.com/mgenware/MEAN-Module)
[![npm version](https://img.shields.io/npm/v/kangxi-editor.svg?style=flat-square)](https://npmjs.com/package/kangxi-editor)

Another web-based rich text editor.

## Demo

[Demo](https://mgenware.github.io/kangxi-editor/)

## Installation

```sh
npm add kangxi-editor
```

## Usage

### Example

- Clone or download this repo
- Build the project `npm i && npm run r build`
- Run the example in browser `npm run r serve`

### API

```js
class Editor {
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

  // Gets the inner HTML of the editor.
  contentHTML(): string;
  // Gets the text content of the editor.
  contentText(): string;
  // Sets the inner HTML of the editor.
  // Unlike `resetContentHTML`, this can be reverted by undo.
  setContentHTML(html: string);
  // Resets the inner HTML of the editor.
  // Unlike `setContentHTML`, this clears undo history.
  resetContentHTML(html: string);
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
--kx-fore-color
--kx-toolbar-separator-color
```
