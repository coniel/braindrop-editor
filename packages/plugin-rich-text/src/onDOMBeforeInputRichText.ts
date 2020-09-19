import { EditorWithRichTextPlugin } from './RichTextPlugin';

function onDOMBeforeInputRichText(
  editor: EditorWithRichTextPlugin,
  event: Event,
): void {
  switch ((event as InputEvent).inputType) {
    case 'formatBold':
      return editor.toggleRichTextFormat('bold');
    case 'formatItalic':
      return editor.toggleRichTextFormat('italic');
    case 'formatUnderline':
      return editor.toggleRichTextFormat('underline');
  }
}

export default onDOMBeforeInputRichText;
