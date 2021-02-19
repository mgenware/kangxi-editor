import Lang from './lang';

export default interface Options {
  // Initial content HTML upon creation.
  contentHTML?: string;
  // Localized strings.
  lang?: Lang;
}
