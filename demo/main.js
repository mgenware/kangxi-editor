import { css } from '../node_modules/lit/index.js';
import '../dist/main.js';
import { KXEditor } from '../dist/main.js';
import en from './en.js';

const contentExample = '<h2>Title</h2><hr/><p>New <b>document</b></p>';

export class KXEditorExample extends KXEditor {
  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
        }
        body {
          padding: 2rem;
          font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
            'Apple Color Emoji', 'Segoe UI Emoji';
        }

        code {
          border-radius: 5px;
          border: 1px solid #bcbec0;
          padding: 3px;
          font-family: ui-monospace, SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace;
        }

        pre code {
          border-radius: 0px;
          border: 0px;
          padding: 4px;
          font-family: ui-monospace, SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace;
        }

        blockquote {
          border-left: 0.8rem solid var(--kx-fore-color);
          margin: 1.5rem 0.8rem;
          padding: 0.5rem 0.8rem;
        }

        #editor {
          padding: 0.5rem;
          border: 1px solid rgb(104, 104, 104);
          margin-bottom: 2rem;
          min-height: 400px;
        }

        :root {
          --kx-back-color: rgb(255, 255, 255);
          --kx-fore-color: rgb(66, 66, 66);
          --kx-toolbar-separator-color: #9b9b9b;
        }

        .kx-theme-dark {
          --kx-back-color: black;
          --kx-fore-color: gray;
          --kx-toolbar-separator-color: #292929;
        }
      `,
    ];
  }
}
customElements.define('kx-editor-example', KXEditorExample);

function setTheme(name) {
  if (name === 'dark') {
    document.body.classList.add('kx-theme-dark');
  } else if (name === 'light') {
    document.body.classList.remove('kx-theme-dark');
  } else {
    alert(`Unsupported theme "${name}"`);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.editor = new Editor(document.getElementById('editor'), {
    contentHTML: `<h2>kangxi-editor</h2><hr/>
<p>I like <code>printf</code> and <code>scanf</code>.</p>`,
    lang: en,
  });
  window.editor.contentChanged = (editor) => {
    console.log(`Content changed: ${editor.contentHTML()}`);
  };
});

document.getElementById('getContentBtn').addEventListener('click', () => {
  if (!window.editor) {
    console.error('Editor not created');
  } else {
    alert(window.editor.contentHTML());
  }
});

function setContent(canUndo) {
  if (!window.editor) {
    console.error('Editor not created');
  } else {
    if (canUndo) {
      window.editor.setContentHTML(contentExample);
    } else {
      window.editor.resetContentHTML(contentExample);
    }
  }
}

document.getElementById('setContentBtn').addEventListener('click', () => {
  setContent(true);
});

document.getElementById('resetContentBtn').addEventListener('click', () => {
  setContent(false);
});

document.getElementById('lightBtn').addEventListener('click', () => {
  setTheme('light');
});

document.getElementById('darkBtn').addEventListener('click', () => {
  setTheme('dark');
});
