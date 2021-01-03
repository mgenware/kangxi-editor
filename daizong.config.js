module.exports = {
  clean: {
    run: {
      del: 'dist',
    },
  },
  build: {
    run: ['#clean', '#lint', '#css', 'rollup -c', 'node ./postbuild/postbuild'],
    env: {
      NODE_ENV: 'production',
    },
  },
  dev: {
    run: ['#clean', '#css', 'rollup -c -w'],
    env: {
      NODE_ENV: 'development',
    },
  },
  lint: {
    run: 'eslint --max-warnings 0 --ext .ts src/',
  },
  test: {
    run: '#build',
  },
  css: {
    run:
      'cleancss -o dist/editor.css node_modules/prosemirror-view/style/prosemirror.css src/editor.css',
    before: {
      mkdir: 'dist',
    },
  },
};
