'use strict';

var graph = require('./story_graph');
var $ = require('jquery');

console.log('keyboard shortcuts loaded');

$('document').ready(function() {
  $('body').keydown(function(e) {
    console.log(e);

    if (e.keyCode === 8 || e.keyCode === 37) {
      graph.backtrack();
    }
  });
});
