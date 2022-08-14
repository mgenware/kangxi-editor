import { NodeSpec } from 'prosemirror-model';
import doc from './doc.js';
import paragraph from './paragraph.js';
import blockquote from './blockquote.js';
import horizontalRule from './horizontal_rule.js';
import heading from './heading.js';
import codeBlock from './code_block.js';
import image from './image.js';
import hardBreak from './hard_break.js';
import text from './text.js';

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
