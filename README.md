# kangxi

[![MEAN Module](https://img.shields.io/badge/MEAN%20Module-TypeScript-blue.svg?style=flat-square)](https://github.com/mgenware/MEAN-Module)
[![npm version](https://img.shields.io/npm/v/kangxi-editor.svg?style=flat-square)](https://npmjs.com/package/kangxi-editor)

Another WYSIWYG editor

### Demo

https://coldfunction.com/dds/dev/kangxi/main.html

## Installation

```sh
yarn add kangxi-editor
```

## Usage

For Node.js bundlers:

```js
// Editor class
import Editor from 'kangxi-editor';
// Style file
import 'kangxi-editor/dist/editor.css';
// Translation data
import EditorLang from 'kangxi-editor/dist/langs/en';

const editor = KXEditor.create(this.editorElement, {
  contentHTML: '<p>Hello World</p>',
  lang: EditorLang,
});
```

For browsers:

```html
<head>
  <!-- Style file -->
  <link rel="stylesheet" href="./dist/editor.css" />
</head>
<body>
  <!-- Editor element -->
  <div id="editor" class="kx-editor"></div>

  <!-- Language file -->
  <script src="./dist/langs/en.js"></script>
  <script src="./dist/main.js"></script>
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      if (!window.kangxi) {
        console.error('kangxi not installed');
      } else {
        // Use `window.kangxi.Editor` to access the `Editor` type in browser build
        window.editor = window.kangxi.Editor.create(
            document.getElementById('editor'),
            {
              contentHTML: `<p>Hello World</p>`,
              // Use `window.kangxi_lang_<name>` to access the language type in browser build
              lang: window.kangxi_lang_en,
            },
        );
      }
    });
  </script>
</body>
```

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

  // Creates an editor.
  //  * `src`: HTML element or a query selector to mount the editor.
  //  * `opt`: Options [see details below]
  static create(src: string | HTMLElement, opt?: Option): Editor;

  // Returns the HTML content of the current editor.
  htmlContent(): string;
  // Sets the HTML content of the current editor.
  setHtmlContent(html: string): void;
}

// Options
interface Option {
  // Initial content HTML upon creation.
  contentHTML?: string;
  // Translation data.
  lang?: { [key: string]: string };
}
```
