const MessageStore = require('./message_store.js');

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
