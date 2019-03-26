import { baseKeymap } from 'prosemirror-commands';
import { keymap } from 'prosemirror-keymap';
import { EditorState, Transaction, Plugin } from 'prosemirror-state';
import { DOMParser, Schema, Node as ProsemirrorNode } from 'prosemirror-model';
import { schema as editorSchema } from './schema/schema';
import { EditorView } from 'prosemirror-view';
import { history } from 'prosemirror-history';
import setupToolbar from './toolbar/setup';
import { throwIfEmpty } from 'throw-if-arg-empty';
import './style.css';
import { buildKeymap } from './keys/keymap';

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
  static create(element: HTMLElement, content?: string): Editor {
    throwIfEmpty(element, 'element');
    content = content || '';

    const plugins: Plugin[] = [
      history(),
      keymap(buildKeymap(editorSchema, null)),
      keymap(baseKeymap),
      setupToolbar(),
    ];
    const state = createState(content, editorSchema, plugins);

    const view = new EditorView(element, {
      state,
      dispatchTransaction(transaction: Transaction) {
        const newState = view.state.apply(transaction);
        view.updateState(newState);
      },
    });
    return new Editor(view, editorSchema, plugins, element);
  }

  constructor(
    public view: EditorView,
    public schema: Schema,
    public plugins: Plugin[],
    public contentElement: HTMLElement,
  ) {}

  htmlContent(): string {
    const node = this.contentElement.firstElementChild;
    if (!node) {
      return '';
    }
    return node.innerHTML;
  }

  setHtmlContent(html: string) {
    html = html || '';
    // DO NOT reuse `editorView.state`, `editorView.state.plugins` is always empty. Use createState to start a new state.
    const state = createState(html, this.schema, this.plugins);
    this.view.updateState(state);
  }
}

export default Editor;
