/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable import/no-duplicates */
import { html, fixture, expect } from '@open-wc/testing';
import './editor';
import { Editor } from '..';

const isDisabledClass = 'is-disabled';

function checkUndo(editor, enabled) {
  const btn = editor.shadowRoot.querySelector('button[title="Undo"]');
  expect(btn).not.to.eq(null);
  expect(btn.classList.contains(isDisabledClass)).to.eq(!enabled);
  if (enabled) {
    btn.click();
  }
}

it('Default state', async () => {
  const el = await fixture(html`<editor-view></editor-view>`);
  const { editor } = el;
  expect(editor instanceof Editor).to.eq(true);
  expect(editor.contentHTML()).to.eq('');

  const { rootElement } = editor;
  expect(rootElement.id).to.eq('editor');
  const toolbarEl = rootElement.querySelector('.kx-toolbar');
  const toolbarStyles = window.getComputedStyle(toolbarEl);
  expect(toolbarStyles.display).to.eq('flex');
  expect(toolbarStyles.flexWrap).to.eq('wrap');
  expect(toolbarStyles.paddingBottom).to.eq('3.2px');
});

it('setContent', async () => {
  const el = await fixture(
    html`<editor-view
      content="<h2>kangxi-editor</h2><hr/><p>I like <code>printf</code> and <code>scanf</code>.</p>"
    ></editor-view>`,
  );
  const { editor } = el;

  expect(editor.contentHTML()).to.be.eq(
    '<h2>kangxi-editor</h2><hr><p>I like <code>printf</code> and <code>scanf</code>.</p>',
  );
  editor.setContentHTML('<h1>mod</h1>');
  expect(editor.contentHTML()).to.be.eq('<h1>mod</h1>');
  // Should trigger `contentChanged`.
  expect(el.contentChangedCalls).to.deep.eq(['<h1>mod</h1>']);

  // Undo.
  checkUndo(el, true);
  expect(editor.contentHTML()).to.be.eq(
    '<h2>kangxi-editor</h2><hr><p>I like <code>printf</code> and <code>scanf</code>.</p>',
  );
});

it('resetContent', async () => {
  const el = await fixture(
    html`<editor-view
      content="<h2>kangxi-editor</h2><hr/><p>I like <code>printf</code> and <code>scanf</code>.</p>"
    ></editor-view>`,
  );
  const { editor } = el;

  expect(editor.contentHTML()).to.be.eq(
    '<h2>kangxi-editor</h2><hr><p>I like <code>printf</code> and <code>scanf</code>.</p>',
  );
  editor.resetContentHTML('<h1>mod</h1>');
  expect(editor.contentHTML()).to.be.eq('<h1>mod</h1>');
  // Should not trigger `contentChanged`.
  expect(el.contentChangedCalls).to.deep.eq([]);

  // Undo is not available.
  checkUndo(el, false);
});
