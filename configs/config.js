require('dotenv').config();

const { JWT_SECRET = 'JWT_SECRET', NODE_ENV, DB_URL } = process.env;
const baseAddress = 'mongodb://localhost:27017/newsexplorerdb';
//const baseAddress = NODE_ENV === 'production' ? DB_URL : 'mongodb://localhost:27017/newsexplorerdb';
const baseOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

module.exports = {
  JWT_SECRET, baseAddress, baseOptions,
};
