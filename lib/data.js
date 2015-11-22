'use strict';

var yaml = require('js-yaml');
var game = require('./game');
var path = require('path');
var fs = require('fs');
var async = require('async');
var storyGraph = require('./story_graph');

module.exports.loadNodes = function(directory, next) {
  async.waterfall([
    function(next) {
      fs.readdir(directory, next);
    },
    function(files, next) {
      game.state.set('loading.total', files.length);
      game.state.set('loading.current', 0);
      //Async loop through file names.
      async.each(files, function(file, next) {
        async.waterfall([
          function(next) {
            fs.readFile(path.join(directory, file), next);
          },
          function(content, next) {
            var count = game.state.get('loading.current');
            var data = yaml.safeLoad(content);

            console.log(data);
            game.state.set('loading.current', count + 1);
            storyGraph.insert(file, data);
            next();
          }
        ], next);
      }, next);
    }
  ], next);
};

game.state.observe('loading.total', function(total) {
  console.log('Found', total, 'game nodes to load...');
});

game.state.observe('loading.current', function(current) {
  console.log('Loading', current, 'of', game.state.get('loading.total'), 'game nodes...');
});
