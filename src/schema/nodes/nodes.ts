import { NodeSpec } from 'prosemirror-model';
import doc from './doc';
import paragraph from './paragraph';
import blockquote from './blockquote';
import horizontal_rule from './horizontal_rule';
import heading from './heading';
import code_block from './code_block';
import image from './image';
import hard_break from './hard_break';
import text from './text';

const nodes: { [name: string]: NodeSpec } = {
  doc,
  paragraph,
  text,
  blockquote,
  horizontal_rule,
  heading,
  code_block,
  image,
  hard_break,
};

export default nodes;
