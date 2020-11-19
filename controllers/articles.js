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
    .catch((err) => {
      throw new BadRequestError({ message: `${badReqErrMsg} ${err.message}` });
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
