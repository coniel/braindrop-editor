import React from 'react';
import { Node } from 'slate';
import { RenderElementProps } from '@sheets-editor/core';

export type ElementHeadingTwoProps = RenderElementProps;

const ElementHeadingTwo: React.FC<ElementHeadingTwoProps> = ({
  attributes,
  children,
  element,
}) => {
  const texts = Array.from(Node.texts(element));
  const hasContent = texts.length > 1 || texts[0][0].text.length > 0;

  return (
    <h2
      style={{
        maxWidth: '100%',
        width: '100%',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        caretColor: 'inherit',
        color: 'inherit',
        fontWeight: 600,
        fontSize: '1.5em',
        lineHeight: '1.3',
        marginTop: '0.7em',
        marginBottom: 4,
      }}
      {...attributes}
    >
      {!hasContent && (
        <span
          contentEditable={false}
          style={{
            pointerEvents: 'none',
            display: 'inline-block',
            width: 0,
            maxWidth: '100%',
            whiteSpace: 'nowrap',
            opacity: 0.25,
          }}
        >
          Heading 2
        </span>
      )}
      {children}
    </h2>
  );
};

export default ElementHeadingTwo;
