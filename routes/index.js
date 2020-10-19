const router = require('express').Router();

const userRouter = require('./users');
const articleRouter = require('./articles');
const { auth } = require('../middlewares/auth');
const checkPassword = require('../middlewares/check-password');
const { createUser, login } = require('../controllers/users');
const { validateUserBody, validateAuthentication } = require('../middlewares/validations');
const NotFoundError = require('../errors/not-found-err');
const { notFoundErrMsg } = require('../configs/constants');

router.post('/signup', validateUserBody, checkPassword, createUser);
router.post('/signin', validateAuthentication, checkPassword, login);
router.use('/users', auth, userRouter);
router.use('/articles', auth, articleRouter);

router.use((req, res, next) => {
  next(new NotFoundError({ message: notFoundErrMsg.page }));
});

module.exports = router;
