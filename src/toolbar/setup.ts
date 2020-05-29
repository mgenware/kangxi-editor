// Modified from https://github.com/ProseMirror/prosemirror-menu
import { toggleMark, setBlockType, wrapIn, lift } from 'prosemirror-commands';
import { undo, redo } from 'prosemirror-history';
import { Plugin, EditorState } from 'prosemirror-state';
import { wrapInList } from 'prosemirror-schema-list';
import { NodeType } from 'prosemirror-model';
import { schema } from '../schema/schema';
import toolbarPlugin from './toolbarPlugin';
import icons from './icons';
import ToolBarItem from './toolbarItem';
import ToolBarMarkerItem from './toolbarMarkerItem';

const IMG_WIDTH = 18;

function makeBtn(title: string, content: HTMLElement) {
  const btn = document.createElement('button');
  btn.title = title;
  btn.appendChild(content);
  return btn;
}

function textBtn(title: string, text: string) {
  const span = document.createElement('span');
  span.textContent = text;
  return makeBtn(title, span);
}

function iconBtn(title: string, svg: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svg, 'image/svg+xml');
  const element = doc.documentElement;
  element.setAttribute('width', IMG_WIDTH.toString());
  element.setAttribute('height', IMG_WIDTH.toString());
  return makeBtn(title, element);
}

function canInsert(state: EditorState, nodeType: NodeType) {
  const from = state.selection.$from;
  for (let d = from.depth; d >= 0; d--) {
    const index = from.index(d);
    if (from.node(d).canReplaceWith(index, index, nodeType)) {
      return true;
    }
  }
  return false;
}

// Create an icon for a heading at the given level
function heading(level: number) {
  return new ToolBarItem(
    textBtn('H' + level, 'H' + level),
    setBlockType(schema.nodes.heading, { level }),
  );
}

function separator() {
  const element = document.createElement('span');
  element.className = 'separator';
  return new ToolBarItem(element, null);
}

export default function setup(lang: { [key: string]: string }): Plugin {
  const { nodes, marks } = schema;
  return toolbarPlugin([
    heading(1),
    heading(2),
    heading(3),
    new ToolBarItem(
      iconBtn('Normal text', icons.text),
      setBlockType(nodes.paragraph),
    ),
    separator(),
    new ToolBarMarkerItem(
      iconBtn(lang.bold, icons.bold),
      toggleMark(marks.strong),
      marks.strong,
    ),
    new ToolBarMarkerItem(
      iconBtn(lang.italic, icons.italic),
      toggleMark(marks.em),
      marks.em,
    ),
    new ToolBarMarkerItem(
      iconBtn(lang.underline, icons.underline),
      toggleMark(marks.underline),
      marks.underline,
    ),
    new ToolBarMarkerItem(
      iconBtn(lang.strikethrough, icons.strikethrough),
      toggleMark(marks.strikethrough),
      marks.strikethrough,
    ),
    separator(),
    new ToolBarItem(
      iconBtn(lang.numberedList, icons.orderedList),
      wrapInList(nodes.ordered_list),
    ),
    new ToolBarItem(
      iconBtn(lang.bulletList, icons.orderedList),
      wrapInList(nodes.bullet_list),
    ),
    new ToolBarItem(
      iconBtn(lang.blockquote, icons.quotes),
      wrapIn(nodes.blockquote),
    ),
    new ToolBarItem(iconBtn(lang.decreaseIndent, icons.indentDecrease), lift),
    new ToolBarItem(
      iconBtn(lang.horizontalRule, icons.horizontalLine),
      (state, dispatch) => {
        if (!dispatch) {
          throw new Error('Unexpected null `dispatch` argument');
        }
        dispatch(state.tr.replaceSelectionWith(nodes.horizontal_rule.create()));
        return true;
      },
      (state) => canInsert(state, nodes.horizontal_rule),
    ),
    new ToolBarItem(iconBtn(lang.code, icons.code), toggleMark(marks.code)),
    separator(),
    new ToolBarItem(iconBtn(lang.undo, icons.undo), undo),
    new ToolBarItem(iconBtn(lang.redo, icons.redo), redo),
  ]);
}
