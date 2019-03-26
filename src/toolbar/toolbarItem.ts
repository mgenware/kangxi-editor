// Modified from https://github.com/ProseMirror/prosemirror-menu
import { EditorState } from 'prosemirror-state';

export default class ToolBarItem {
  // Plugins are reloaded on state changes, but events are not re-registered.
  // This property indicates events are already registered.
  registered = false;
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
