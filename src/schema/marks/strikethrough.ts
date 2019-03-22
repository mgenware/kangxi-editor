import { MarkSpec } from 'prosemirror-model';

const mark: MarkSpec = {
  parseDOM: [
    { tag: 'del' },
    { tag: 'strike' },
    { tag: 's' },
    { style: 'text-decoration=line-through' },
  ],
  toDOM() {
    return ['del', 0];
  },
};

export default mark;
