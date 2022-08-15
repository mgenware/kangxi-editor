import { baseKeymap } from 'prosemirror-commands';
import { keymap } from 'prosemirror-keymap';
import { EditorState, Transaction, Plugin } from 'prosemirror-state';
import { DOMParser, Schema, Node as ProsemirrorNode, DOMSerializer } from 'prosemirror-model';
import { throwIfEmpty } from 'throw-if-arg-empty';
import { EditorView } from 'prosemirror-view';
import { history } from 'prosemirror-history';
import setupToolbar from './toolbar/setup.js';
import { buildKeymap } from './keys/keymap.js';
import { schema as editorSchema } from './schema/schema.js';
import { contentClass, toolBarClass } from './defs.js';
import Options from './options.js';

function createDoc(html: string, schema: Schema): ProsemirrorNode {
  const srcElement = document.createElement('div') as HTMLElement;
  srcElement.innerHTML = html;
  return DOMParser.fromSchema(schema).parse(srcElement);
}

function createState(html: string, schema: Schema, plugins: Plugin[]): EditorState {
  const state = EditorState.create({
    doc: createDoc(html, schema),
    schema,
    plugins,
  });
  return state;
}

export default class Editor {
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
  // Fires when editor content changes.
  contentChanged?: (sender: Editor) => void;

  constructor(element: HTMLElement, opt?: Options) {
    throwIfEmpty(element, 'element');
    // eslint-disable-next-line no-param-reassign
    opt = opt || {};

    const plugins: Plugin[] = [
      history(),
      keymap(buildKeymap(editorSchema)),
      keymap(baseKeymap),
      setupToolbar(opt.localizedStrings || {}),
    ];
    const state = createState(opt.contentHTML || '', editorSchema, plugins);
    const view = new EditorView(element, {
      state,
      dispatchTransaction: (transaction: Transaction) => {
        const newState = view.state.apply(transaction);
        view.updateState(newState);
        if (transaction.docChanged) {
          this.contentChanged?.(this);
        }
      },
    });

    this.toolbarElement = element.querySelector(`.${toolBarClass}`) as HTMLElement;
    this.contentElement = element.querySelector('.ProseMirror') as HTMLElement;
    this.contentElement.classList.add(contentClass);

    this.view = view;
    this.schema = editorSchema;
    this.rootElement = element;
    this.plugins = plugins;
  }

  // Gets the inner HTML of the editor.
  contentHTML(): string {
    const fragment = DOMSerializer.fromSchema(this.schema).serializeFragment(
      this.view.state.doc.content,
    );
    const div = document.createElement('div');
    div.appendChild(fragment);
    const html = div.innerHTML;
    if (html === '<p></p>') {
      return '';
    }
    return html;
  }

  // Sets the inner HTML of the editor.
  // Unlike `resetContentHTML`, this can be reverted by undo.
  setContentHTML(html: string) {
    const { state } = this.view;
    const { doc } = state;
    const newDoc = createDoc(html, this.schema);
    const tr = state.tr.replaceWith(0, doc.content.size, newDoc);
    this.view.dispatch(tr);
  }

  // Resets the inner HTML of the editor.
  // Unlike `setContentHTML`, this clears undo history.
  resetContentHTML(html: string) {
    // DO NOT reuse `editorView.state`, `editorView.state.plugins` is always empty.
    // Use createState to start a new state.
    const state = createState(html, this.schema, this.plugins);
    this.view.updateState(state);
  }

  focus() {
    this.view.focus();
  }

  hasFocus(): boolean {
    return this.view.hasFocus();
  }
}
