import { EditorState } from 'prosemirror-state';

export default class ToolBarItem {
  constructor(public element: HTMLElement, public cmd?: any) {}

  update(state: EditorState) {
    const active = this.cmd(state);
    const { element } = this;
    if (active) {
      element.classList.remove('is-disabled');
    } else {
      element.classList.add('is-disabled');
    }
  }
}
