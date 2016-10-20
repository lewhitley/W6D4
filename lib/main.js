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

window.$l.extend = function(...objects) {
  let mainObject = objects[0];

  objects.slice(1).forEach(obj => {
    for(key in obj) {
      mainObject[key] = obj[key];
    }
  });

  return mainObject;
};

window.$l.ajax = function(options) {
  let defaultOptions = {
    type: 'GET',
    dataType: 'json',
    data: {},
    success: function() {},
    error: function() {}
  };

  options = this.extend(defaultOptions, options);

  let xhr = new XMLHttpRequest();
  xhr.open(options.type, options.url);

  xhr.onload = () => {
    let statusCode = xhr.status - (xhr.status % 100);
    switch (statusCode) {
      case 200:
        let response = xhr.response;
        if (options.dataType === 'json') {
          response = JSON.parse(response);
        }
        options.success(response);
        break;
      default:
        options.error(xhr,xhr.status);
    }
  };

  xhr.send(options.data);
};
