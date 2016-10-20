const DOMNodeCollection = require('./dom_node_collection.js');

let queue = [];

document.addEventListener('DOMContentLoaded', function() {
  queue.forEach( fn => fn() );
});

window.$l = function (selector) {
  if (selector instanceof Function) {
    if (document.readyState === 'complete') {
      selector();
    } else {
      queue.push(selector);
    }
  } else {
    let elements = [];
    if (typeof selector === 'string') {
      elements = Array.from(document.querySelectorAll(selector));
    } else if (selector instanceof HTMLElement) {
      elements = [selector];
    }
    return new DOMNodeCollection(elements);
  }
};
