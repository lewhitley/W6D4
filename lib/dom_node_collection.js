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
}

module.exports = DOMNodeCollection;
