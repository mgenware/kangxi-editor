// Modified from https://github.com/prosemirror/prosemirror-example-setup
import {
  setBlockType,
  chainCommands,
  toggleMark,
  exitCode,
  joinUp,
  joinDown,
  lift,
  selectParentNode,
} from 'prosemirror-commands';
import {
  splitListItem,
  liftListItem,
  sinkListItem,
} from 'prosemirror-schema-list';
import { undo, redo } from 'prosemirror-history';
import { undoInputRule } from 'prosemirror-inputrules';
import { Schema } from 'prosemirror-model';

const mac = navigator ? /Mac/.test(navigator.platform) : false;

// :: (Schema, ?Object) → Object
// Inspect the given schema looking for marks and nodes from the
// basic schema, and if found, add key bindings related to them.
// This will add:
//
// * **Mod-b** for toggling [strong](#schema-basic.StrongMark)
// * **Mod-i** for toggling [emphasis](#schema-basic.EmMark)
// * **Mod-`** for toggling [code font](#schema-basic.CodeMark)
// * **Ctrl-Shift-0** for making the current textblock a paragraph
// * **Ctrl-Shift-1** to **Ctrl-Shift-Digit6** for making the current
//   textblock a heading of the corresponding level
// * **Ctrl-Shift-Backslash** to make the current textblock a code block
// * **Ctrl-Shift-8** to wrap the selection in an ordered list
// * **Ctrl-Shift-9** to wrap the selection in a bullet list
// * **Ctrl->** to wrap the selection in a block quote
// * **Enter** to split a non-empty textblock in a list item while at
//   the same time splitting the list item
// * **Mod-Enter** to insert a hard break
// * **Mod-_** to insert a horizontal rule
// * **Backspace** to undo an input rule
// * **Alt-ArrowUp** to `joinUp`
// * **Alt-ArrowDown** to `joinDown`
// * **Mod-BracketLeft** to `lift`
// * **Escape** to `selectParentNode`
//
// You can suppress or map these bindings by passing a `mapKeys`
// argument, which maps key names (say `"Mod-B"` to either `false`, to
// remove the binding, or a new key name string.
export function buildKeymap(schema: Schema, mapKeys: any) {
  const keys: { [key: string]: any } = {};
  function bind(key: string, cmd: any) {
    if (mapKeys) {
      const mapped = mapKeys[key];
      if (mapped === false) {
        return;
      }
      if (mapped) {
        key = mapped;
      }
    }
    keys[key] = cmd;
  }

  bind('Mod-z', undo);
  bind('Mod-y', redo);
  bind('Shift-Mod-z', redo);
  bind('Backspace', undoInputRule);

  bind('Alt-ArrowUp', joinUp);
  bind('Alt-ArrowDown', joinDown);
  bind('Mod-BracketLeft', lift);
  bind('Escape', selectParentNode);

  bind('Mod-b', toggleMark(schema.marks.strong));
  bind('Mod-i', toggleMark(schema.marks.em));
  bind('Mod-i', toggleMark(schema.marks.underline));
  bind('Mod-`', toggleMark(schema.marks.code));

  {
    const br = schema.nodes.hard_break;
    const cmd = chainCommands(exitCode, (state, dispatch) => {
      if (dispatch) {
        dispatch(state.tr.replaceSelectionWith(br.create()).scrollIntoView());
      }
      return true;
    });
    bind('Mod-Enter', cmd);
    bind('Shift-Enter', cmd);
    if (mac) {
      bind('Ctrl-Enter', cmd);
    }
  }

  bind('Enter', splitListItem(schema.nodes.list_item));
  bind('Mod-[', liftListItem(schema.nodes.list_item));
  bind('Mod-]', sinkListItem(schema.nodes.list_item));

  for (let i = 1; i <= 3; i++) {
    bind('Shift-Ctrl-' + i, setBlockType(schema.nodes.heading, { level: i }));
  }

  return keys;
}
