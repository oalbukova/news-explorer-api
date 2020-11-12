const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../configs/config');
const AuthorizationError = require('../errors/authorization-err');
const { authErrMsg } = require('../configs/constants');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization && !authorization.startsWith('Bearer ')) {
    throw new AuthorizationError({ massage: authErrMsg.authRequest });
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new AuthorizationError({ massage: authErrMsg.authRequest });
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  next(); // пропускаем запрос дальше
};

module.exports = { auth };
