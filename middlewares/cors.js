const allowedCors = [
  'localhost:3000',
  'https://localhost:3000',
  'http://localhost:3000',
  'http://api.nomoredomains.xyz',
  'https://api.nomoredomains.xyz',
  'http://www.api.nomoredomains.xyz',
  'https://www.api.nomoredomains.xyz',

  'http://voredev.nomoredomains.xyz',
  'https://voredev.nomoredomains.xyz',
  'http://www.voredev.nomoredomains.xyz',
  'https://www.voredev.nomoredomains.xyz',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE,PUT';

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  res.header('Access-Control-Allow-Credentials', true);
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  return next();
};
