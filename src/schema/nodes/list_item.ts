import { NodeSpec } from 'prosemirror-model';
import { listItem } from 'prosemirror-schema-list';

const nodeSpec: NodeSpec = {
  ...listItem,
  content: 'paragraph block*',
};

export default nodeSpec;
