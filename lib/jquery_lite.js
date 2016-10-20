/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const DOMNodeCollection = __webpack_require__(1);

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


/***/ },
/* 1 */
/***/ function(module, exports) {

	class DOMNodeCollection {
	  constructor(elements) {
	    this.elements = elements;
	  }

	  html(str) {
	    if( str ) {
	      this.elements.forEach(el => el.innerHTML = str);
	    } else {
	      return this.elements[0].innerHTML;
	    }
	  }

	  empty() {
	    this.elements.forEach(el => el.innerHTML = '');
	  }

	  append(arg) {
	    let html = '';

	    if( arg instanceof DOMNodeCollection ) {
	      arg.elements.forEach(el => html += el.outerHTML);
	    } else if ( arg instanceof HTMLElement ) {
	      html = arg.outerHTML;
	    } else if ( typeof arg === 'string' ) {
	      html = arg;
	    }

	    this.elements.forEach(el => el.innerHTML += html);
	  }

	  attr(name, value) {
	    if (value) {
	      this.elements.forEach( element => {
	        element.setAttribute(name, value);
	      });
	    } else {
	      return this.elements[0].getAttribute(name);
	    }
	  }

	  addClass(value) {
	    this.elements.forEach( el => {
	      let classes = el.getAttribute('class');

	      if( classes ) {
	        classes = classes.split(' ');
	      } else {
	        classes = [];
	      }

	      if( !classes.includes(value) )  {
	        classes.push(value);
	      }

	      classes = classes.join(' ');
	      el.setAttribute('class', classes );
	    });
	  }

	  removeClass(value) {
	    this.elements.forEach( el => {
	      let classes = el.getAttribute('class');

	      if( classes ) {
	        classes = classes.split(' ');
	      } else {
	        classes = [];
	      }

	      if( classes.includes(value) )  {
	        let index = classes.indexOf(value);
	        classes = classes.slice(0, index).concat(classes.slice(index + 1));
	      }

	      classes = classes.join(' ');
	      el.setAttribute('class', classes );
	    });
	  }

	  children() {
	    let kids = [];

	    this.elements.forEach( el => {
	      kids = kids.concat(Array.from(el.children));
	    });

	    return new DOMNodeCollection(kids);
	  }

	  parent() {
	    let parents = [];

	    this.elements.forEach( el => {
	      if ( !parents.includes(el.parentNode)) {
	        parents.push(el.parentNode);
	      }
	    });

	    return new DOMNodeCollection(parents);
	  }

	  find(selector) {
	    let found = [];

	    this.elements.forEach( el => {
	      let descendants = el.querySelectorAll(selector);
	      found = found.concat(Array.from(descendants));
	    });

	    return new DOMNodeCollection(found);
	  }

	  remove() {
	    this.elements.forEach( el => {
	      el.remove();
	    });
	    this.elements = [];
	  }

	  on(event, cb) {
	    this.elements.forEach( el => {
	      el.addEventListener(event, cb);
	    });
	  }

	  off(eventName, cb) {
	    this.elements.forEach( el => {
	      if (!cb) {
	        let events = getEventListeners(el);

	        if (!eventName) {
	          for( event in events) {
	            for (let i = 0; i < events[event].length; i++) {
	              events[event][i].remove();
	            }
	          }
	        } else {
	          for (let i = 0; i < events[eventName].length; i++) {
	            events[eventName][i].remove();
	          }
	        }
	      } else {
	        el.removeEventListener(eventName, cb);
	      }
	    });
	  }
	}

	module.exports = DOMNodeCollection;


/***/ }
/******/ ]);