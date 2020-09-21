import { Editor } from 'slate';
import { getBlockAbove } from './getBlockAbove';
import { isAncestorEmpty } from './isAncestorEmpty';

/**
 * Is the block above the selection empty.
 */
export const isBlockAboveEmpty = (editor: Editor): boolean => {
  const blockEntry = getBlockAbove(editor);
  const [block] = blockEntry;
  return !editor.isVoid(block) && isAncestorEmpty(editor, block);
};
