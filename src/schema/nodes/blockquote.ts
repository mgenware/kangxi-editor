import { NodeSpec } from 'prosemirror-model';

const nodeSpec: NodeSpec = {
  content: 'block+',
  group: 'block',
  defining: true,
  parseDOM: [{ tag: 'blockquote' }],
  toDOM() {
    return ['blockquote', 0];
  },
};

export default nodeSpec;
