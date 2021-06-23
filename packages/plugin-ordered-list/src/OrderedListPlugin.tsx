import {
  BraindropEditorPluginFactory,
  BraindropEditorPluginElementDescriptor,
  BraindropEditor,
  DeserializeElementValue,
} from '@braindrop-editor/core';
import { Element, Transforms, Node, Path } from 'slate';
import { ElementOrderedList } from './ElementOrderedList';
import { OrderedListElement } from './OrderedListPlugin.types';

export type OrderedListPluginOptions = Partial<
  Pick<
    BraindropEditorPluginElementDescriptor<OrderedListElement>,
    | 'type'
    | 'shortcuts'
    | 'component'
    | 'hotkeys'
    | 'insert'
    | 'turnInto'
    | 'returnBehaviour'
  >
>;

function normalizeNumberedListNode(
  editor: BraindropEditor,
  node: OrderedListElement,
  path: Path,
  type: string,
): void {
  let number = 1;

  if (path[path.length - 1] !== 0) {
    let previousNodePath = [path[0] - 1];

    if (path.length > 1) {
      previousNodePath = [...path.slice(0, -1), path[path.length - 1] - 1];
    }

    if (Node.has(editor, previousNodePath)) {
      const previousNode = Node.get(editor, previousNodePath);
      if (Element.isElement(previousNode) && previousNode.type === type) {
        number =
          (((previousNode as OrderedListElement).properties.number as number) ||
            1) + 1;
      }
    }
  }

  if (node.properties.number !== number) {
    Transforms.setNodes(editor, { number } as Partial<OrderedListElement>, {
      at: path,
    });
  }
}

function normalizeNumberedList(
  editor: BraindropEditor,
  node: Node,
  path: Path,
  type: string,
): void {
  if (path.length) {
    let nextNodePath = [path[0] + 1];

    if (path.length > 1) {
      nextNodePath = [...path.slice(0, -1), path[path.length - 1] + 1];
    }

    if (Node.has(editor, nextNodePath)) {
      let nextNode: Node | null = Node.get(editor, nextNodePath);
      while (
        nextNode &&
        Element.isElement(nextNode) &&
        nextNode.type === type
      ) {
        normalizeNumberedListNode(
          editor,
          nextNode as OrderedListElement,
          nextNodePath,
          type,
        );
        nextNodePath = [
          ...nextNodePath.slice(0, -1),
          nextNodePath[nextNodePath.length - 1] + 1,
        ];
        if (Node.has(editor, nextNodePath)) {
          nextNode = Node.get(editor, nextNodePath);
        } else {
          nextNode = null;
        }
      }
    }
  }
}

export const createOrderedListPlugin = (
  options: OrderedListPluginOptions = {},
): BraindropEditorPluginFactory<OrderedListElement> => (editor) => {
  const type = options.type || 'ol';
  const { normalizeNode } = editor;
  editor.normalizeNode = (entry): void => {
    const [node, path] = entry;

    if (Element.isElement(node) && node.type === type) {
      normalizeNumberedListNode(editor, node as OrderedListElement, path, type);
    }

    normalizeNumberedList(editor, node, path, type);

    return normalizeNode(entry);
  };
  return {
    elementDeserializers: {
      LI: (el, children, parent) => {
        if (parent && parent.nodeName === 'OL') {
          return { type: 'ol' };
        }
      },
      '*': (el, children, parent) => {
        if (parent && parent.nodeName === 'OL') {
          return { type: 'ol' };
        }
      },
      OL: (el, children) =>
        children.map((child, index) => ({
          ...(child as DeserializeElementValue),
          number: index + 1,
        })),
    },
    elements: [
      {
        type,
        shortcuts: ['1) ', '1. '],
        component: ElementOrderedList,
        returnBehaviour: 'same-type',
        ...options,
      },
    ],
  };
};
