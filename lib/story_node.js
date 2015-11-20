'use strict';

var _ = require('underscore');
var game = require('./game');

function StoryNode(data) {
  var self = this;
  _(data).each(function(item, index) {
    self[index] = StoryNode.helpers[index].call(self, item);
  });
}

StoryNode.helpers = function(helpers) {
  _(StoryNode.helpers).extend(helpers);
};

StoryNode.prototype.tearDown = function() {
  var self = this;

  if (this.teardownHooks) {
    _(this.teardownHooks).each(function(hook) {
      hook.call(self);
    });
  }
};

StoryNode.helpers({
  next: function(scene) {

  },

  menu: function(options) {

  },

  background: function(options) {

  },

  sprites: function(sprites) {

  },

  text: function(text) {
    game.state.set('log', text);
  }
});
