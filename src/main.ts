import { baseKeymap } from 'prosemirror-commands';
import { keymap } from 'prosemirror-keymap';
import { EditorState, Transaction, Plugin } from 'prosemirror-state';
import { DOMParser, Schema, Node as ProsemirrorNode } from 'prosemirror-model';
import { schema as editorSchema } from './schema/schema';
import { EditorView } from 'prosemirror-view';
import { history } from 'prosemirror-history';
import setupToolbar from './toolbar/setup';
import { throwIfEmpty } from 'throw-if-arg-empty';
import { buildKeymap } from './keys/keymap';
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
  static create(element: HTMLElement, opt?: Option): Editor {
    throwIfEmpty(element, 'element');
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
      dispatchTransaction(transaction: Transaction) {
        const newState = view.state.apply(transaction);
        view.updateState(newState);
      },
    });
    return new Editor(view, editorSchema, plugins, element);
  }

  toolbarElement: HTMLElement;
  contentElement: HTMLElement;

  constructor(
    public view: EditorView,
    public schema: Schema,
    public plugins: Plugin[],
    public rootElement: HTMLElement,
  ) {
    this.toolbarElement = rootElement.querySelector(
      '.' + ToolBarClass,
    ) as HTMLElement;
    this.contentElement = rootElement.querySelector(
      '.ProseMirror',
    ) as HTMLElement;
  }

  get contentHTML(): string {
    return this.contentElement.innerHTML;
  }

  set contentHTML(html: string) {
    html = html || '';
    // DO NOT reuse `editorView.state`, `editorView.state.plugins` is always empty. Use createState to start a new state.
    const state = createState(html, this.schema, this.plugins);
    this.view.updateState(state);
  }
}

export default Editor;
