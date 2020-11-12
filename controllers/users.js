const bcrypt = require('bcryptjs'); // импортируем bcrypt
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../configs/config');
const ConflictError = require('../errors/conflict-err');
const NotFoundError = require('../errors/not-found-err');
const { conflictErr, notFoundErrMsg } = require('../configs/constants');

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError({ message: notFoundErrMsg.user });
      }
      res.send({
        data: {
          email: user.email,
          name: user.name,
        },
      });
    })
    .catch(next);
};
const createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .catch((err) => {
      if (err.name === 'MongoError' || err.code === 11000) {
        throw new ConflictError({ message: conflictErr });
      } else next(err);
    })
    .then((user) => res.status(201).send({
      data: {
        _id: user._id,
        email: user.email,
        name: user.name,
      },
    }))
    .catch(next);
};
const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      // создадим токен
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '7d',
      });
      res.send({ token });
    })
    .catch(next);
};

module.exports = {
  getUser,
  createUser,
  login,
};
