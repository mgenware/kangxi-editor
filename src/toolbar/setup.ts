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

export default function setup(element: HTMLElement): Plugin {
  return toolbarPlugin(element, [
    heading(1),
    heading(2),
    heading(3),
    new ToolBarItem(
      iconBtn('Normal text', icons.text),
      setBlockType(schema.nodes.paragraph),
    ),
    separator(),
    new ToolBarMarkerItem(
      iconBtn('Bold', icons.bold),
      toggleMark(schema.marks.strong),
      schema.marks.strong,
    ),
    new ToolBarMarkerItem(
      iconBtn('Italic', icons.italic),
      toggleMark(schema.marks.em),
      schema.marks.em,
    ),
    new ToolBarMarkerItem(
      iconBtn('Underline', icons.underline),
      toggleMark(schema.marks.underline),
      schema.marks.underline,
    ),
    new ToolBarMarkerItem(
      iconBtn('Strikethrough', icons.strikethrough),
      toggleMark(schema.marks.strikethrough),
      schema.marks.strikethrough,
    ),
    separator(),
    new ToolBarItem(
      iconBtn('Numbered list', icons.orderedList),
      wrapInList(schema.nodes.ordered_list),
    ),
    new ToolBarItem(
      iconBtn('Bullet list', icons.orderedList),
      wrapInList(schema.nodes.bullet_list),
    ),
    new ToolBarItem(
      iconBtn('Blockquote', icons.quotes),
      wrapIn(schema.nodes.blockquote),
    ),
    new ToolBarItem(iconBtn('Decrease indent', icons.indentDecrease), lift),
    new ToolBarItem(iconBtn('Code', icons.code), toggleMark(schema.marks.code)),
    separator(),
    new ToolBarItem(iconBtn('Undo', icons.undo), undo),
    new ToolBarItem(iconBtn('Redo', icons.redo), redo),
  ]);
}
