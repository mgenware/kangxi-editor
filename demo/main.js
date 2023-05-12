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
          height: 500px;
        }

        :root {
          --kx-back-color: rgb(255, 255, 255);
          --kx-fore-color: rgb(66, 66, 66);
          --kx-toolbar-separator-color: #9b9b9b;
        }
      `,
    ];
  }

  constructor() {
    super();

    this.localizedStrings = en;
  }
}
customElements.define('kx-editor-example', KXEditorExample);

function getEditor() {
  const editor = document.getElementById('editor');
  if (!editor) {
    throw new Error('No editor instance found');
  }
  return editor;
}

document.getElementById('getContentBtn').addEventListener('click', () => {
  alert(getEditor().contentHTML() || '""');
});

document.getElementById('getTextContentBtn').addEventListener('click', () => {
  alert(getEditor().contentText() || '""');
});

function setContent(canUndo) {
  if (canUndo) {
    getEditor().setContentHTML(contentExample);
  } else {
    getEditor().resetContentHTML(contentExample);
  }
}

document.getElementById('setContentBtn').addEventListener('click', () => {
  setContent(true);
});

document.getElementById('resetContentBtn').addEventListener('click', () => {
  setContent(false);
});
