const mongoose = require('mongoose');
const validator = require('validator');

const articleSchema = new mongoose.Schema(
  {
    keyword: { // ключевое слово, по которому статью нашли
      type: String,
      required: [true, 'Поле "keyword" должно быть заполнено'],
    },
    title: { // заголовок статьи
      type: String,
      required: true,
    },
    text: { // текст статьи
      type: String,
      required: true,
    },
    date: { // дата статьи
      type: String,
      required: true,
    },
    source: { // источник статьи
      type: String,
      required: true,
    },
    link: { // ссылка на статью
      type: String,
      required: true,
      validate: {
        validator: (link) => validator.isURL(link),
        message: 'Поле "link" должно быть валидным url-адресом',
      },
    },
    image: { // ссылка на иллюстрацию к статье
      type: String,
      required: true,
      validate: {
        validator: (link) => validator.isURL(link),
        message: 'Поле "image" должно быть валидным url-адресом',
      },
    },
    owner: { // _id пользователя, сохранившего статью
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
      select: false,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('article', articleSchema);
