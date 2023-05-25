/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable import/no-duplicates */
import { html, fixture, expect } from '@open-wc/testing';
import { css } from 'lit';
import '../dist/main.js';
import { KXEditor, LS } from '../dist/main.js';

const isDisabledClass = 'is-disabled';

const en: LS = {
  bold: 'Bold',
  italic: 'Italic',
  underline: 'Underline',
  strikethrough: 'Strikethrough',
  numberedList: 'Numbered list',
  bulletList: 'Bullet list',
  blockquote: 'Blockquote',
  decreaseIndent: 'Decrease indent',
  code: 'Code',
  undo: 'Undo',
  redo: 'Redo',
  horizontalRule: 'Horizontal Rule',
};

class TEditor extends KXEditor {
  static override get styles() {
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
      `,
    ];
  }

  constructor() {
    super();

    this.localizedStrings = en;
  }
}
customElements.define('t-editor', TEditor);

function checkUndo(editor: HTMLElement, enabled: boolean) {
  const btn = editor.shadowRoot!.querySelector<HTMLButtonElement>('button[title="Undo"]');
  expect(btn).not.to.eq(null);
  expect(btn!.classList.contains(isDisabledClass)).to.eq(!enabled);
  if (enabled) {
    btn!.click();
  }
}

it('Default state', async () => {
  const el = await fixture<KXEditor>(html`<t-editor></t-editor>`);
  expect(el.contentHTML()).to.eq('');

  const coreEditor = el.coreEditor!;
  const { rootElement } = coreEditor;
  expect(rootElement.id).to.eq('editor');
  const toolbarEl = rootElement.querySelector('.kx-toolbar')!;
  const toolbarStyles = window.getComputedStyle(toolbarEl);
  expect(toolbarStyles.display).to.eq('flex');
  expect(toolbarStyles.flexWrap).to.eq('wrap');
  expect(toolbarStyles.paddingBottom).to.eq('3.2px');
});

it('setContent', async () => {
  const changeList: string[] = [];
  const el = await fixture<KXEditor>(
    html`<t-editor
      @editor-change=${(e: CustomEvent<KXEditor>) =>
        changeList.push(e.detail.contentHTML())}></t-editor>`,
  );

  expect(el.contentHTML()).to.eq('');
  el.setContentHTML('<h1>mod</h1>');
  expect(el.contentHTML()).to.be.eq('<h1>mod</h1>');

  // Should trigger change event.
  expect(changeList).to.deep.eq(['<h1>mod</h1>']);
});

it('resetContent', async () => {
  const changeList: string[] = [];
  const el = await fixture<KXEditor>(
    html`<t-editor
      @editor-change=${(e: CustomEvent<KXEditor>) =>
        changeList.push(e.detail.contentHTML())}></t-editor>`,
  );

  expect(el.contentHTML()).to.eq('');
  el.resetContentHTML('<h1>mod</h1>');
  expect(el.contentHTML()).to.eq('<h1>mod</h1>');

  // Should not trigger change event.
  expect(changeList).to.deep.eq([]);

  // Undo is not available.
  checkUndo(el, false);
});
