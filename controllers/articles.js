/* const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');
const {
  notFoundErrMsg,
  forbiddenErrMsg,
  successDel,
} = require('../configs/constants');

const getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .orFail(new NotFoundError({ message: notFoundErrMsg.article }))
    .populate('user')
    .then((articles) => res.status(201).send({ data: articles }))
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
    .then((article) => res.status(201).send({ data: article }))
    .catch(next);
};

const findByIdAndRemoveArticle = (req, res, next) => {
  Article.findById(req.params.articleId)
    .orFail()
    .catch(() => {
      throw new NotFoundError({ message: notFoundErrMsg.articleId });
    })
    .then((article) => {
      if (article.owner.toString() !== req.user._id) {
        throw new ForbiddenError({ message: forbiddenErrMsg });
      }
      Article.deleteOne(article)
        .then(() => res.send({ message: successDel }))
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  getArticles,
  createArticle,
  findByIdAndRemoveArticle,
};
*/

const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');
const {
  notFoundErrMsg,
  forbiddenErrMsg,
} = require('../configs/constants');

const getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .populate('user')
    .then((articles) => res.send({ data: articles }))
    .catch(next);
};

const createArticle = (req, res, next) => {
  const {
    keyword,
    title,
    description,
    publishedAt,
    source,
    url,
    urlToImage,
  } = req.body;
  Article.create({
    keyword,
    title,
    description,
    publishedAt,
    source,
    url,
    urlToImage,
    owner: req.user._id,
  })
    // вернём записанные в базу данные
    .then((article) => res.status(201).send({
      data: {
        keyword: article.keyword,
        title: article.title,
        description: article.description,
        publishedAt: article.publishedAt,
        source: article.source,
        url: article.url,
        urlToImage: article.urlToImage,
      },
    }))
    .catch(next);
};

const findByIdAndRemoveArticle = (req, res, next) => {
  const owner = req.user._id;
  const id = req.params._id;
  Article.findById(id, {
    keyword: 1,
    title: 1,
    description: 1,
    publishedAt: 1,
    source: 1,
    url: 1,
    urlToImage: 1,
    owner: 1,
  })
    .orFail()
    .catch(() => {
      throw new NotFoundError({ message: notFoundErrMsg.articleId });
    })
    .then((article) => {
      if (article.owner.toString() !== owner) {
        throw new ForbiddenError({ message: forbiddenErrMsg });
      }
      Article.findByIdAndDelete(id)
        .then((deletedArticle) => {
          res.send({ data: deletedArticle });
        })
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  getArticles,
  createArticle,
  findByIdAndRemoveArticle,
};
