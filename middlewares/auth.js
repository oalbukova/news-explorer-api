const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../configs/config');
const AuthorizationError = require('../errors/authorization-err');
const { authErrMsg } = require('../configs/constants');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(
      token, JWT_SECRET, // `${NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'}`,
    );
  } catch (err) {
    throw new AuthorizationError({ massage: authErrMsg.authRequest });
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};

module.exports = { auth };
