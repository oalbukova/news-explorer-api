const { celebrate, Joi, CelebrateError } = require('celebrate');
const validator = require('validator');
const { validateErr } = require('../configs/constants');

const validateUrl = (link) => {
  if (validator.isURL(link)) {
    return link;
  }
  throw new CelebrateError(validateErr);
};

const validateObjId = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().required().alphanum().length(24)
      .hex(),
  }),
});

const validateUserBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина поля "name" - 2',
        'string.max': 'Максимальная длина поля "name" - 30',
        'any.required': 'Поле "name" должно быть заполнено',
        'string.empty': 'Поле "name" не должно быть пустым',
      }),
    email: Joi.string().required().email().messages({
      'string.email': 'Введите валидный email-адрес',
      'any.required': 'Поле "email" должно быть заполнено',
      'string.empty': 'Поле "email" не должно быть пустым',
    }),
    password: Joi.string().required().min(8).messages({
      'string.min': 'Минимальная длина поля "password" - 8',
      'any.required': 'Поле "password" должно быть заполнено',
      'string.empty': 'Поле "password" не должно быть пустым',
    }),
  }),
});

const validateAuthentication = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'string.email': 'Введите валидный email-адрес',
      'any.required': 'Поле "email" должно быть заполнено',
      'string.empty': 'Поле "email" не должно быть пустым',
    }),
    password: Joi.string().required().min(8).messages({
      'string.min': 'Минимальная длина поля "password" - 8',
      'any.required': 'Поле "password" должно быть заполнено',
      'string.empty': 'Поле "password" не должно быть пустым',
    }),
  }),
});

const validateArticle = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().custom(validateUrl).required(),
    image: Joi.string().custom(validateUrl).required(),
  }),
});

module.exports = {
  validateUserBody,
  validateObjId,
  validateArticle,
  validateAuthentication,
};
