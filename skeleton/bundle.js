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

	const Router = __webpack_require__(1);
	const Inbox = __webpack_require__(2);
	const Sent = __webpack_require__(5);
	const Compose = __webpack_require__(6);

	document.addEventListener('DOMContentLoaded', function() {
	  let lis = Array.from(document.querySelectorAll('.sidebar-nav li'));

	  let content = document.querySelector('.content');
	  let router = new Router(content, routes);
	  router.start();

	  lis.forEach( li => {
	    li.addEventListener('click', function(e) {
	      e.preventDefault();

	      let text = li.innerText.toLowerCase();

	      window.location.hash = text;
	    });
	  });
	});

	let routes = {
	  inbox: Inbox,
	  sent: Sent,
	  compose: Compose
	};


/***/ },
/* 1 */
/***/ function(module, exports) {

	class Router {
	  constructor(node, routes) {
	    this.node = node;
	    this.routes = routes;
	  }

	  start() {
	    this.render();
	    window.addEventListener('hashchange', this.render.bind(this));
	  }

	  render() {
	    this.node.innerHTML = "";
	    let component = this.activeRoute();
	    if (component) {
	      this.node.appendChild(component.render());
	    }
	  }

	  activeRoute() {
	    let hash = window.location.hash.slice(1);
	    return this.routes[hash];
	  }
	}

	module.exports = Router;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const MessageStore = __webpack_require__(3);

	let Inbox = {
	  render: function() {
	    let ul = document.createElement('ul');
	    ul.className = "messages";
	    let messages = MessageStore.getInboxMessages();

	    messages.forEach(msg => {
	      ul.appendChild(this.renderMessage(msg));
	    });

	    return ul;
	  },
	  renderMessage(msg) {
	    let li = document.createElement('li');

	    li.className = 'message';
	    li.innerHTML = `<span class="from">${msg.from}</span>
	                    <span class="subject">${msg.subject}</span>
	                    <span class="body">${msg.body}</span>`;

	    return li;
	  }
	};

	module.exports = Inbox;


/***/ },
/* 3 */
/***/ function(module, exports) {

	let messages = {
	  sent: [
	    {to: "friend@mail.com", subject: "Check this out", body: "It's so cool"},
	    {to: "person@mail.com", subject: "zzz", body: "so booring"}
	  ],
	  inbox: [
	    {
	      from: "grandma@mail.com",
	      subject: "Fwd: Fwd: Fwd: Check this out",
	      body: "Stay at home mom discovers cure for leg cramps. Doctors hate her"
	    },
	  {from: "person@mail.com", subject: "Questionnaire", body: "Take this free quiz win $1000 dollars"}
	]
	};

	class Message {
	  constructor(from="", to="", subject="", body="") {
	    this.from = from;
	    this.to = to;
	    this.subject = subject;
	    this.body = body;
	  }
	}

	let messageDraft = new Message();

	let MessageStore = {
	  getInboxMessages: function() {
	    return messages.inbox;
	  },
	  getSentMessages: function() {
	    return messages.sent;
	  },
	  getMessageDraft() {
	    return messageDraft;
	  },
	  updateDraftField(field, value) {
	    messageDraft[field] = value;
	  },
	  sendDraft() {
	    messages.sent.push(messageDraft);
	    messageDraft = new Message ();
	  }
	};


	module.exports = MessageStore;


/***/ },
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const MessageStore = __webpack_require__(3);

	let Sent = {
	  render: function() {
	    let ul = document.createElement('ul');
	    ul.className = "messages";
	    let messages = MessageStore.getSentMessages();

	    messages.forEach(msg => {
	      ul.appendChild(this.renderMessage(msg));
	    });

	    return ul;
	  },
	  renderMessage(msg) {
	    let li = document.createElement('li');

	    li.className = 'message';
	    li.innerHTML = `<span class="to">${msg.to}</span>
	                    <span class="subject">${msg.subject}</span>
	                    <span class="body">${msg.body}</span>`;

	    return li;
	  }
	};

	module.exports = Sent;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	const MessageStore = __webpack_require__(3);

	let Compose = {
	  render: function () {
	    let div = document.createElement('div');
	    div.addEventListener('change', this.handleMessageChange.bind(this));
	    div.addEventListener('submit', this.sendMessage.bind(this));
	    div.className = "new-message";
	    div.innerHTML = this.renderForm();
	    return div;
	  },
	  renderForm: function () {
	    let draft = MessageStore.getMessageDraft();
	    let form = `<p class="new-message-header">New Message</p>
	            <form class="compose-form">
	              <input placeholder="Recipient" name="to" type="text" value="${draft.to}">
	              <input placeholder="Subject" name="subject" type="text" value="${draft.subject}">
	              <textarea name="body" rows=20>${draft.body}</textarea>
	              <button type="submit" class="btn btn-primary submit-message">Send</button>
	            </form>`;
	    return form;
	  },
	  handleMessageChange(e) {
	    e.preventDefault();

	    let changed = e.target;
	    let name = changed.name;
	    let value = changed.value;

	    MessageStore.updateDraftField(name, value);
	  },
	  sendMessage(e) {
	    e.preventDefault();

	    MessageStore.sendDraft();
	    window.location.hash = 'inbox';
	  }
	};

	module.exports = Compose;


/***/ }
/******/ ]);