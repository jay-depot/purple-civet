'use strict';

var _ = require('underscore');
var game = require('./game');
var StoryNode = require('./story_node');
var nodes = {};
var graph = {};

var historyPush = function(nodeId) {
  var history = game.state.get('history');
  var current = game.state.get('currentNode');

  history.push({
    node: nodeId,
    registers: game.state.get('registers'),
    skipOnBacktrack: current.skipOnBacktrack
  });
  game.state.set('history', history);
};

graph.backtrack = function() {
  var step, current, history = game.state.get('history');

  if (history.length && !game.state.get('backtrack_blocked')) {
    game.state.set('backtracking', true);
    step = history.pop();
    while (step.skipOnBacktrack && history.length) {
      step = history.pop();
    }

    current = game.state.get('currentNode');

    if (current) {
      current.tearDown();
    }

    game.state.set('currentNodeId', step.node);
    game.state.set('currentNode', new StoryNode(nodes[step.node]));
    game.state.set('history', history);
    game.state.set('registers', step.registers);
    game.state.set('backtracking', false);
  }
};

graph.jumpTo = function(nodeId) {
  graph.goTo(nodeId);
  game.state.set('history', []);
};

graph.insert = function(key, data) {
  nodes[key] = data;
};

graph.goTo = function(nodeId) {
  var current = game.state.get('currentNode');

  if (current) {
    current.tearDown();
    if (game.state.get('currentNodeId')) {
      historyPush(game.state.get('currentNodeId'));
    }
  }

  game.state.set('currentNodeId', nodeId);
  game.state.set('currentNode', new StoryNode(nodes[nodeId]));
};

module.exports = graph;
