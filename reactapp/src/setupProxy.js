const { createProxyMiddleware } = require('http-proxy-middleware');

const context = [
    "/api",
    "/taskHub"
];

module.exports = function (app) {
    const appProxy = createProxyMiddleware(context, {
        target: 'https://localhost:7013',
        secure: false,
        ws: true
    });

    app.use(appProxy);
};
