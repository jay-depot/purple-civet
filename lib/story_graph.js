'use strict';

var _ = require('underscore');
var game = require('./game');
var StoryNode = require('./story_node');
var nodes = {};
var $ = require('jquery');

StoryNode.helpers({
  next: function(scene) {

  },

  menu: function(options) {

  },

  background: function(path) {
    $('#background').css('background-image', 'url(' + path + ')');
  },

  sprites: function(sprites) {

  },

  text: function(text) {
    game.state.set('log', text);
  },

  title: function(text) {
    game.state.set('title', text);
  }
});

module.exports.insert = function(key, data) {
  nodes[key] = data;
};

module.exports.goTo = function(nodeId) {
  game.state.set('currentNode', new StoryNode(nodes[nodeId]));
};
