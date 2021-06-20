import isHotkey from 'is-hotkey';
import { Ancestor, Element, Node } from 'slate';
import { SlashEditor, Transforms } from '@sheets-editor/core';

function onKeyDownSlashCommands(
  editor: SlashEditor,
  event: KeyboardEvent,
): void | true {
  if (isHotkey('/', event)) {
    console.log('///');
    let parent: Ancestor | null = null;
    const hasParent =
      editor.selection && Node.has(editor, editor.selection.focus.path);

    if (hasParent && editor.selection) {
      parent = Node.parent(editor, editor.selection.focus.path);
    }
    if (
      editor.selection &&
      hasParent &&
      Element.isElement(parent) &&
      parent.type !== 'slash-query'
    ) {
      console.log(
        'Node.get(editor, editor.selection.focus.path)',
        Node.get(editor, editor.selection.focus.path),
      );

      event.preventDefault();
      Transforms.insertText(editor, '/​'); // <- NOTE: there is a 0 width space after the /
      Transforms.select(editor, {
        anchor: {
          ...editor.selection.anchor,
          offset: editor.selection.anchor.offset - 2,
        },
        focus: editor.selection.focus,
      });
      Transforms.wrapNodes(
        editor,
        {
          type: 'slash-query',
          children: [],
        },
        { split: true },
      );

      Transforms.collapse(editor, { edge: 'start' });
      Transforms.move(editor, { unit: 'character', distance: 1 });
    }
  } else if (isHotkey('Enter', event)) {
    let parent: Ancestor | null = null;
    const hasParent =
      editor.selection && Node.has(editor, editor.selection.focus.path);

    if (hasParent && editor.selection) {
      parent = Node.parent(editor, editor.selection.focus.path);
    }

    if (
      editor.selection &&
      hasParent &&
      Element.isElement(parent) &&
      parent.type === 'slash-query'
    ) {
      event.preventDefault();
      return true;
      console.log('called slash Enter');
    }
  }
}

export default onKeyDownSlashCommands;
