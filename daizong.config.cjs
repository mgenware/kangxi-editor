module.exports = {
  clean: {
    run: {
      del: 'dist',
    },
  },
  prepare: {
    run: ['#clean', 'cpy "./src/editor.css" dist'],
  },
  build: {
    run: ['#prepare', '#lint', 'rollup -c'],
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
    run: ['web-dev-server --open example/ --node-resolve --watch'],
  },
  lint: {
    run: 'eslint --max-warnings 0 --ext .ts src/',
  },
  test: {
    run: '#build',
  },
};
