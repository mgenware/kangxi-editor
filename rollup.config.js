import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
const langs = require('./postbuild/langs');

const isProd = process.env.NODE_ENV == 'production';

const tsPlugins = [
  resolve({
    browser: true,
  }),
  commonjs(),
  typescript(),
];

if (isProd) {
  tsPlugins.push(terser());
}

const tasks = [
  {
    input: 'src/main.ts',
    output: {
      name: 'kangxi',
      file: 'dist/main.js',
      format: 'umd',
      exports: 'named',
      sourcemap: true,
    },
    plugins: tsPlugins,
  },
];

for (const lang of langs) {
  const task = {
    input: `src/langs/${lang}.json`,
    output: {
      name: `kangxi_lang_${lang}`,
      file: `dist/langs/${lang}.js`,
      format: 'umd',
    },
    plugins: [
      json({
        compact: true,
        namedExports: false,
      }),
    ],
  };
  tasks.push(task);
}

export default tasks;
