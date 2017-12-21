class ObjectTree extends Observable {
  constructor(name, parent) {
    super();
    this.name = name || '';
    this.object = null;
    this.open = false;
    this.childrens = [];
    this.parent = parent || null;

    this.status = null; // most negative status from this subtree
  }

  toggle() {
    this.open = !this.open;
    this.notify();
  }

  /**
   * Add recursively an object inside a tree
   * @param {object} object - The object to be inserted, property name must exist
   * @param {array of string} path - Path of the object, must be null at first call
   * @return {string} blabla
   */
  addChildren(object, path) {
    // Fill the path argument through recursive call
    if (!path) {
      if (!object.name) {
        throw new Error('Object name must exist');
      }
      const pathArray = object.name.split('/');
      this.addChildren(object, pathArray);
      this.notify();
      return;
    }

    // Keep status of wrost status of all leaf
    // so the root has the wrost status, easy to monitor
    if (!this.status || object.status === 'inactive') {
      this.status = object.status;
    }

    // Case end of path, associate to 'this' node
    if (path.length === 0) {
      this.object = object;
      return;
    }

    // Case we need to pass to subtree
    const name = path.shift();
    let subtree = this.childrens.find(children => children.name === name);

    // Subtree does not exist yet
    if (!subtree) {
      // Create it and push as children
      // Listen also for changes to bubble it until root
      subtree = new ObjectTree(name, this);
      this.childrens.push(subtree);
      subtree.observe(e => this.notify());
    }

    // Pass to children
    subtree.addChildren(object, path);
  }
}



