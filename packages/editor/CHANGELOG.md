# Change Log

This is a list of changes to Slash with each new release. Until 1.0.0 is released, breaking changes will be added as minor or patch version bumps.

### `0.0.1` — May 19, 2020

##### NEW

feat: create basic editor which accepts plugins

## 0.1.0

### `0.0.1` — May 20, 2020

##### BREAKING

- Remodel plugins API to return SlashPlugin object instead of editor
- Render children above editor (inside Slate provider)

## 0.2.0

### `0.0.1` — May 28, 2020

###### NEW

- Add `elements` interface to `SlashPlugin` which allows passing in an array of `SlashPluginElementDescriptor` for quickly defining a plugin's elements.
- Add `leaves` interface to `SlashPlugin` which allows passing in an array of `SlashPluginLeafDescriptor` for quickly defining a plugin's leaves.
