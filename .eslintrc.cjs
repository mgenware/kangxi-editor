module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['mgenware'],
  parserOptions: {
    sourceType: 'module',
    project: './tsconfig.json',
  },
  rules: {
    '@typescript-eslint/unbound-method': 'off',
  },
};
