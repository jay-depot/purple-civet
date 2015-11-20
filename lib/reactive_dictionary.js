'use strict';

var _ = require('underscore');

function ReactiveDictionary() {
  var store = {};
  var observers = {};

  this.set = function(key, value) {
    var old = store[key];
    store[key] = value;

    if (old !== store[key]) {
      _(observers[key]).each(function(fn) {
        fn(store[key]);
      });
    }
  };

  this.get = function(key) {
    return store[key];
  };

  this.observe = function(key, fn) {
    observers[key] = observers[key] || [];
    observers[key].push(fn);
  };
}

module.exports = ReactiveDictionary;
