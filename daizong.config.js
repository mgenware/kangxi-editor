module.exports = {
  clean: {
    run: {
      del: 'dist',
    },
  },
  build: {
    run: ['#clean', '#lint', 'rollup -c', 'node ./postbuild/postbuild'],
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
  lint: {
    run: 'eslint --max-warnings 0 --ext .ts src/',
  },
  test: {
    run: '#build',
  },
};
