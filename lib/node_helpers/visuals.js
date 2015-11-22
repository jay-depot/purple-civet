'use strict';

var StoryNode = require('../story_node');
var $ = require('jquery');
var game = require('../game');

StoryNode.helpers({
  background: function(path) {
    $('#background').css('background-image', 'url(' + path + ')');
  },

  sprites: function(sprites) {
    game.state.set('sprites', sprites);
    this.teardownHooks.sprites = function() {
      game.state.set('sprites', {});
    };
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
