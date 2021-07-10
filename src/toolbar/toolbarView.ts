// Modified from https://github.com/ProseMirror/prosemirror-menu
import { EditorView } from 'prosemirror-view';
import ToolBarItem from './toolbarItem';
import { toolBarClass } from '../defs';

export default class ToolBarView {
  items: ToolBarItem[];
  element: HTMLElement;

  constructor(userItems: ToolBarItem[], public editorView: EditorView) {
    const element = document.createElement('div');
    element.className = toolBarClass;
    const items: ToolBarItem[] = [];
    for (const child of userItems) {
      if (child.cmd) {
        items.push(child);
      }
      element.appendChild(child.element);
    }
    this.items = items;

    this.update();
    for (const child of this.items) {
      if (!child.registered) {
        child.element.addEventListener('click', (e) => {
          e.preventDefault();
          editorView.focus();
          if (child.cmd) {
            // Some commands may need the third param, the editor view
            // eslint-disable-next-line @typescript-eslint/unbound-method
            child.cmd(editorView.state, editorView.dispatch, editorView);
          }
        });
        child.registered = true;
      }
    }
    if (editorView.dom.parentElement) {
      editorView.dom.parentElement.prepend(element);
    }
    this.element = element;
  }

  update() {
    for (const child of this.items) {
      child.update(this.editorView.state);
    }
  }

  destroy() {
    this.element.remove();
  }
}
