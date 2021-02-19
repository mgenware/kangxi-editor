module.exports = {
  clean: {
    run: {
      del: 'dist',
    },
  },
  build: {
    run: ['#clean', '#lint', 'rollup -c'],
    env: {
      NODE_ENV: 'production',
    },
  },
  dev: {
    run: ['#clean', 'rollup -c -w'],
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
