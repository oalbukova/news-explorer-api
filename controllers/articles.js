const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');
const ServerError = require('../errors/server-err');
const BadRequestError = require('../errors/bad-request-err');
const { serverErr, badReqErrMsg } = require('../configs/constants');

const {
  notFoundErrMsg,
  forbiddenErrMsg,
} = require('../configs/constants');

const getArticles = (req, res, next) => {
  const owner = req.user._id;
  Article.find({ owner })
    .populate('user')
    .then((articles) => res.send({ data: articles }))
    .catch((err) => {
      throw new ServerError({
        message: `${serverErr} ${err.message}`,
      });
    })
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
  const owner = req.user._id;
  Article.create({
    keyword,
    title,
    description,
    publishedAt,
    source,
    url,
    urlToImage,
    owner,
  })
    .catch((err) => {
      throw new BadRequestError({ message: `${badReqErrMsg} ${err.message}` });
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
      if (String(article.owner) !== owner) {
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
