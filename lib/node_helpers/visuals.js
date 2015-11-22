'use strict';

var StoryNode = require('../story_node');
var $ = require('jquery');
var graph = require('../story_graph');

StoryNode.helpers({
  background: function(path) {
    $('#background').css('background-image', 'url(' + path + ')');
  },

  sprites: function(sprites) {

  },

  hide_log: function(hide) {
    if (hide) {
      $('#log').fadeOut();
      this.teardownHooks.hide_log = function() {
        $('#log').fadeIn();
      }
    }
    else {
      $('#log').show();
    }
  }
});
