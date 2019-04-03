const mk = require('makhulu');
const langs = require('./langs');
const path = require('path');
const mfs = require('m-fs');

(async () => {
  const def = await mfs.readTextFileAsync(path.join(__dirname, 'lang.d.ts'));
  const list = new mk.DataList(
    langs.map(lang => ({
      lang,
    })),
  );
  await list.map('Writing type definition files...', async d => {
    const dest = path.join(__dirname, `../dist/langs/${d.lang}.d.ts`);
    await mfs.writeFileAsync(dest, def);
  });
})();
