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
  params: Joi.object()
    .keys({
      articleId: Joi.string()
        .required()
        .alphanum()
        .length(24)
        .hex(),
    }),
});

const validateUserBody = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string()
        .required()
        .min(2)
        .max(30)
        .messages({
          'string.min': 'Минимальная длина поля "name" - 2',
          'string.max': 'Максимальная длина поля "name" - 30',
          'any.required': 'Поле "name" должно быть заполнено',
          'string.empty': 'Поле "name" не должно быть пустым',
        }),
      email: Joi.string()
        .required()
        .email()
        .messages({
          'string.email': 'Введите валидный email-адрес',
          'any.required': 'Поле "email" должно быть заполнено',
          'string.empty': 'Поле "email" не должно быть пустым',
        }),
      password: Joi.string()
        .required()
        .min(8)
        .messages({
          'string.min': 'Минимальная длина поля "password" - 8',
          'any.required': 'Поле "password" должно быть заполнено',
          'string.empty': 'Поле "password" не должно быть пустым',
        }),
    }),
});

const validateArticle = celebrate({
  body: Joi.object()
    .keys({
      keyword: Joi.string()
        .required()
        .messages({
          'any.required': 'Поле "keyword" должно быть заполнено',
          'string.empty': 'Поле "keyword" не должно быть пустым',
        }),
      title: Joi.string()
        .required()
        .messages({
          'any.required': 'Поле "title" должно быть заполнено',
          'string.empty': 'Поле "title" не должно быть пустым',
        }),
      text: Joi.string()
        .required()
        .messages({
          'any.required': 'Поле "text" должно быть заполнено',
          'string.empty': 'Поле "text" не должно быть пустым',
        }),
      date: Joi.string()
        .required()
        .messages({
          'any.required': 'Поле "date" должно быть заполнено',
          'string.empty': 'Поле "date" не должно быть пустым',
        }),
      source: Joi.string()
        .required()
        .messages({
          'any.required': 'Поле "source" должно быть заполнено',
          'string.empty': 'Поле "source" не должно быть пустым',
        }),
      link: Joi.string()
        .custom(validateUrl)
        .required()
        .messages({
          'any.required': 'Поле "link" должно быть заполнено',
          'string.empty': 'Поле "link" не должно быть пустым',
        }),
      image: Joi.string()
        .custom(validateUrl)
        .required()
        .messages({
          'any.required': 'Поле "image" должно быть заполнено',
          'string.empty': 'Поле "image" не должно быть пустым',
        }),
    }),
});

const validateAuthentication = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string()
        .required()
        .email()
        .messages({
          'string.email': 'Введите валидный email-адрес',
          'any.required': 'Поле "email" должно быть заполнено',
          'string.empty': 'Поле "email" не должно быть пустым',
        }),
      password: Joi.string()
        .required()
        .min(8)
        .messages({
          'string.min': 'Минимальная длина поля "password" - 8',
          'any.required': 'Поле "password" должно быть заполнено',
          'string.empty': 'Поле "password" не должно быть пустым',
        }),
    }),
});

module.exports = {
  validateUserBody,
  validateObjId,
  validateArticle,
  validateAuthentication,
};
