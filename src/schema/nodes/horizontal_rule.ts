import { NodeSpec } from 'prosemirror-model';

const nodeSpec: NodeSpec = {
  group: 'block',
  parseDOM: [{ tag: 'hr' }],
  toDOM() {
    return ['hr'];
  },
};

export default nodeSpec;
