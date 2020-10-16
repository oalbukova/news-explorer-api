const bcrypt = require('bcryptjs'); // импортируем bcrypt
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { NODE_ENV, JWT_SECRET } = require('../config');
const ConflictError = require('../errors/conflict-err');

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send({
      data: {
        email: user.email,
        name: user.name,
      },
    }))
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
        throw new ConflictError({ message: 'Пользователь с таким email уже существует' });
      } else next(err);
    })
    .then((user) => res.status(201)
      .send({
        data: {
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
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        {
          expiresIn: '7d',
        },
      );
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .send({ message: 'Успешная авторизация' });
    })
    .catch(next);
};

module.exports = {
  getUser,
  createUser,
  login,
};
