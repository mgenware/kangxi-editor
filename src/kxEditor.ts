import { CSSResultGroup, LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';
import Editor from './editor.js';
import LS from './ls.js';
import pmStyles from './prosemirror.css.js';

const editorID = 'editor';

// A lit-based component based on the core editor.
export class KXEditor extends LitElement {
  static override get styles() {
    return [
      pmStyles,
      css`
        :host {
          height: 100%;
        }

        *,
        ::before,
        ::after {
          box-sizing: border-box;
        }

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
      `,
    ] as CSSResultGroup;
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
      console.warn('kangxi-editor: `localizedStrings` is not set.');
    }
    const editor = new Editor(this.editorEl, {
      localizedStrings: this.localizedStrings,
    });
    editor.resetContentHTML(this.backupContentHTML);
    editor.contentChanged = () => {
      this.dispatchEvent(new CustomEvent<KXEditor>('editor-change', { detail: this }));
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
