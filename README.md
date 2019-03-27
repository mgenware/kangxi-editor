# kangxi

Another WYSIWYG editor

### Demo

https://coldfunction.com/dds/dev/kangxi/main.html

## Installation

```sh
yarn add kangxi-editor
```

## Usage

For Node.js/bundlers:

```js
import Editor from 'kangxi-editor';
import 'kangxi-editor/dist/editor.css';
```

For browser:

```html
<head>
  <link rel="stylesheet" href="./dist/editor.css" />
</head>
<body>
  <div id="editor" class="kx-editor"></div>
  <script src="./dist/main.js"></script>
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      if (!window.kangxi) {
        console.error('kangxi not installed');
      } else {
        window.editor = window.kangxi.Editor.create(
          document.getElementById('editor'),
          `<h2>Sample document</h2>
<p>This is a sample document, thanks for using <code>kangxi</code></p>`,
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
  //  * `content`: Optional initial HTML content.
  static create(src: string | HTMLElement, contentHTML?: string): Editor;

  // Returns the HTML content of the current editor.
  htmlContent(): string;
  // Sets the HTML content of the current editor.
  setHtmlContent(html: string): void;
}
```
