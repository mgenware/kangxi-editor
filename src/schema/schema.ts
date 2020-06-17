import { Schema } from 'prosemirror-model';
import { addListNodes } from 'prosemirror-schema-list';
import nodes from './nodes/nodes';
import marks from './marks/marks';

const schema0 = new Schema({
  nodes,
  marks,
});

export const schema = new Schema({
  nodes: addListNodes(schema0.spec.nodes as any, 'paragraph block*', 'block'),
  marks: schema0.spec.marks,
});
