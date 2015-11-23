# purple-civet
Javascript framework for visual novel desktop apps, built on [NW.js](https://github.com/nwjs/nw.js).

Generally, you'd use this to build a cross-platform desktop app.

See https://github.com/jay-depot/purple-civet-example for an example of how to use it.

TL;DR version: Your story node data should be in YAML or JSON format, and your sprites and
backgrounds can be in any format Chromium will handle (png, gif, jpeg, and even webp
if you're feeling adventurous).

Each property name in a node definition corresponds to one of the functions defined on
StoryNode.helpers, and you can define your own StoryNode helpers if the engine doesn't
quite provide what you're looking for.

All that said, your best bet is to download the example project given above, and modify
that to your needs.

Contributions, no matter how small, are ALWAYS welcome ;-)

## What works so far:
 - Basic node traversal
 - Menus
 - Background images
 - Basic sprite display
 - Text log updates
 - Title card nodes
 - History and backtracking

## Roadmap:
 - Savegame support
 - Character definitions, including mood-indexed sprites
 - Dialog nodes
 - State registers, and the ability to trigger node traversals based on their values
 - Background music
