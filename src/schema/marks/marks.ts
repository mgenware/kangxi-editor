import { MarkSpec } from 'prosemirror-model';
import link from './link';
import em from './em';
import strong from './strong';
import code from './code';

const marks: { [name: string]: MarkSpec } = {
  link,
  em,
  strong,
  code,
};
export default marks;
