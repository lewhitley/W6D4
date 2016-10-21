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
