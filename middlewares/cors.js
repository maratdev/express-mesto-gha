const CORS_OPTIONS = {
  origin: ['https://api.voredev.ru', 'http://api.voredev.ru', 'http://localhost:3000', 'https://maratdev.github.io'],
  credentials: true,
  exposedHeaders: ['set-cookie'],
};

module.exports = {
  CORS_OPTIONS,
};
