// Modified from https://github.com/ProseMirror/prosemirror-menu
import { Plugin, PluginKey } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import ToolBarItem from './toolbarItem';
import ToolBarView from './toolbarView';

export default function toolbarPlugin(items: ToolBarItem[]): Plugin {
  return new Plugin({
    view(editorView: EditorView) {
      const toolbar = new ToolBarView(items, editorView);
      return toolbar;
    },
    key: new PluginKey('_toolbar_plugin'),
  });
}
