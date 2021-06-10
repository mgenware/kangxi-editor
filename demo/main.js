import { Editor } from '../dist/main.js';
import en from './en.js';

function setTheme(name) {
  if (name === 'dark') {
    document.body.classList.add('kx-theme-dark');
  } else if (name === 'light') {
    document.body.classList.remove('kx-theme-dark');
  } else {
    alert(`Unsupported theme "${name}"`);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.editor = new Editor(document.getElementById('editor'), {
    contentHTML: `<h2>kangxi-editor</h2><hr/>
<p>I like <code>printf</code> and <code>scanf</code>.</p>`,
    lang: en,
  });
  window.editor.contentChanged = (editor) => {
    console.log(`Content changed: ${editor.contentHTML}`);
  };
});

document.getElementById('getContentBtn').addEventListener('click', () => {
  if (!window.editor) {
    console.error('Editor not created');
  } else {
    alert(window.editor.contentHTML);
  }
});

document.getElementById('setContentBtn').addEventListener('click', () => {
  if (!window.editor) {
    console.error('Editor not created');
  } else {
    window.editor.contentHTML = `<p>New <b>document</b></p>`;
  }
});

document.getElementById('lightBtn').addEventListener('click', () => {
  setTheme('light');
});

document.getElementById('darkBtn').addEventListener('click', () => {
  setTheme('dark');
});
