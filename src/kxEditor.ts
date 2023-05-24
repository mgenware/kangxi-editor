import { LitElement, css, html, CSSResultGroup } from 'lit';
import { property } from 'lit/decorators.js';
import Editor from './editor.js';
import LS from './ls.js';

const editorID = 'editor';

// A lit-based component based on the core editor.
export class KXEditor extends LitElement {
  static override get styles(): CSSResultGroup {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return css`
      :host {
        height: 100%;
      }

      *,
      ::before,
      ::after {
        box-sizing: border-box;
      }

      /** ======= Start of prosemirror.css ======= */
      .ProseMirror {
        position: relative;
      }

      .ProseMirror {
        word-wrap: break-word;
        white-space: pre-wrap;
        white-space: break-spaces;
        -webkit-font-variant-ligatures: none;
        font-variant-ligatures: none;
        font-feature-settings: 'liga' 0; /* the above doesn't seem to work in Edge */
      }

      .ProseMirror pre {
        white-space: pre-wrap;
      }

      .ProseMirror li {
        position: relative;
      }

      .ProseMirror-hideselection *::selection {
        background: transparent;
      }
      .ProseMirror-hideselection *::-moz-selection {
        background: transparent;
      }
      .ProseMirror-hideselection {
        caret-color: transparent;
      }

      .ProseMirror-selectednode {
        outline: 2px solid #8cf;
      }

      /* Make sure li selections wrap around markers */

      li.ProseMirror-selectednode {
        outline: none;
      }

      li.ProseMirror-selectednode:after {
        content: '';
        position: absolute;
        left: -32px;
        right: -2px;
        top: -2px;
        bottom: -2px;
        border: 2px solid #8cf;
        pointer-events: none;
      }

      /* Protect against generic img rules */

      img.ProseMirror-separator {
        display: inline !important;
        border: none !important;
        margin: 0 !important;
      }

      /** ======= End of prosemirror.css ======= */

      .kx-content {
        flex: 1 1 auto;
      }

      .kx-editor {
        border: 1px solid var(--kx-separator-color);
        --kx-toolbar-separator-color: var(--kx-separator-color);
        background: var(--kx-back-color);
        color: var(--kx-fore-color);

        display: flex;
        flex-direction: column;
        height: 100%;
        padding: 0.5rem;
      }

      .kx-editor .ProseMirror {
        padding: 0.8rem 0.5rem;
        overflow-y: auto;
      }

      .kx-editor .ProseMirror:focus {
        outline: none;
      }

      .ProseMirror-selectednode {
        outline: 1px dashed rgb(185, 185, 185);
      }

      .kx-toolbar {
        display: flex;
        padding-bottom: 0.2rem;
        border-bottom: 1px solid var(--kx-toolbar-separator-color, #ddd);
        margin-bottom: 0.2rem;
        flex-wrap: wrap;
      }

      .kx-toolbar button {
        display: inline-flex;
        padding: 0.2rem;
        margin: 0 1px;
        border-radius: 0.15em;
        text-decoration: none;
        text-align: center;
        vertical-align: top;
        align-items: center;
        cursor: pointer;
        border-color: transparent;
        filter: brightness(100%);
        transition: all 0.3s ease;
        color: var(--kx-fore-color);
        background-color: var(--kx-back-color);
        user-select: none;
      }

      .kx-toolbar button.is-active,
      .kx-toolbar button:hover:not(.is-disabled) {
        color: var(--kx-back-color);
        background-color: var(--kx-fore-color);
      }

      .kx-toolbar button svg {
        fill: var(--kx-fore-color);
      }

      .kx-toolbar button.is-active svg,
      .kx-toolbar button:hover:not(.is-disabled) svg {
        fill: var(--kx-back-color);
      }

      .kx-toolbar button.is-disabled {
        opacity: 0.5;
        pointer-events: none;
      }

      /* For textual buttons */
      .kx-toolbar span {
        font-size: 1rem;
        font-weight: bold;
      }

      .kx-toolbar .separator {
        border-right: 1px solid var(--kx-toolbar-separator-color, #ddd);
        margin-left: 2px;
        margin-right: 2px;
      }
    `;
  }

  @property({ type: Object }) localizedStrings: LS | undefined;

  // Used to store content HTML when editor view is not available.
  private backupContentHTML = '';

  contentHTML(): string {
    return this.editor ? this.editor.contentHTML() : this.backupContentHTML;
  }

  contentText(): string {
    return this.editor?.contentText() ?? '';
  }

  setContentHTML(val: string) {
    this.setContentHTMLInternal(val, true);
  }

  get coreEditor(): Editor | undefined {
    return this.editor;
  }

  resetContentHTML(val: string) {
    this.setContentHTMLInternal(val, false);
  }

  private setContentHTMLInternal(val: string, canUndo: boolean) {
    this.backupContentHTML = val;
    if (this.editor) {
      if (canUndo) {
        this.editor.setContentHTML(val);
      } else {
        this.editor.resetContentHTML(val);
      }
    }
  }

  private editor?: Editor;

  private get editorEl(): HTMLElement | null {
    return this.shadowRoot?.getElementById(editorID) as HTMLElement | null;
  }

  override firstUpdated() {
    if (!this.editorEl) {
      return;
    }
    if (!this.localizedStrings) {
      console.warn('kangxi-editor: Empty localized strings!');
    }
    const editor = new Editor(this.editorEl, {
      localizedStrings: this.localizedStrings,
    });
    editor.resetContentHTML(this.backupContentHTML);
    editor.contentChanged = (ed) => {
      this.dispatchEvent(new CustomEvent<string>('editor-change', { detail: ed.contentHTML() }));
    };

    this.editor = editor;
  }

  override focus() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    this.editor?.view.focus();
  }

  // eslint-disable-next-line class-methods-use-this
  override render() {
    return html`<div id=${editorID} class="kx-editor"></div>`;
  }
}
