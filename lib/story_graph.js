'use strict';

var _ = require('underscore');
var game = require('./game');
var StoryNode = require('./story_node');
var nodes = {};
var graph = {};

graph.insert = function(key, data) {
  nodes[key] = data;
};

graph.goTo = function(nodeId) {
  var current = game.state.get('currentNode');

  if (current) {
    current.tearDown();
  }

  game.state.set('currentNode', new StoryNode(nodes[nodeId]));
};

module.exports = graph;
