/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable import/no-duplicates */
import { html, fixture, expect } from '@open-wc/testing';
import './editor';
import { Editor } from '..';

it('Internal editor is set up', async () => {
  const el = await fixture(html`<editor-view></editor-view>`);
  const { editor } = el;
  expect(editor instanceof Editor).to.eq(true);
  expect(editor.contentHTML).to.eq('');
});

it('Set content', async () => {
  const el = await fixture(
    html`<editor-view
      content="<h2>kangxi-editor</h2><hr/><p>I like <code>printf</code> and <code>scanf</code>.</p>"
    ></editor-view>`,
  );
  const { editor } = el;

  expect(editor.contentHTML).to.be.eq(
    '<h2>kangxi-editor</h2><hr><p>I like <code>printf</code> and <code>scanf</code>.</p>',
  );
  editor.contentHTML = '<h1>mod</h1>';
  expect(editor.contentHTML).to.be.eq('<h1>mod</h1>');
  // `setContentHTML` doesn't trigger `contentChanged`.
  expect(el.contentChangedCalls).to.deep.eq([]);
});
