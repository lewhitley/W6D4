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
