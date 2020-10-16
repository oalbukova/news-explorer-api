require('dotenv').config();
const rateLimit = require('express-rate-limit');

const { NODE_ENV, JWT_SECRET } = process.env;

const mongoAddress = 'mongodb://localhost:27017/newsexplorerdb';
const mongoOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Слишком много запросов, повторите запрос позже',
});

module.exports = {
  NODE_ENV, JWT_SECRET, mongoAddress, mongoOptions, limiter,
};
