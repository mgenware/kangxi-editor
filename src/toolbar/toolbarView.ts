import { ToolBarItem, ToolBarUIItem } from './toolbarItem';
import { EditorView } from 'prosemirror-view';
import toTypeString from 'to-type-string';

// https://stackoverflow.com/questions/384286/javascript-isdom-how-do-you-check-if-a-javascript-object-is-a-dom-object
function isElement(o: any) {
  return typeof HTMLElement === 'object'
    ? o instanceof HTMLElement // DOM2
    : o &&
        typeof o === 'object' &&
        o !== null &&
        o.nodeType === 1 &&
        typeof o.nodeName === 'string';
}

export default class ToolBarView {
  items: ToolBarItem[];

  constructor(
    public container: HTMLElement,
    uiItems: ToolBarUIItem[],
    public editorView: EditorView,
  ) {
    const items: ToolBarItem[] = [];
    for (const child of uiItems) {
      let element: HTMLElement;
      if (isElement(child)) {
        element = child as HTMLElement;
      } else if (child instanceof ToolBarItem) {
        const item = child as ToolBarItem;
        element = item.element;
        items.push(item);
      } else {
        throw new Error(
          `Unsupported toolbar item type, "${toTypeString(child)}"`,
        );
      }
      container.appendChild(element);
    }
    this.items = items;

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
      if (active) {
        child.element.removeAttribute('disabled');
      } else {
        child.element.setAttribute('disabled', '');
      }
    }
  }

  destroy() {
    this.container.remove();
  }
}
