import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import { terser } from "rollup-plugin-terser";

const isProd = process.env.NODE_ENV == 'production';

const plugins = [
  resolve({
    module: true,
    browser: true,
  }),
  commonjs(),
  typescript({ cacheRoot: require('unique-temp-dir')() }),
  postcss({
    plugins: [autoprefixer],
    extract: './dist/editor.css',
    extensions: ['.css'],
  }),
];

if (isProd) {
  plugins.push(terser())
}

export default {
  input: 'src/main.ts',
  output: {
    name: 'kangxi',
    file: 'dist/main.js',
    format: 'umd',
  },
  plugins,
};
