import { MarkSpec } from 'prosemirror-model';

const mark: MarkSpec = {
  parseDOM: [
    { tag: 'strong' },
    // This works around a Google Docs misbehavior where
    // pasted content will be inexplicably wrapped in `<b>`
    // tags with a font-weight normal.
    {
      tag: 'b',
      getAttrs(node) {
        const element = node as HTMLElement;
        return element.style.fontWeight !== 'normal' && null;
      },
    },
    { style: 'font-weight=400', clearMark: (m) => m.type.name === 'strong' },
    {
      style: 'font-weight',
      getAttrs: (value) => /^(bold(er)?|[5-9]\d{2,})$/.test(value as string) && null,
    },
  ],
  toDOM() {
    return ['strong', 0];
  },
};

export default mark;
