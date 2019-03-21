import { toggleMark, setBlockType, wrapIn } from 'prosemirror-commands';
import { schema } from '../schema/core';
import toolbarPlugin from './toolbarPlugin';
import { Plugin } from 'prosemirror-state';
import icons from './icons';
import { ToolBarItem } from './toolbarItem';

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
    setBlockType(schema.nodes.heading, { level }),
    textBtn('H' + level, 'H' + level),
  );
}

function separator() {
  const element = document.createElement('span');
  element.className = 'separator';
  return element;
}

export default function setup(element: HTMLElement): Plugin {
  return toolbarPlugin(element, [
    heading(1),
    heading(2),
    heading(3),
    new ToolBarItem(
      setBlockType(schema.nodes.paragraph),
      iconBtn('Normal text', icons.text),
    ),
    separator(),
    new ToolBarItem(
      toggleMark(schema.marks.strong),
      iconBtn('Bold', icons.bold),
    ),
    new ToolBarItem(
      toggleMark(schema.marks.em),
      iconBtn('Italic', icons.italic),
    ),
    new ToolBarItem(
      wrapIn(schema.nodes.blockquote),
      iconBtn('Blockquote', icons.quotes),
    ),
  ]);
}
