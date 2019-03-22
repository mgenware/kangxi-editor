import { NodeSpec } from 'prosemirror-model';
import { orderedList } from 'prosemirror-schema-list';

const nodeSpec: NodeSpec = {
  ...orderedList,
  content: 'list_item+',
  group: 'block',
};

export default nodeSpec;
