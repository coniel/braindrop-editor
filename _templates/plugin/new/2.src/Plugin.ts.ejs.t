---
to: packages/<%= package %>/src/<%= name %>Plugin.ts
---
import { BraindropEditorPluginFactory, BraindropEditorPlugin, BraindropEditor } from '@braindrop-editor/core';
<% if(implements.leaves || implements.renderLeaf){ -%>
import renderLeaf<%= name %> from './renderLeaf<%= name %>';
<% } -%>
<% if(implements.elements || implements.renderElement){ -%>
import renderElement<%= name %> from './renderElement<%= name %>';
<% } -%>
<% if(implements.onDOMBeforeInput){ -%>
import onDOMBeforeInput<%= name %> from './onDOMBeforeInput<%= name %>';
<% } -%>
<% if(implements.onKeyDown){ -%>
import onKeyDown<%= name %> from './onKeyDown<%= name %>';
<% } -%>

export interface <%= name %>PluginOptions {
  foo?: string;
}

const <%= name %>Plugin = (options: <%= name %>PluginOptions = {}): BraindropEditorPluginFactory => (
  editor: BraindropEditor,
): BraindropEditorPlugin => ({
<% if(implements.leaves || implements.renderLeaf){ -%>
  renderLeaf: (props): JSX.Element => renderLeaf<%= name %>(props),
<% } -%>
<% if(implements.elements || implements.renderElement){ -%>
  renderElement: (props): JSX.Element | undefined => renderElement<%= name %>(props),
<% } -%>
<% if(implements.onDOMBeforeInput){ -%>
  onDOMBeforeInput: (event): void => onDOMBeforeInput<%= name %>(editor, event),
<% } -%>
<% if(implements.onKeyDown){ -%>
  onKeyDown: (event): void =>
    onKeyDown<%= name %>(editor, (event as unknown) as KeyboardEvent),
<% } -%>
});

export default <%= name %>Plugin;
