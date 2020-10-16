const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const validator = require('validator');
const AuthorizationError = require('../errors/authorization-err');

const userSchema = new mongoose.Schema(
  {
    email: { // адрес электронной почты пользователя
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: (email) => validator.isEmail(email),
        message: 'Поле "email" должно быть валидным email-адресом',
      },
    },
    password: { // пароль пользователя
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
    name: { // имя пользователя
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
  },
  { versionKey: false },
);

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthorizationError({ message: 'Неправильные почта или пароль' });
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new AuthorizationError({ message: 'Неправильные почта или пароль' });
        }
        return user; // теперь user доступен
      });
    });
};

module.exports = mongoose.model('user', userSchema);
