'use strict';

/**
 * low-level savegame manipulation helpers
 */

var savegame = {};

var gameDB = window.indexedDB.open('savegames', 1);

gameDB.onsuccess = function(event) {
  savegame.store = event.target.result;
  console.log('Opened savegame DB');
  console.log(savegame.store);
}
gameDB.onupgradeneeded = function(event) {
  savegame.store = event.target.result;
  savegame.store.createObjectStore('savegames');
}

gameDB.onerror = function(event) {
  console.log('Failed to open savegame db');
  console.dir(event);
}

savegame.save =  function(slot, state, name, next) {
  var request, transaction, err;
  transaction = savegame.store.transaction(['savegames'], 'readwrite');
  transaction.onerror = function(event) { next([event, err]) };
  transaction.onabort = function(event) { next([event, err]) };
  transaction.oncomplete = function(event) { next() };

  request = transaction.
    objectStore('savegames').
    add({
      slot: slot,
      name: name,
      state: state
    }, slot
  );

  request.onerror = function(event) { err = event };
};

savegame.load = function(slot, next) {
  savegame.store.
    transaction('savegames').
    objectStore('savegames').
    get(Number(slot)).
    onsuccess = function(event) {
      console.log(event);
      next(undefined, event.target.result);
    };

};

savegame.remove = function(slot, next) {
  savegame.store.transaction(['savegames'], 'readwrite')
    .objectStore('savegames')
    .delete(slot)
    .onsuccess = function(event) {
      next()
    };
}

savegame.list = function(next) {
  var games = [];
  savegame.store.transaction('savegames').
    objectStore('savegames').
    openCursor().onsuccess = function(event) {
    var cursor = event.target.result;
    if (cursor) {
      games.push(cursor.value);
      cursor.continue();
    }
    else {
      next(games);
    }
  }
}

global.savegame = savegame;
