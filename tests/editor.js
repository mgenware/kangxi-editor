import '..';
import { Editor } from '..';
import en from '../demo/en.js';
import { html, LitElement, css } from 'lit-element';

export class EditorView extends LitElement {
  static get styles() {
    return css`
      #editor {
        padding: 0.5rem;
        border: 1px solid #eee;
        margin-bottom: 2rem;
      }

      .kx-theme-dark {
        --kx-back-color: black;
        --kx-text-color: gray;
        --kx-toolbar-separator-color: #292929;
        --kx-toolbar-button-color: gray;
      }
    `;
  }

  editor = null;

  render() {
    return html`<div id="editor" class="kx-editor"></div>`;
  }

  firstUpdated() {
    this.editor = new Editor(this.shadowRoot.getElementById('editor'), {
      contentHTML: `<h2>kangxi-editor</h2><hr/>
<p>I like <code>printf</code> and <code>scanf</code>.</p>`,
      lang: en,
    });
  }
}

customElements.define('editor-view', EditorView);
