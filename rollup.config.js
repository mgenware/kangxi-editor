import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';

export default {
  input: 'src/main.ts',
  output: {
    name: 'kangxi',
    file: 'dist/main.js',
    format: 'umd',
  },
  plugins: [
    resolve({
      module: true,
      browser: true,
    }),
    commonjs(),
    typescript({ cacheRoot: require('unique-temp-dir')() }),
    postcss({
      plugins: [autoprefixer],
      extract: true,
      extensions: ['.css'],
    }),
  ],
};
