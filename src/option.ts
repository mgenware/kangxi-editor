export default interface Option {
  // Initial content HTML upon creation.
  contentHTML?: string;
  // Localized strings.
  lang?: { [key: string]: string };
}
