const mongoose = require('mongoose');
const validator = require('validator');
const { validateErr } = require('../configs/constants');

const articleSchema = new mongoose.Schema(
  {
    keyword: {
      // ключевое слово, по которому статью нашли
      type: String,
      required: true,
    },
    title: {
      // заголовок статьи
      type: String,
      required: true,
    },
    description: {
      // текст статьи
      type: String,
      required: true,
    },
    publishedAt: {
      // дата статьи
      type: String,
      required: true,
    },
    source: {
      // источник статьи
      type: String,
      required: true,
    },
    url: {
      // ссылка на статью
      type: String,
      required: true,
      validate: {
        validator: (url) => validator.isURL(url),
        message: validateErr,
      },
    },
    urlToImage: {
      // ссылка на иллюстрацию к статье
      type: String,
      required: true,
      validate: {
        validator: (urlToImage) => validator.isURL(urlToImage),
        message: validateErr,
      },
    },
    owner: {
      // _id пользователя, сохранившего статью
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
      select: false,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('article', articleSchema);
