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
  static create(src: string | HTMLElement, content?: string): Editor {
    throwIfEmpty(src, 'src');
    let editorElement: HTMLElement;
    if (typeof src === 'string') {
      editorElement = document.querySelector(src) as HTMLElement;
      if (!editorElement) {
        throw new Error(`The selector "${src}" does not match anything`);
      }
    } else {
      editorElement = src as HTMLElement;
    }
    content = content || '';
    const toolbarElement = editorElement.querySelector(
      '.kx-toolbar',
    ) as HTMLElement;
    const contentElement = editorElement.querySelector(
      '.kx-content',
    ) as HTMLElement;

    if (!toolbarElement) {
      throw new Error(`ToolBar element not found`);
    }
    if (!contentElement) {
      throw new Error(`Content element not found`);
    }

    const plugins: Plugin[] = [
      history(),
      keymap(buildKeymap(editorSchema, null)),
      keymap(baseKeymap),
      setupToolbar(toolbarElement as HTMLElement),
    ];
    const state = createState(content, editorSchema, plugins);

    const view = new EditorView(contentElement, {
      state,
      dispatchTransaction(transaction: Transaction) {
        const newState = view.state.apply(transaction);
        view.updateState(newState);
      },
    });
    return new Editor(view, editorSchema, plugins, contentElement);
  }

  constructor(
    public core: EditorView,
    public schema: Schema,
    public plugins: Plugin[],
    public contentElement: HTMLElement,
  ) {}

  htmlContent(): string {
    const root = this.contentElement;
    if (root.firstElementChild) {
      return root.firstElementChild.innerHTML;
    }
    return '';
  }

  setHtmlContent(html: string) {
    html = html || '';
    // DO NOT reuse `editorView.state`, `editorView.state.plugins` is always empty.
    const state = createState(html, this.schema, this.plugins);
    this.core.updateState(state);
  }
}

export default Editor;
