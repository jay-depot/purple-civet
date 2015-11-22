'use strict';

var StoryNode = require('../story_node');
var $ = require('jquery');
var graph = require('../story_graph');
var game = require('../game');

StoryNode.helpers({
  text: function(text) {
    game.state.set('log', text);
  },

  title: function(text) {
    game.state.set('title', text);
  },

  multi_text: function(params) {
    var steps = params.steps;
    var next = params.next;
    var counter = -1;

    var traverse = function() {
      counter++;
      if (counter >= steps.length) {
        graph.goTo(next);
      }
      else {
        game.state.set('log', steps[counter]);
      }
    };

    var keyHandler = function(e) {
      if (e.keyCode === 32){
        traverse();
      }
    };

    var clickHandler = function() {
      traverse();
    };

    $('body').keydown(keyHandler);
    $('body').click(clickHandler);

    this.teardownHooks.next = function() {
      $('body').unbind('keydown', keyHandler);
      $('body').unbind('click', clickHandler);
    };

    traverse();
  }
});
