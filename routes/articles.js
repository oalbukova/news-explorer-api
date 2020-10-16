const express = require('express');
const {
  validateArticle,
  validateObjId,
} = require('../middlewares/validations');
const {
  getArticles,
  createArticle,
  findByIdAndRemoveArticle,
} = require('../controllers/articles');

const articleRouter = express.Router();

articleRouter.get('/', getArticles);
articleRouter.post('/', validateArticle, createArticle);
articleRouter.delete('/:articleId', validateObjId, findByIdAndRemoveArticle);

module.exports = articleRouter;
