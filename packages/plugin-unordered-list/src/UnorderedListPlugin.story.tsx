/* eslint-disable no-console */
import React, { useState } from 'react';
import { Descendant } from 'slate';
import { components } from '@braindrop-editor/material-ui';
import { Editor } from '@braindrop-editor/core';
import { createUnorderedListPlugin } from './UnorderedListPlugin';

export default { title: 'Plugins/UnorderedList' };

const UnorderedList = createUnorderedListPlugin();
const CustomUnorderedList = createUnorderedListPlugin({});

export const WithUnorderedListPlugin: React.FC = () => {
  const [value, setValue] = useState<Descendant[]>([
    {
      type: 'ul',
      id: '1',
      children: [{ text: 'List item 1' }],
    },
    {
      type: 'ul',
      id: '1',
      children: [{ text: 'List item 2' }],
    },
    {
      type: 'ul',
      id: '1',
      children: [{ text: 'List item 3' }],
    },
  ]);

  console.log(value);

  return (
    <Editor
      components={components}
      value={value}
      plugins={[UnorderedList]}
      onChange={(newValue): void => {
        setValue(newValue);
      }}
    />
  );
};

export const WithCustomisedUnorderedListPlugin: React.FC = () => {
  const [value, setValue] = useState<Descendant[]>([
    {
      type: 'ul',
      id: '1',
      children: [{ text: 'List item 1' }],
    },
    {
      type: 'ul',
      id: '1',
      children: [{ text: 'List item 2' }],
    },
    {
      type: 'ul',
      id: '1',
      children: [{ text: 'List item 3' }],
    },
  ]);

  return (
    <Editor
      components={components}
      value={value}
      plugins={[CustomUnorderedList]}
      onChange={(newValue): void => {
        setValue(newValue);
      }}
    />
  );
};
