import { NodeSpec } from 'prosemirror-model';
import { bulletList } from 'prosemirror-schema-list';

const nodeSpec: NodeSpec = {
  ...bulletList,
  content: 'list_item+',
  group: 'block',
};

export default nodeSpec;
