import { baseKeymap } from 'prosemirror-commands';
import { keymap } from 'prosemirror-keymap';
import { EditorState, Transaction, Plugin } from 'prosemirror-state';
import { DOMParser, Schema, Node as ProsemirrorNode } from 'prosemirror-model';
import { throwIfEmpty } from 'throw-if-arg-empty';
import { EditorView } from 'prosemirror-view';
import { history } from 'prosemirror-history';
import setupToolbar from './toolbar/setup';
import { buildKeymap } from './keys/keymap';
import { schema as editorSchema } from './schema/schema';
import { ToolBarClass } from './defs';
import Option from './option';

function createDoc(html: string, schema: Schema): ProsemirrorNode {
  const srcElement = document.createElement('div') as HTMLElement;
  srcElement.innerHTML = html;
  return DOMParser.fromSchema(schema).parse(srcElement);
}

function createState(
  html: string,
  schema: Schema,
  plugins: Plugin[],
): EditorState {
  const state = EditorState.create({
    doc: createDoc(html, schema),
    schema,
    plugins,
  });
  return state;
}

export class Editor {
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

  constructor(element: HTMLElement, opt?: Option) {
    throwIfEmpty(element, 'element');
    // eslint-disable-next-line no-param-reassign
    opt = opt || {};

    const plugins: Plugin[] = [
      history(),
      keymap(buildKeymap(editorSchema, null)),
      keymap(baseKeymap),
      setupToolbar(opt.lang || {}),
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

    this.toolbarElement = element.querySelector(
      '.' + ToolBarClass,
    ) as HTMLElement;
    this.contentElement = element.querySelector('.ProseMirror') as HTMLElement;

    this.view = view;
    this.schema = editorSchema;
    this.rootElement = element;
    this.plugins = plugins;
  }

  // Gets the inner HTML of the editor.
  get contentHTML(): string {
    const html = this.contentElement.innerHTML;
    // Treat empty content as empty string
    if (html === '<p><br></p>') {
      return '';
    }
    return html;
  }

  // Sets the inner HTML of the editor.
  set contentHTML(html: string) {
    // eslint-disable-next-line no-param-reassign
    html = html || '';
    // DO NOT reuse `editorView.state`, `editorView.state.plugins` is always empty.
    // Use createState to start a new state.
    const state = createState(html, this.schema, this.plugins);
    this.view.updateState(state);
  }
}

export default Editor;
