/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');
const BadRequestError = require('../errors/bad-request-err');
const {
  notFoundErrMsg,
  forbiddenErrMsg,
  successDel,
} = require('../configs/constants');

const getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .orFail(new NotFoundError({ message: notFoundErrMsg.article }))
    .populate("user")
    .then((cards) => res.send({ data: cards }))
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
    .then((article) =>
      res.status(201).send({
        data: {
          keyword: article.keyword,
          title: article.title,
          description: article.description,
          publishedAt: article.publishedAt,
          source: article.source,
          url: article.url,
          urlToImage: article.urlToImage,
        },
      })
    )
    .catch(next);
};

const findByIdAndRemoveArticle = (req, res, next) => {
  const currentOwner = req.user._id;
  Article.findOne({ _id: req.params.articleId })
    .select("+owner")
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
/*
const getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .orFail(new NotFoundError({ message: notFoundErrMsg.article }))
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
}; */
/*
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
    .then((result) => res.status(201).send({ data: result }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
      }
      next(err);
    });
};

const getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((article) => {
      if (article.length === 0) {
        throw new NotFoundError(notFoundErrMsg.articleId);
      }
      res.send({ data: article });
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new BadRequestError('Невалидный id пользователя'));
      }
      next(err);
    });
};

const findByIdAndRemoveArticle = (req, res, next) => {
  Article.findById(req.params.articleId)
    .select('+owner')
    .then((article) => {
      if (!article) {
        throw new NotFoundError(notFoundErrMsg.articleId);
      } else if (article.owner.toString() !== req.user._id) {
        throw new ForbiddenError(forbiddenErrMsg);
      } else {
        Article.findByIdAndRemove(req.params.articleId)
          .then((result) => {
            if (!result) {
              throw new NotFoundError(notFoundErrMsg.articleId);
            }
            res.send({ data: result });
          })
          .catch(next);
      }
    })
    .catch(next);
};

module.exports = {
  getArticles,
  createArticle,
  findByIdAndRemoveArticle,
};
*/