import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';

const plugins = [
  resolve({
    browser: true,
  }),
  commonjs(),
  typescript(),
];

export default {
  input: 'src/main.ts',
  output: {
    name: 'kangxi',
    file: 'dist/main.js',
    format: 'es',
    sourcemap: true,
  },
  plugins,
};
