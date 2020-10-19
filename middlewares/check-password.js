const BadRequestError = require('../errors/bad-request-err');
const { badReqErrMsg } = require('../configs/constants');

const checkPassword = (req, res, next) => {
  const { password } = req.body;
  if (!password || !password.trim()) {
    next(new BadRequestError({ massage: badReqErrMsg.password }));
  } else {
    next();
  }
};

module.exports = checkPassword;
