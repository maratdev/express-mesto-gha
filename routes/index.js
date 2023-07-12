const router = require('express').Router();
const auth = require('../middlewares/auth');
const usersRoutes = require('./users-routes');
const cardsRoutes = require('./card-routes');
const NotFoundError = require('../errors/NotFoundError');

router.use('/users', auth, usersRoutes);
router.use('/cards', auth, cardsRoutes);

router.use('/*', auth, (req, res, next) => next(new NotFoundError('Такая страница не существует')));

module.exports = router;
