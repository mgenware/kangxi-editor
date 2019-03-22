import { baseKeymap } from 'prosemirror-commands';
import { keymap } from 'prosemirror-keymap';
import { EditorState, Transaction } from 'prosemirror-state';
import { DOMParser } from 'prosemirror-model';
import { schema } from './schema/schema';
import { EditorView } from 'prosemirror-view';
import { history } from 'prosemirror-history';
import setupToolbar from './toolbar/setup';
import { throwIfEmpty } from 'throw-if-arg-empty';
import './style.css';
import { buildKeymap } from './keys/keymap';

export function mount(selector: string) {
  throwIfEmpty(selector, 'selector');
  const editorElement = document.querySelector(selector);
  if (!editorElement) {
    throw new Error(`The selector "${selector}" does not match anything`);
  }
  const toolbarElement = editorElement.querySelector('.kx-toolbar');
  const contentElement = editorElement.querySelector('.kx-content');

  if (!toolbarElement) {
    throw new Error(`ToolBar element not found inside "${selector}"`);
  }
  if (!contentElement) {
    throw new Error(`Content element not found inside "${selector}"`);
  }

  if (editorElement) {
    const state = EditorState.create({
      doc: DOMParser.fromSchema(schema).parse(document.querySelector(
        '#content',
      ) as HTMLElement),
      plugins: [
        history(),
        keymap(buildKeymap(schema, null)),
        keymap(baseKeymap),
        setupToolbar(toolbarElement as HTMLElement),
      ],
    });
    const view = new EditorView(editorElement, {
      state,
      dispatchTransaction(transaction: Transaction) {
        const newState = view.state.apply(transaction);
        view.updateState(newState);
      },
    });
  }
}
