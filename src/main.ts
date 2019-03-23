import { baseKeymap } from 'prosemirror-commands';
import { keymap } from 'prosemirror-keymap';
import { EditorState, Transaction } from 'prosemirror-state';
import { DOMParser, Schema } from 'prosemirror-model';
import { schema } from './schema/schema';
import { EditorView } from 'prosemirror-view';
import { history } from 'prosemirror-history';
import setupToolbar from './toolbar/setup';
import { throwIfEmpty } from 'throw-if-arg-empty';
import './style.css';
import { buildKeymap } from './keys/keymap';

export class Editor {
  constructor(
    public core: EditorView,
    public editorSchema: Schema,
    public contentElement: HTMLElement,
  ) {}

  htmlContent(): string {
    const root = this.contentElement;
    if (root.firstElementChild) {
      return root.firstElementChild.innerHTML;
    }
    return '';
  }
}

export function mount(src: string | HTMLElement, content?: string): Editor {
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
  const toolbarElement = editorElement.querySelector('.kx-toolbar');
  const contentElement = editorElement.querySelector(
    '.kx-content',
  ) as HTMLElement;

  if (!toolbarElement) {
    throw new Error(`ToolBar element not found`);
  }
  if (!contentElement) {
    throw new Error(`Content element not found`);
  }

  const srcElement = document.createElement('div') as HTMLElement;
  srcElement.innerHTML = content;

  const state = EditorState.create({
    doc: DOMParser.fromSchema(schema).parse(srcElement),
    plugins: [
      history(),
      keymap(buildKeymap(schema, null)),
      keymap(baseKeymap),
      setupToolbar(toolbarElement as HTMLElement),
    ],
  });
  const view = new EditorView(contentElement, {
    state,
    dispatchTransaction(transaction: Transaction) {
      const newState = view.state.apply(transaction);
      view.updateState(newState);
    },
  });
  return new Editor(view, schema, contentElement);
}
