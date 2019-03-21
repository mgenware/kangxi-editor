import { MarkSpec } from 'prosemirror-model';

const mark: MarkSpec = {
  parseDOM: [{ tag: 'u' }, { style: 'text-decoration=underline' }],
  toDOM() {
    return ['u', 0];
  },
};

export default mark;
