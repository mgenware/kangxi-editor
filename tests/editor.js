import { html, LitElement, css } from 'lit';
import { Editor } from '..';
import en from '../demo/en.js';
import editorStyles from '../dist/editor.css.js';

export class EditorView extends LitElement {
  static get styles() {
    return [
      editorStyles,
      css`
        #editor {
          padding: 0.5rem;
          border: 1px solid #eee;
          margin-bottom: 2rem;
        }

        .kx-theme-dark {
          --kx-back-color: black;
          --kx-fore-color: gray;
          --kx-toolbar-separator-color: #292929;
          --kx-fore-color: gray;
        }
      `,
    ];
  }

  static get properties() {
    return {
      content: { type: String },
    };
  }

  editor = null;
  contentChangedCalls = [];

  constructor() {
    super();
    this.content = null;
  }

  render() {
    return html`<div id="editor" class="kx-editor"></div>`;
  }

  firstUpdated() {
    this.editor = new Editor(this.shadowRoot.getElementById('editor'), {
      contentHTML: this.content,
      lang: en,
    });
    this.editor.contentChanged = (editor) => {
      this.contentChangedCalls.push(editor.contentHTML());
    };
  }
}

customElements.define('editor-view', EditorView);
