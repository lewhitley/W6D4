const DOMNodeCollection = require('./dom_node_collection.js');

window.$l = function (selector) {
  let elements = [];
  if (typeof selector === 'string') {
    elements = Array.from(document.querySelectorAll(selector));
  } else if (selector instanceof HTMLElement) {
    elements = [selector];
  }
  return new DOMNodeCollection(elements);
};
