'use strict';

var _     = require('underscore');
var async = require('async');

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

StoryNode.prototype.tearDown = function(next) {
  var self = this;
  var asyncHooks = [];
  var syncHooks = [];

  if (this.teardownHooks) {
    _(this.teardownHooks).each(function(hook) {
      if (!hook.length){
        syncHooks.push(hook.bind(self));
      }
      else {
        asyncHooks.push(hook.bind(self));
      }
    });

    async.parallel(asyncHooks, function(){
      _(syncHooks).each(function(hook) { hook(); });1
      next();
    });
  }
  else {
    process.nextTick(next);
  }
};

StoryNode.helpers({
  comment: function() {} //Do nothing. This lets you put comments in your story nodes
});

module.exports = StoryNode;
