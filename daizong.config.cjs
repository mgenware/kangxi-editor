module.exports = {
  clean: {
    run: {
      del: 'dist',
    },
  },
  prepare: {
    run: [
      '#clean',
      'simple-concat-files "./node_modules/prosemirror-view/style/prosemirror.css" "./src/editor.css" "./dist/editor.css"',
    ],
  },
  build: {
    run: ['#prepare', '#lint', 'rollup -c', '#t'],
    env: {
      NODE_ENV: 'production',
    },
  },
  dev: {
    run: ['#prepare', 'rollup -c -w'],
    env: {
      NODE_ENV: 'development',
    },
  },
  serve: {
    run: ['web-dev-server --open demo/ --node-resolve --watch'],
  },
  lint: {
    run: 'eslint --max-warnings 0 --ext .ts src/',
  },
  test: {
    run: '#build',
  },
  // Runs tests (you need to build the project first).
  t: {
    run: 'web-test-runner tests/**/*.test.js --node-resolve',
  },
  tw: {
    run: 'web-test-runner tests/**/*.test.js --node-resolve --watch',
  },
};
