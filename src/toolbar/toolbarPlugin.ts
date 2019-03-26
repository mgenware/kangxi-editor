// Modified from https://github.com/ProseMirror/prosemirror-menu
import { Plugin } from 'prosemirror-state';
import ToolBarItem from './toolbarItem';
import { EditorView } from 'prosemirror-view';
import ToolBarView from './toolbarView';

export default function toolbarPlugin(items: ToolBarItem[]) {
  return new Plugin({
    view(editorView: EditorView) {
      const toolbar = new ToolBarView(items, editorView);
      return toolbar;
    },
  });
}
