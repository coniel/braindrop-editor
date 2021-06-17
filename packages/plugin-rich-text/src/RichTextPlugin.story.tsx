import React, { useState } from 'react';
import RichTextPlugin, { EditorWithRichTextPlugin } from './RichTextPlugin';
import { Editor, Element, MarkedText } from '@sheets-editor/core';
import * as components from '@sheets-editor/material-ui';
import { useSlateStatic } from 'slate-react';

export default { title: 'Plugins/RichText' };

interface ElementWithRichText extends Element {
  children: MarkedText[];
}

const withRichText = RichTextPlugin();
const withPartialRichText = RichTextPlugin({ formats: ['bold'] });
const withCustomRichText = RichTextPlugin({
  hotkeys: {
    bold: false,
    italic: 'mod+Shift+i',
    underline: 'mod+Shift+u',
  },
  marks: {
    bold: 'bold',
    italic: 'italic',
    underline: 'underline',
    'strike-through': 'strike-through',
  },
  components: {
    bold: ({ children }): React.ReactElement => (
      <span style={{ color: 'blue', fontWeight: 700 }}>{children}</span>
    ),
    italic: ({ children }): React.ReactElement => (
      <em style={{ color: 'red' }}>{children}</em>
    ),
    underline: ({ children }): React.ReactElement => (
      <span style={{ borderBottom: '2px dotted black' }}>{children}</span>
    ),
    'strike-through': ({ children }): React.ReactElement => (
      <span style={{ textDecoration: 'line-through', color: 'grey' }}>
        {children}
      </span>
    ),
  },
});

const Toolbar: React.FC = () => {
  const editor = useSlateStatic() as EditorWithRichTextPlugin;

  return (
    <div>
      <button
        type="button"
        style={{ marginRight: 8, fontWeight: 'bold' }}
        onMouseDown={(event): void => {
          event.preventDefault();
          editor.toggleRichTextFormat('bold');
        }}
      >
        B
      </button>
      <button
        type="button"
        style={{ marginRight: 8 }}
        onMouseDown={(event): void => {
          event.preventDefault();
          editor.toggleRichTextFormat('italic');
        }}
      >
        <em>I</em>
      </button>
      <button
        type="button"
        style={{ marginRight: 8 }}
        onMouseDown={(event): void => {
          event.preventDefault();
          editor.toggleRichTextFormat('underline');
        }}
      >
        <u>U</u>
      </button>
      <button
        type="button"
        style={{ marginRight: 8, textDecoration: 'line-through' }}
        onMouseDown={(event): void => {
          event.preventDefault();
          editor.toggleRichTextFormat('strike-through');
        }}
      >
        S
      </button>
    </div>
  );
};

export const Default: React.FC = () => {
  const [value, setValue] = useState<ElementWithRichText[]>([
    {
      type: 'text',
      children: [
        {
          text: 'I have the ',
        },
        {
          b: true,
          text: 'rich',
        },
        {
          text: ' ',
        },
        {
          u: true,
          text: 'text',
        },
        {
          text: ' ',
        },
        {
          b: true,
          u: true,
          i: true,
          text: 'plugin',
        },
        {
          text: '.',
        },
      ],
    },
  ]);

  return (
    <Editor
      components={components}
      value={value}
      plugins={[withRichText]}
      onChange={(newValue): void => {
        setValue(newValue as ElementWithRichText[]);
      }}
    >
      {<Toolbar />}
    </Editor>
  );
};

export const Custom: React.FC = () => {
  const [value, setValue] = useState<ElementWithRichText[]>([
    {
      type: 'text',
      children: [
        {
          text:
            'This editor also uses the rich-text plugin but the hotkeys, marks, and components have been customised:',
        },
      ],
    },
    {
      type: 'text',
      children: [
        {
          bold: true,
          text: 'bold',
        },
        {
          text: ' | mark: "bold" | hotkey: false (hotkey disabled)',
        },
      ],
    },
    {
      type: 'text',
      children: [
        {
          italic: true,
          text: 'italic',
        },
        {
          text: ' | mark: "italic" | hotkey: mod+Shift+i',
        },
      ],
    },
    {
      type: 'text',
      children: [
        {
          underline: true,
          text: 'underline',
        },
        {
          text: ' | mark: "underline" | hotkey: mod+Shift+u',
        },
      ],
    },
    {
      type: 'text',
      children: [
        {
          'strike-through': true,
          text: 'strike-through',
        },
        {
          text: ' | mark: "strike-though" | hotkey: mod+Shift+s',
        },
      ],
    },
  ]);

  return (
    <Editor
      components={components}
      value={value}
      plugins={[withCustomRichText]}
      onChange={(newValue): void => {
        setValue(newValue as ElementWithRichText[]);
      }}
    />
  );
};

export const Partial: React.FC = () => {
  const [value, setValue] = useState<ElementWithRichText[]>([
    {
      type: 'text',
      children: [
        {
          text: 'This editor uses only part of the rich-text plugin.',
        },
      ],
    },
    {
      type: 'text',
      children: [
        {
          text: 'Only ',
        },
        {
          b: true,
          text: 'bold',
        },
        {
          text: ' text support is enabled.',
        },
      ],
    },
    {
      type: 'text',
      children: [
        {
          i: true,
          text:
            'I have the italic mark applied but will not render italic text.',
        },
      ],
    },
  ]);

  return (
    <Editor
      components={components}
      value={value}
      plugins={[withPartialRichText]}
      onChange={(newValue): void => {
        setValue(newValue as ElementWithRichText[]);
      }}
    />
  );
};
