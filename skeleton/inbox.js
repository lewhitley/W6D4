const MessageStore = require('./message_store.js');

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
