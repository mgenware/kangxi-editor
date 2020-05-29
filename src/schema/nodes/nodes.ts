import { NodeSpec } from 'prosemirror-model';
import doc from './doc';
import paragraph from './paragraph';
import blockquote from './blockquote';
import horizontalRule from './horizontal_rule';
import heading from './heading';
import codeBlock from './code_block';
import image from './image';
import hardBreak from './hard_break';
import text from './text';

const nodes: { [name: string]: NodeSpec } = {
  doc,
  paragraph,
  text,
  blockquote,
  horizontalRule,
  heading,
  codeBlock,
  image,
  hardBreak,
};

export default nodes;
