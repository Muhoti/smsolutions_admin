const { createProxyMiddleware } = require('http-proxy-middleware');

/**
 * Only proxy API calls — not favicon, HMR, or static assets.
 * Start the API separately: cd ../smsolutions_api && npm run dev
 */
module.exports = function setupProxy(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:3003',
      changeOrigin: true,
    })
  );
};
