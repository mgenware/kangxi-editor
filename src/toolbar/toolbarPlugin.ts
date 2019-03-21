import { Plugin } from 'prosemirror-state';
import { ToolBarUIItem } from './toolbarItem';
import { EditorView } from 'prosemirror-view';
import ToolBarView from './toolbarView';

export default function menuPlugin(
  element: HTMLElement,
  uiItems: ToolBarUIItem[],
) {
  return new Plugin({
    view(editorView: EditorView) {
      const toolbar = new ToolBarView(element, uiItems, editorView);
      return toolbar;
    },
  });
}
