import { toggleMark, setBlockType, wrapIn } from 'prosemirror-commands';
import { schema } from 'prosemirror-schema-basic';
import toolbarPlugin from './toolbarPlugin';
import { Plugin } from 'prosemirror-state';
import icons from './icons';

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
  return {
    cmd: setBlockType(schema.nodes.heading, { level }),
    element: textBtn('H' + level, 'H' + level),
  };
}

export default function setup(element: HTMLElement): Plugin {
  return toolbarPlugin(element, [
    {
      cmd: toggleMark(schema.marks.strong),
      element: iconBtn('Bold', icons.bold),
    },
    {
      cmd: toggleMark(schema.marks.em),
      element: iconBtn('Italic', icons.italic),
    },
    {
      cmd: setBlockType(schema.nodes.paragraph),
      element: iconBtn('Paragraph', icons.paragraph),
    },
    heading(1),
    heading(2),
    heading(3),
    {
      cmd: wrapIn(schema.nodes.blockquote),
      element: iconBtn('Blockquote', icons.quotes),
    },
  ]);
}
