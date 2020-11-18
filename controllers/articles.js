const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');
const ServerError = require('../errors/server-err');
const BadRequestError = require('../errors/bad-request-err');
const { serverErr, badReqErrMsg, successDel } = require('../configs/constants');

const { notFoundErrMsg, forbiddenErrMsg } = require('../configs/constants');

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
