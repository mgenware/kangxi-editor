import { NodeSpec, Node as ProsemirrorNode } from 'prosemirror-model';

const nodeSpec: NodeSpec = {
  inline: true,
  attrs: {
    src: {},
    alt: { default: null },
    title: { default: null },
  },
  group: 'inline',
  draggable: true,
  parseDOM: [
    {
      tag: 'img[src]',
      getAttrs(dom) {
        const element = dom as HTMLElement;
        return {
          src: element.getAttribute('src'),
          title: element.getAttribute('title'),
          alt: element.getAttribute('alt'),
        };
      },
    },
  ],
  toDOM(node: ProsemirrorNode) {
    return ['img', node.attrs];
  },
};

export default nodeSpec;
