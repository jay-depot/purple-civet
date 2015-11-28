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
    $('#title').hide();
    game.state.set('title', text);
    $('#title').fadeIn();
    this.teardownHooks.title = function(next) {
      $('#title').fadeOut(next);
    };
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
      if (e.keyCode === 8 || e.keyCode === 37) {
        counter--;
        if (counter < 0) {
          game.state.set('backtrack_blocked', false);
          graph.backtrack();
        }
        else {
          game.state.set('log', steps[counter]);
        }
        return false;
      }
      if (e.keyCode === 32 || e.keyCode === 39){
        traverse();
      }
    };

    var clickHandler = function() {
      traverse();
    };
    game.state.set('backtrack_blocked', true);
    $('body').keydown(keyHandler);
    $('body').click(clickHandler);

    this.teardownHooks.next = function() {
      game.state.set('backtrack_blocked', false);
      $('body').unbind('keydown', keyHandler);
      $('body').unbind('click', clickHandler);
    };
    if (game.state.get('backtracking')) {
      counter = steps.length - 1;
      game.state.set('log', steps[counter]);
    }
    else {
      traverse();
    }
  }
});
