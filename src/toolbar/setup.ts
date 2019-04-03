// Modified from https://github.com/ProseMirror/prosemirror-menu
import { toggleMark, setBlockType, wrapIn, lift } from 'prosemirror-commands';
import { undo, redo } from 'prosemirror-history';
import { schema } from '../schema/schema';
import toolbarPlugin from './toolbarPlugin';
import { Plugin } from 'prosemirror-state';
import icons from './icons';
import ToolBarItem from './toolbarItem';
import ToolBarMarkerItem from './toolbarMarkerItem';
import { wrapInList } from 'prosemirror-schema-list';

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
  const img = document.createElement('img');
  img.src = `data:image/svg+xml;base64,${btoa(svg)}`;
  img.width = img.height = IMG_WIDTH;
  return makeBtn(title, img);
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
  return new ToolBarItem(element);
}

export default function setup(lang: { [key: string]: string }): Plugin {
  return toolbarPlugin([
    heading(1),
    heading(2),
    heading(3),
    new ToolBarItem(
      iconBtn('Normal text', icons.text),
      setBlockType(schema.nodes.paragraph),
    ),
    separator(),
    new ToolBarMarkerItem(
      iconBtn(lang.bold, icons.bold),
      toggleMark(schema.marks.strong),
      schema.marks.strong,
    ),
    new ToolBarMarkerItem(
      iconBtn(lang.italic, icons.italic),
      toggleMark(schema.marks.em),
      schema.marks.em,
    ),
    new ToolBarMarkerItem(
      iconBtn(lang.underline, icons.underline),
      toggleMark(schema.marks.underline),
      schema.marks.underline,
    ),
    new ToolBarMarkerItem(
      iconBtn(lang.strikethrough, icons.strikethrough),
      toggleMark(schema.marks.strikethrough),
      schema.marks.strikethrough,
    ),
    separator(),
    new ToolBarItem(
      iconBtn(lang.numberedList, icons.orderedList),
      wrapInList(schema.nodes.ordered_list),
    ),
    new ToolBarItem(
      iconBtn(lang.bulletList, icons.orderedList),
      wrapInList(schema.nodes.bullet_list),
    ),
    new ToolBarItem(
      iconBtn(lang.blockquote, icons.quotes),
      wrapIn(schema.nodes.blockquote),
    ),
    new ToolBarItem(iconBtn(lang.decreaseIndent, icons.indentDecrease), lift),
    new ToolBarItem(
      iconBtn(lang.code, icons.code),
      toggleMark(schema.marks.code),
    ),
    separator(),
    new ToolBarItem(iconBtn(lang.undo, icons.undo), undo),
    new ToolBarItem(iconBtn(lang.redo, icons.redo), redo),
  ]);
}
