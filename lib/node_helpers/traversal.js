'use strict';

var StoryNode = require('../story_node');
var $         = require('jquery');
var graph     = require('../story_graph');
var _         = require('underscore');

StoryNode.helpers({
  next: function(nodeId) {
    var keyHandler = function(e) {
      if (e.keyCode === 32){
        graph.goTo(nodeId);
      }
    };
    var clickHandler = function() {
      graph.goTo(nodeId);
    };

    $('body').keydown(keyHandler);
    $('body').click(clickHandler);

    this.teardownHooks.next = function() {
      $('body').unbind('keydown', keyHandler);
      $('body').unbind('click', clickHandler);
    };
  },

  immediate: function(nodeId) {
    process.nextTick(function() {
      graph.goTo(nodeId);
    });
  },

  timer: function(parameters) {
    var timer = setTimeout(function() {
      graph.goTo(parameters.next);
    }, parameters.after);

    //We're going to want this, just in case a timed node also has a standard next defined.
    this.teardownHooks.timer = function() {
      clearTimeout(timer);
    };
  }
});

StoryNode.helpers({
  menu: function(options) {
    var markup = $('<nav class="scene-menu"><ul></ul></nav>');
    $('body').append(markup);

    _(options).each(function(option) {
      console.log(option);
      var menuItem = $('<li data-next="' + option.next + '"><a href="#">' + option.text + '</a></li>');
      menuItem.
        click(function() {
          var next = $(this).data('next');
          process.nextTick(function() {
            graph.goTo(next);
          });
        });
      markup.find('ul').append(menuItem);
    });


    this.teardownHooks.menu = function() {
      $('nav.scene-menu').remove();
    };
  }
});
