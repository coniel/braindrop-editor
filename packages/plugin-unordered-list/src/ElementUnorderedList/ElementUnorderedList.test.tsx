import React from 'react';
import { render } from '@testing-library/react';
import { UIProvider, components } from '@sheets-editor/core';
import ElementUnorderedList, {
  ElementUnorderedListProps,
} from './ElementUnorderedList';

const TYPE = 'foo';
const TEXT = 'Some text';
const ID = 'element-id';

const defaultProps: ElementUnorderedListProps = {
  attributes: {
    'data-slate-node': 'element',
    ref: React.createRef(),
    'data-block-id': ID,
  },
  element: { type: TYPE, children: [{ text: TEXT }], id: ID },
  children: <div>{TEXT}</div>,
};

describe('ElementUnorderedList', () => {
  it('should render successfully', () => {
    const { baseElement, getByText } = render(
      <UIProvider components={components}>
        <ElementUnorderedList {...defaultProps} />,
      </UIProvider>,
    );

    expect(baseElement).toBeTruthy();
    getByText(TEXT);
  });
});
