import ToolBarItem from './toolbarItem';
import { EditorView } from 'prosemirror-view';

export default class ToolBarView {
  items: ToolBarItem[];

  constructor(
    public container: HTMLElement,
    userItems: ToolBarItem[],
    public editorView: EditorView,
  ) {
    const items: ToolBarItem[] = [];
    for (const child of userItems) {
      if (child.cmd) {
        items.push(child);
      }
      container.appendChild(child.element);
    }
    this.items = items;

    this.update();
    for (const child of this.items) {
      child.element.addEventListener('mouseup', e => {
        e.preventDefault();
        editorView.focus();
        // Some commands may need the third param, the editor view
        child.cmd(editorView.state, editorView.dispatch, editorView);
      });
    }
    this.container = container;
  }

  update() {
    for (const child of this.items) {
      child.update(this.editorView.state);
    }
  }
}
