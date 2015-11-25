var path = require('path');

//Extension API
module.exports.StoryNode          = require('./lib/story_node');
module.exports.ReactiveDictionary = require('./lib/reactive_dictionary');


//Game API
module.exports.state     = require('./lib/game').state;
module.exports.graph     = require('./lib/story_graph');
module.exports.loadNodes = require('./lib/data').loadNodes;
module.exports.savegamne = path.join(path.dirname(module.filename), 'lib', 'frontend', 'savegame.js');

//Event handlers
require('./lib/keyboard_shortcuts');
require('./lib/sprites');
