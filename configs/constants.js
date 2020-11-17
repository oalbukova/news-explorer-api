const notFoundErrMsg = {
  page: 'Страница по указанному маршруту не найдена',
  article: 'Нет сохраненных статей',
  articleId: 'Статья с таким идентификатором не найдена',
  user: 'Пользователь не найден',
};

const badReqErrMsg = {
  password: 'Поле "password" должно быть заполнено',
};

const authErrMsg = {
  invalidData: 'Неправильные почта или пароль',
  authRequest: 'Необходима авторизация',
};

const validateErr = 'Поле должно быть валидным url-адресом';
const emailErr = 'Неправильный формат email';
const forbiddenErrMsg = 'Запрос некорректен: недостаточно прав';
const conflictErr = 'Такой пользователь уже есть';
const serverErr = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';
const successDel = 'Статья успешно удалена';
const limiterErr = 'Слишком много запросов, повторите запрос позже';

module.exports = {
  notFoundErrMsg,
  badReqErrMsg,
  authErrMsg,
  forbiddenErrMsg,
  serverErr,
  conflictErr,
  successDel,
  validateErr,
  limiterErr,
  emailErr,
};
