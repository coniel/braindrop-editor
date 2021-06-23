import {
  SlashPluginFactory,
  SlashPluginElementDescriptor,
  DeserializeElementValue,
} from '@sheets-editor/core';
import { ElementUnorderedList } from './ElementUnorderedList';
import { UnorderedListElement } from './UnorderedListPlugin.types';

export type UnorderedListPluginOptions = Partial<
  Pick<
    SlashPluginElementDescriptor<UnorderedListElement>,
    | 'type'
    | 'shortcuts'
    | 'component'
    | 'hotkeys'
    | 'insert'
    | 'turnInto'
    | 'returnBehaviour'
  >
>;

export const createUnorderedListPlugin = (
  options: UnorderedListPluginOptions = {},
): SlashPluginFactory<UnorderedListElement> => () => ({
  elementDeserializers: {
    LI: (el, children, parent): DeserializeElementValue | void => {
      // All LIs besides those inside OLs are considered UL items
      if (!parent || parent.nodeName !== 'OL') {
        return { type: 'ul' };
      }
    },
    '*': (el, children, parent) => {
      if (parent && parent.nodeName === 'OL') {
        return { type: 'ol' };
      }
    },
    UL: (el, children) => children as DeserializeElementValue[],
  },
  elements: [
    {
      type: 'ul',
      shortcuts: ['- ', '* ', '+ '],
      component: ElementUnorderedList,
      returnBehaviour: 'same-type',
      ...options,
    },
  ],
});
