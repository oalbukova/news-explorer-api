require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { mongoAddress, mongoOptions, limiter } = require('./config');
const routes = require('./routes');
const errorHandler = require('./middlewares/error-handler');

const app = express();

const {
  PORT = 3000,
} = process.env;

app.use(cookieParser());
app.use(helmet());
app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
mongoose.connect(mongoAddress, mongoOptions);
app.use(requestLogger); // подключаем логгер запросов
app.use(cors({ origin: true }));
app.use(routes);

app.use(errorLogger); // подключаем логгер ошибок
app.use(errors()); // обработчик ошибок celebrate
app.use(errorHandler);

app.listen(PORT);
