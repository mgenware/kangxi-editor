import { MarkSpec } from 'prosemirror-model';
import link from './link.js';
import em from './em.js';
import strong from './strong.js';
import code from './code.js';
import underline from './underline.js';
import strikethrough from './strikethrough.js';

const marks: { [name: string]: MarkSpec } = {
  link,
  em,
  strong,
  code,
  underline,
  strikethrough,
};
export default marks;
