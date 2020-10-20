require('dotenv').config();

const { NODE_ENV, PORT = 3000 } = process.env;

module.exports = {
  PORT,
  DB_URL: (NODE_ENV !== 'production') ? 'mongodb://localhost:27017/newsexplorerdb' : process.env.DB_URL,
  baseOptions: {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  JWT_SECRET: (NODE_ENV !== 'production') ? 'JWT_SECRET' : process.env.JWT_SECRET,
};
