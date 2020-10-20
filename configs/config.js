require('dotenv').config();

const { NODE_ENV } = process.env;

module.exports = {
  DB_URL: (NODE_ENV === 'production') ? process.env.DB_URL : 'mongodb://localhost:27017/newsexplorerdb',
  baseOptions: {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  JWT_SECRET: (NODE_ENV === 'production') ? process.env.JWT_SECRET : 'JWT_SECRET',
};
