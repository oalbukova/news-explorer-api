const router = require('express').Router();

const userRouter = require('./users');
const articleRouter = require('./articles');
const { auth } = require('../middlewares/auth');
const checkPassword = require('../middlewares/check-password');
const { createUser, login } = require('../controllers/users');
const { validateUserBody, validateAuthentication } = require('../middlewares/validations');

router.post('/signup', validateUserBody, checkPassword, createUser);
router.post('/signin', validateAuthentication, checkPassword, login);
router.use('/users', auth, userRouter);
router.use('/articles', auth, articleRouter);

router.use((req, res) => {
  res.status(404).send({ message: 'Страница по указанному маршруту не найдена' });
});

module.exports = router;
