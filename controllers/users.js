const bcrypt = require('bcryptjs'); // импортируем bcrypt
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../configs/config');
const ConflictError = require('../errors/conflict-err');
const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const { conflictErr } = require('../configs/constants');

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.send({
        data: {
          email: user.email,
          name: user.name,
        },
      });
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new BadRequestError('Невалидный id пользователя'));
      }
      next(err);
    });
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
    .then((result) => res.status(201).send({
      data: {
        _id: result._id,
        email: result.email,
        name: result.name,
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
        JWT_SECRET,
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
        .send({
          data: {
            _id: user._id,
            email: user.email,
            name: user.name,
          },
        });
    })
    .catch(next);
};
module.exports = {
  getUser,
  createUser,
  login,
};

/*
const bcrypt = require('bcryptjs'); // импортируем bcrypt
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../configs/config');
const ConflictError = require('../errors/conflict-err');
const { conflictErr } = require('../configs/constants');

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
        throw new ConflictError({ message: conflictErr });
      } else next(err);
    })
    .then((user) => res.status(201).send({
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
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '7d',
      });
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .send({ token });
    })
    .catch(next);
};

module.exports = {
  getUser,
  createUser,
  login,
};
*/
