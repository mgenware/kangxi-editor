import LS from './ls.js';

export default interface Options {
  // Initial content HTML upon creation.
  contentHTML?: string;
  // Localized strings.
  localizedStrings?: LS;
}
