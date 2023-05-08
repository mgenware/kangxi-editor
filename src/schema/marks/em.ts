import { MarkSpec } from 'prosemirror-model';

const mark: MarkSpec = {
  parseDOM: [
    { tag: 'i' },
    { tag: 'em' },
    { style: 'font-style=italic' },
    { style: 'font-style=normal', clearMark: (m) => m.type.name === 'em' },
  ],
  toDOM() {
    return ['em', 0];
  },
};

export default mark;
