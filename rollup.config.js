import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import scss from 'rollup-plugin-scss';

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
    scss(),
  ],
};
