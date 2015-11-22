'use strict';

var _ = require('underscore');

function StoryNode(data) {
  var self = this;
  this.teardownHooks = {};

  for(var index in data) {
    if (StoryNode.helpers[index]) {
      this[index] = StoryNode.helpers[index].call(self, data[index]);
    }
    else {
      throw new Error ('StoryNode exception: ' + index + ' is not a valid helper function.');
    }
  }
  /*
  _(data).each(function(item, index) {
    self[index] = StoryNode.helpers[index].call(self, item);
  });
  */
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
  comment: function() {} //Do nothing. This lets you put comments in your story nodes
});

module.exports = StoryNode;
