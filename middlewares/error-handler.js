const { serverErr } = require('../configs/constants');

const errorHandler = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send(err.message);
    return;
  }
  res.status(500).send({ message: `${serverErr} ${err.message}` });
  next();
};

module.exports = errorHandler;
