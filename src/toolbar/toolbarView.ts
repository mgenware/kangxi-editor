import ToolBarItem from './toolbarItem';
import { EditorView } from 'prosemirror-view';

export default class ToolBarView {
  constructor(
    public container: HTMLElement,
    public items: ToolBarItem[],
    public editorView: EditorView,
  ) {
    for (const child of items) {
      container.appendChild(child.element);
    }
    this.update();

    for (const child of this.items) {
      child.element.addEventListener('mouseup', e => {
        e.preventDefault();
        editorView.focus();
        child.cmd(editorView.state, editorView.dispatch, editorView);
      });
    }
    this.container = container;
  }

  update() {
    for (const child of this.items) {
      const active = child.cmd(this.editorView.state, null, this.editorView);
      child.element.style.display = active ? '' : 'none';
    }
  }

  destroy() {
    this.container.remove();
  }
}
