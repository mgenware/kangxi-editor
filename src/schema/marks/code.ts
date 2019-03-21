import { MarkSpec } from 'prosemirror-model';

const mark: MarkSpec = {
  parseDOM: [{ tag: 'code' }],
  toDOM() {
    return ['code', 0];
  },
};

export default mark;
