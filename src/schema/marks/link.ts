import { MarkSpec } from 'prosemirror-model';

const mark: MarkSpec = {
  attrs: {
    href: {},
    title: { default: null },
  },
  inclusive: false,
  parseDOM: [
    {
      tag: 'a[href]',
      getAttrs(dom): any {
        const element = dom as HTMLElement;
        return {
          href: element.getAttribute('href'),
          title: element.getAttribute('title'),
        };
      },
    },
  ],
  toDOM(node) {
    return ['a', node.attrs, 0];
  },
};

export default mark;
