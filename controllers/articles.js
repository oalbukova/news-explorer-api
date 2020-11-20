const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');
const { notFoundErrMsg, forbiddenErrMsg, successDel } = require('../configs/constants');

const getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .orFail(new NotFoundError({ message: notFoundErrMsg.article }))
    .populate('user')
    .then((articles) => res.status(200)
      .send({ data: articles }))
    .catch(next);
};

const createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    // вернём записанные в базу данные
    .then((article) => res.status(200)
      .send({ data: article }))
    .catch(next);
};

const findByIdAndRemoveArticle = (req, res, next) => {
  const currentOwner = req.user._id;
  Article.findOne({ _id: req.params.articleId })
    .select('+owner')
    .orFail()
    .catch(() => {
      throw new NotFoundError({ message: notFoundErrMsg.articleId });
    })
    .then((article) => {
      if (String(article.owner) !== currentOwner) {
        throw new ForbiddenError({ message: forbiddenErrMsg });
      }
      return Article.findByIdAndDelete(article._id);
    })
    .then(() => res.send({ message: successDel }))
    .catch(next);
};

module.exports = {
  getArticles,
  createArticle,
  findByIdAndRemoveArticle,
};
