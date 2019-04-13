const NodeCache = require('node-cache')

// stdTTL: time to live in seconds for every generated cache element.
const cache = new NodeCache({ stdTTL: 5 * 60 })

function getUrlFromRequest(req) {
  const url = req.protocol + '://' + req.headers.host + req.originalUrl;
  return url;
}

function set(req, data) {
  const url = getUrlFromRequest(req);
  cache.set(url, data);
}

function get(req, res, next) {
  const url = getUrlFromRequest(req);
  const content = cache.get(url);
  if (content) {
    return res.status(200).send(content);
  }
  return next();
}

module.exports = { get, set }

