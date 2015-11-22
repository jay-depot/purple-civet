'use strict';
var $ = require('jquery');
var ReactiveDictionary = require('./reactive_dictionary');
var gameState = new ReactiveDictionary();

gameState.observe('log', function(log) { $('#log').html(log); });
gameState.observe('title', function(title) { $('#title').html(title); });
gameState.set('log', '');


module.exports.state = gameState;
