'use strict';
var $ = require('jquery');
var ReactiveDictionary = require('./reactive_dictionary');
var gameState = new ReactiveDictionary();

require('./node_helpers/helpers_all');

gameState.observe('log', function(log) { $('#log').html(log); });
gameState.observe('title', function(title) { $('#title').html(title); });
gameState.set('log', '');
gameState.set('registers', {});
gameState.set('sprites', {});

module.exports.state = gameState;
