// Modified from https://github.com/ProseMirror/prosemirror-menu
import { EditorState } from 'prosemirror-state';
import ToolBarItem from './toolbarItem';

function markActive(state: EditorState, type: any): boolean {
  const { from, $from, to, empty } = state.selection;
  if (empty) {
    // eslint-disable-next-line max-len
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-call
    return type.isInSet(state.storedMarks || $from.marks());
  }
  return state.doc.rangeHasMark(from, to, type);
}

export default class ToolbarMarkerItem extends ToolBarItem {
  constructor(element: HTMLElement, cmd: any, public markType: any) {
    super(element, cmd);
  }

  update(state: EditorState) {
    const active = markActive(state, this.markType);
    const { element } = this;
    if (active) {
      element.classList.add('is-active');
    } else {
      element.classList.remove('is-active');
    }
  }
}
