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
      getAttrs(dom) {
        const element = dom as HTMLElement;
        return {
          href: element.getAttribute('href'),
          title: element.getAttribute('title'),
        };
      },
    },
  ],
  toDOM(node) {
    const { href, title } = node.attrs;
    return ['a', { href, title }, 0];
  },
};

export default mark;
