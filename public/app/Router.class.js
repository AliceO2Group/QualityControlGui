/**
 * Router handle pathname history so the view can be in sync with the URL.
 * Handle names arguments, not hashes or query strings
 * Must be instancied only once (singleton)
 */

class Routing {
  constructor() {
    this.routes = {}; // {'/:arg1': {params: ['arg1'], handler: function, regex: /\/([^/]+)/i}, ...}
    this.fallbackPath = null;

    this.history = window.history;
    this.location = window.location;

    window.addEventListener('popstate', this.callRoutePath.bind(this), false);
    if (~['interactive','complete'].indexOf(document.readyState)) this.callRoutePath();
    else window.addEventListener('DOMContentLoaded', this.callRoutePath.bind(this), false);
  }

  fallback(value) {
    if (arguments.length) {
      this.fallbackPath = value;
    }
    return this.fallbackPath;
  }

  // Called by browser events
  callRoutePath() {
    var location = this.location;
    // Decode the URI before injecting to the router, which handle unencoded paths
    try {
      this.go(decodeURI(location.pathname + location.search + location.hash), true);
    } catch(e) {
      if (this.fallbackPath) {
        console.warn(`Unkown path "${location.pathname}", fallback to "${this.fallbackPath}"`);
        return this.go(this.fallbackPath);
      }
      throw e;
    }
  }

  // // Declare a new route and its handler, order matters
  match(path, cb) {
    var route = {params: [], handler: cb};
    var param;
    var regexString = path.replace(/\//g, '\\/');
    var paramMatches = path.match(/:([^/]+)/ig);
    if (paramMatches != null) {
      while (param = paramMatches.shift()) {
        route.params.push(param.slice(1))
        regexString = regexString.replace(param, '([^/]+)')
      }
    }
    regexString = `^${regexString}$`;
    route.regex = new RegExp(regexString, 'i');
    this.routes[path] = route;
  }

  // Change route if matches declared ones and call handler associated
  go(path, preventHistoryUpdates) {
    for (var formalPath in this.routes) {
      var route = this.routes[formalPath];
      var matchList = path.match(route.regex);
      if (!matchList) {
        continue;
      }

      matchList.shift(); // first element is not useful

      // Grab the params found in path into an object sent to it to the handler
      var params = {};
      for (var i = 0; route.params[i]; i++) {
        params[route.params[i]] = matchList.shift();
      }

      if (!preventHistoryUpdates) {
        this.history.pushState({}, '', path)
      }

      // Call the handler with the params of the new path
      return route.handler(params)
    }

    throw new Error(`The path "${path}" is not declared`);
  }
}
