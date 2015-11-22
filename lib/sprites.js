'use strict';

var game = require('./game');
var _    = require('underscore');
var $    = require('jquery');

game.state.observe('sprites', function(sprites) {
  console.log(sprites);
  $('#sprite-field .sprite-container').each(function() {
    $(this).fadeOut(400, function() {
      $(this).remove();
    });
  });

  _(sprites).each(function(sprite) {
    var markup = $('<div class="sprite-container"><img class="sprite"></div>');
    markup.find('img').attr('src', sprite.image);
    markup.css(sprite.position);
    $('#sprite-field').append(markup);
  });
});
