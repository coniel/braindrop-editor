import React, { useState } from 'react';
import { Node } from 'slate';
import { Editor } from '@sheets-editor/core';
import { LoremIpsum } from 'lorem-ipsum';
import { v4 } from 'uuid';
import * as components from '@sheets-editor/material-ui';
import createBlockIdPlugin from '@sheets-editor/plugin-block-id';
import createParagraphPlugin from '@sheets-editor/plugin-paragraph';
import BlockPlugin from './BlockPlugin';

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

function generateBlocks(count: number): Node[] {
  let remainingCount = count;
  const blocks: Node[] = [];

  while (remainingCount > 0) {
    blocks.push({
      type: 'paragraph',
      id: v4(),
      children: [
        {
          text: `_${count - remainingCount}_ ${lorem.generateSentences(3)}`,
        },
      ],
    });
    remainingCount -= 1;
  }

  return blocks;
}

export default { title: 'Plugins|Block' };

const BlockIdPlugin = createBlockIdPlugin();
const ParagraphPlugin = createParagraphPlugin();
const Block = BlockPlugin();

export const WithBlockPlugin: React.FC = () => {
  const [value, setValue] = useState<Node[]>([
    {
      type: 'paragraph',
      id: v4(),
      children: generateBlocks(5),
    },
    {
      type: 'paragraph',
      id: v4(),
      children: generateBlocks(3),
    },
    {
      type: 'paragraph',
      id: v4(),
      children: generateBlocks(2),
    },
  ]);
  console.log(value);

  return (
    <Editor
      components={components}
      value={value}
      plugins={[BlockIdPlugin, ParagraphPlugin, Block]}
      onChange={(newValue): void => {
        setValue(newValue);
      }}
    />
  );
};
