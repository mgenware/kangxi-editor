import { baseKeymap } from 'prosemirror-commands';
import { keymap } from 'prosemirror-keymap';
import { EditorState, Transaction } from 'prosemirror-state';
import { DOMParser } from 'prosemirror-model';
import { schema } from 'prosemirror-schema-basic';
import { EditorView } from 'prosemirror-view';
import { undo, redo, history } from 'prosemirror-history';
import setupToolbar from './toolbar/setup';
import { throwIfEmpty } from 'throw-if-arg-empty';
import './style.css';

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
        keymap({ 'Mod-z': undo, 'Mod-y': redo }),
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
