# news-explorer-api
Репозиторий для полноценного API проекта News-Explorer, включающий авторизацию и регистрацию пользователей, поиск и сохранение новостей.

## Функциональность сайта:

* регистрация,
* авторизация,
* сохранение статьи,
* удаление статьи,
* получение всех статей пользователя.

## Технологии:

* JavaScript,
* Express,
* MongoBD,
* Node.js,
* Joi-Celebrate ,
* Winston.

Ссылка на API:
* <https://api.news.oalbukova.nomoredomains.work/>

Публичный IP-адрес сервера: 130.193.37.144

## В API реализованы рoуты:

> POST /signup

создаёт пользователя с переданными в теле email, password и name 

> POST /signin

проверяет переданные в теле почту и пароль и возвращает JWT

> GET /users/me

возвращает информацию о пользователе (email и имя)

> GET /articles

возвращает все сохранённые пользователем статьи

> POST /articles

создаёт статью с переданными в теле keyword, title, text, date, source, link и image 

> DELETE /articles/articleId

удаляет сохранённую статью по _id


## Запуск проекта
* Для установки, запускаем клонирование репозитория:
> git clone https://github.com/oalbukova/news-explorer-api.git

* Установка зависимостей:
> npm install

* Запускаем проект на <http://localhost:3000/> (2 режима запуска):
> npm run start  
> npm run dev

Публичный IP-адрес

Домен














