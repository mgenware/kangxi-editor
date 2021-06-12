import { Editor } from '../dist/main.js';
import en from './en.js';

const contentExample = '<h2>Title</h2><hr/><p>New <b>document</b></p>';

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
    console.log(`Content changed: ${editor.contentHTML()}`);
  };
});

document.getElementById('getContentBtn').addEventListener('click', () => {
  if (!window.editor) {
    console.error('Editor not created');
  } else {
    alert(window.editor.contentHTML());
  }
});

function setContent(canUndo) {
  if (!window.editor) {
    console.error('Editor not created');
  } else {
    if (canUndo) {
      window.editor.setContentHTML(contentExample);
    } else {
      window.editor.resetContentHTML(contentExample);
    }
  }
}

document.getElementById('setContentBtn').addEventListener('click', () => {
  setContent(true);
});

document.getElementById('resetContentBtn').addEventListener('click', () => {
  setContent(false);
});

document.getElementById('lightBtn').addEventListener('click', () => {
  setTheme('light');
});

document.getElementById('darkBtn').addEventListener('click', () => {
  setTheme('dark');
});
