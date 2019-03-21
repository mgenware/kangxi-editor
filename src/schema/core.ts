import { Schema } from 'prosemirror-model';
import nodes from './nodes/nodes';
import marks from './marks/marks';

export const schema = new Schema({ nodes, marks });
