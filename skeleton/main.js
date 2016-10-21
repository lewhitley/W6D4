const Router = require('./router.js');
const Inbox = require('./inbox.js');
const Sent = require('./sent.js');
const Compose = require('./compose.js');

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
