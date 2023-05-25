import convert from 'css-to-lit-js';
import fs from 'fs';

const cssPath = 'node_modules/prosemirror-view/style/prosemirror.css';
const cssContent = await fs.promises.readFile(cssPath, 'utf-8');
const litJsContent = convert(cssContent);
const litJsPath = 'src/prosemirror.css.ts';
await fs.promises.writeFile(litJsPath, litJsContent);
