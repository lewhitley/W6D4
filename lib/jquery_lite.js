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

	window.$l = function (selector) {
	  let elements = [];
	  if (typeof selector === 'string') {
	    elements = Array.from(document.querySelectorAll(selector));
	  } else if (selector instanceof HTMLElement) {
	    elements = [selector];
	  }
	  return new DOMNodeCollection(elements);
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

	  addClass(name) {

	  }
	}

	module.exports = DOMNodeCollection;


/***/ }
/******/ ]);