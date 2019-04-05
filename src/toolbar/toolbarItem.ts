// Modified from https://github.com/ProseMirror/prosemirror-menu
import { EditorState, Transaction } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

export type CommandFunc = (
  state: EditorState,
  dispatch?: (tr: Transaction) => void,
  editorView?: EditorView,
) => boolean;

export default class ToolBarItem {
  // Plugins are reloaded on state changes, but events are not re-registered.
  // This property indicates events are already registered.
  registered = false;
  constructor(
    public element: HTMLElement,
    // cmd can be null, for non clickable items, i.e. separators
    public cmd: CommandFunc | null,
    public isActive?: CommandFunc,
  ) {}

  update(state: EditorState) {
    const checker = this.isActive || this.cmd;
    if (!checker) {
      return;
    }
    const active = checker(state);
    const { element } = this;
    if (active) {
      element.classList.remove('is-disabled');
    } else {
      element.classList.add('is-disabled');
    }
  }
}
