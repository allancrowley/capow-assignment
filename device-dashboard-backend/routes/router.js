const url = require('url');

class Router {
    constructor() {
        this.routes = {
            GET: {},
            POST: {},
            PUT: {},
            DELETE: {},
        };
    }

    register(method, path, handler) {
        if (!this.routes[method]) {
            throw new Error(`Method ${method} not supported`);
        }
        this.routes[method][path] = handler;
    }

    handleRequest(req, res) {
        const parsedUrl = url.parse(req.url, true);
        const method = req.method;
        const route = this.routes[method];

        if (!route) {
            res.writeHead(405, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Method Not Allowed' }));
            return;
        }

        let matchedRoute = null;
        let params = {};

        Object.keys(route).forEach(registeredPath => {
            const pathParts = registeredPath.split('/');
            const urlParts = parsedUrl.pathname.split('/');

            if (pathParts.length === urlParts.length) {
                let isMatch = true;

                for (let i = 0; i < pathParts.length; i++) {
                    if (pathParts[i].startsWith(':')) {
                        const paramName = pathParts[i].slice(1);
                        params[paramName] = urlParts[i];
                    } else if (pathParts[i] !== urlParts[i]) {
                        isMatch = false;
                        break;
                    }
                }

                if (isMatch) {
                    matchedRoute = registeredPath;
                }
            }
        });

        if (matchedRoute) {
            const id = params.id;
            route[matchedRoute](req, res, id);
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Route not found' }));
        }
    }
}

module.exports = Router;