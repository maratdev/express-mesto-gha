const CORS_OPTIONS = {
  credentials: true,
  origin: 'http://localhost:3000',
  exposedHeaders: ['set-cookie'],
};

module.exports = {
  CORS_OPTIONS,
};
