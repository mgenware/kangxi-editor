import { NodeSpec } from 'prosemirror-model';

const nodeSpec: NodeSpec = {
  content: 'inline*',
  group: 'block',
  parseDOM: [{ tag: 'p' }],
  toDOM() {
    return ['p', 0];
  },
};

export default nodeSpec;
