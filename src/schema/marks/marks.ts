import { MarkSpec } from 'prosemirror-model';
import link from './link';
import em from './em';
import strong from './strong';
import code from './code';
import underline from './underline';
import strikethrough from './strikethrough';

const marks: { [name: string]: MarkSpec } = {
  link,
  em,
  strong,
  code,
  underline,
  strikethrough,
};
export default marks;
