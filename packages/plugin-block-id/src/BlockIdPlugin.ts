import { v4 as uuid } from 'uuid';
import { Element as SlateElement, Text } from 'slate';
import {
  BraindropEditorPluginFactory,
  BraindropEditorPlugin,
  Element,
  RenderElementProps as CoreRenderElementProps,
  BraindropEditor,
} from '@braindrop-editor/core';

export interface RenderElementProps extends CoreRenderElementProps {
  attributes: {
    'data-slate-node': 'element';
    'data-block-id': string;
    'data-slate-inline'?: true;
    'data-slate-void'?: true;
    dir?: 'rtl';
    ref: any;
  };
  element: Element;
}

export type RenderElement = (props: RenderElementProps) => JSX.Element;

export interface EditorWithBlockIdPlugin
  extends Omit<BraindropEditor, 'renderElement' | 'children'> {
  renderElement: RenderElement;
  children: Element[];
}

export interface BlockIdPluginOptions {
  idGenerator?: () => string;
  ignoreTypes?: string[];
}

export const createBlockIdPlugin = (
  options: BlockIdPluginOptions = {},
): BraindropEditorPluginFactory => (
  baseEditor: BraindropEditor,
): BraindropEditorPlugin => {
  const editor = (baseEditor as unknown) as EditorWithBlockIdPlugin;
  const generateId = options.idGenerator || uuid;

  const { apply } = editor;

  // Add ID to new nodes
  editor.apply = (operation): void => {
    if (
      operation.type === 'split_node' &&
      (operation.properties as Element).type &&
      !editor.isInline({
        ...operation.properties,
        children: [],
      } as SlateElement)
    ) {
      return apply({
        ...operation,
        properties: {
          ...operation.properties,
          properties: {
            id: generateId(),
          },
        },
      });
    }
    if (
      operation.type === 'insert_node' &&
      !Text.isText(operation.node) &&
      SlateElement.isElement(operation.node) &&
      !editor.isInline(operation.node)
    ) {
      const { node } = operation;
      if (SlateElement.isElement(node)) {
        return apply({
          ...operation,
          node: {
            ...node,
            id: generateId(),
          },
        });
      }
    }

    apply(operation);
  };

  const { renderElement } = editor;

  editor.renderElement = (props: RenderElementProps): JSX.Element => {
    return renderElement({
      ...props,
      attributes: {
        ...props.attributes,
        'data-block-id': props.element.id,
      },
    });
  };

  return {};
};
