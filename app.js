const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { DB_URL, PORT, baseOptions } = require('./configs/config');
const limiter = require('./configs/limiter');
const routes = require('./routes');
const errorHandler = require('./middlewares/error-handler');

const app = express();

app.use(cookieParser());
app.use(helmet());
app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
mongoose.connect(DB_URL, baseOptions);
app.use(requestLogger); // подключаем логгер запросов
app.use(routes);

app.use(errorLogger); // подключаем логгер ошибок
app.use(errors()); // обработчик ошибок celebrate
app.use(errorHandler);

app.listen(PORT);
