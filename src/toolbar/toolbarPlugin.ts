import { Plugin } from 'prosemirror-state';
import ToolBarItem from './toolbarItem';
import { EditorView } from 'prosemirror-view';
import ToolBarView from './toolbarView';

export default function menuPlugin(element: HTMLElement, items: ToolBarItem[]) {
  return new Plugin({
    view(editorView: EditorView) {
      const toolbar = new ToolBarView(element, items, editorView);
      return toolbar;
    },
  });
}
