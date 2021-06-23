import {
  BraindropEditorPluginFactory,
  BraindropEditorPlugin,
  BraindropEditor,
  DeserializeElementValue,
  BraindropEditorPluginElementDescriptor,
  ElementComponent,
} from '@braindrop-editor/core';
import { ElementHeadingOne } from './ElementHeadingOne';
import { ElementHeadingTwo } from './ElementHeadingTwo';
import { ElementHeadingThree } from './ElementHeadingThree';
import { HeadingElement } from './HeadingPlugin.types';

const HEADING_1 = 'heading-1';
const HEADING_2 = 'heading-2';
const HEADING_3 = 'heading-3';

export type HeadingType = 'heading-1' | 'heading-2' | 'heading-3';

export type EditorWithHeadingPlugin = BraindropEditor;

export type HeadingHotkeys = {
  [key in HeadingType]: string | false;
};

export type HeadingShortcuts = {
  [key in HeadingType]: string | false;
};

export type HeadingTypes = {
  [key in HeadingType]: string;
};

export type HeadingComponents = {
  [key in HeadingType]: ElementComponent<HeadingElement>;
};

export interface HeadingPluginOptions {
  hotkeys?: Partial<HeadingHotkeys>;
  shortcuts?: Partial<HeadingShortcuts>;
  types?: Partial<HeadingTypes>;
  components?: Partial<HeadingComponents>;
  enabled?: HeadingType[];
}

export const createHeadingPlugin = (
  config: HeadingPluginOptions = {},
): BraindropEditorPluginFactory => {
  const hotkeys = config.hotkeys || {};
  const shortcuts = config.shortcuts || {};
  const types = config.types || {};
  const components = config.components || {};
  const ENABLED = config.enabled || [HEADING_1, HEADING_2, HEADING_3];

  const TYPES: HeadingTypes = {
    [HEADING_1]: types[HEADING_1] || 'h1',
    [HEADING_2]: types[HEADING_2] || 'h2',
    [HEADING_3]: types[HEADING_3] || 'h3',
  };

  const HOTKEYS: HeadingHotkeys = {
    [HEADING_1]: 'mod+alt+1',
    [HEADING_2]: 'mod+alt+2',
    [HEADING_3]: 'mod+alt+3',
    ...hotkeys,
  };

  const SHORTCUTS: HeadingShortcuts = {
    [HEADING_1]: '# ',
    [HEADING_2]: '## ',
    [HEADING_3]: '### ',
    ...shortcuts,
  };

  const COMPONENTS: HeadingComponents = {
    [HEADING_1]: components[HEADING_1] || ElementHeadingOne,
    [HEADING_2]: components[HEADING_2] || ElementHeadingTwo,
    [HEADING_3]: components[HEADING_3] || ElementHeadingThree,
  };

  return (): BraindropEditorPlugin => {
    return {
      elements: ENABLED.map(
        (heading): BraindropEditorPluginElementDescriptor<HeadingElement> => ({
          type: TYPES[heading],
          shortcuts: SHORTCUTS[heading] ? [SHORTCUTS[heading] as string] : [],
          component: COMPONENTS[heading],
          hotkeys: HOTKEYS[heading] ? [HOTKEYS[heading] as string] : undefined,
        }),
      ),
      elementDeserializers: {
        H1: (): DeserializeElementValue => ({ type: TYPES[HEADING_1] }),
        H2: (): DeserializeElementValue => ({ type: TYPES[HEADING_2] }),
        H3: (): DeserializeElementValue => ({ type: TYPES[HEADING_3] }),
        H4: (): DeserializeElementValue => ({ type: TYPES[HEADING_3] }),
        H5: (): DeserializeElementValue => ({ type: TYPES[HEADING_3] }),
        H6: (): DeserializeElementValue => ({ type: TYPES[HEADING_3] }),
      },
    };
  };
};
