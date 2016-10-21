const MessageStore = require('./message_store.js');

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
