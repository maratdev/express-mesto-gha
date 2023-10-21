# Проект Mesto бэкенд
 _***Backend часть сервиса, с помощью которого пользователь может делиться фото с другими.***_
 [Live demo](https://voredev.nomoredomains.xyz/)

## Технологии:
  <a href="https://expressjs.com/ru/" target="_blank" rel="noreferrer"><img src="https://img.shields.io/badge/-Express-090909?style=for-the-badge&logo=Express" alt="Express" /></a>
  <a href="https://nodejs.org/ru" target="_blank" rel="noreferrer"><img src="https://img.shields.io/badge/-Node.js-090909?style=for-the-badge&logo=Node.js" alt="Node.js" /></a>
  <a href="https://www.mongodb.com/" target="_blank" rel="noreferrer"><img src="https://img.shields.io/badge/-MongoDB-090909?style=for-the-badge&logo=MongoDB" alt="MongoDB" /></a>
  <a href="https://www.postman.com/" target="_blank" rel="noreferrer"><img src="https://img.shields.io/badge/-Postman-090909?style=for-the-badge&logo=Postman" alt="Postman" /></a>
  <a href="https://eslint.org/" target="_blank" rel="noreferrer"><img src="https://img.shields.io/badge/-Eslint-090909?style=for-the-badge&logo=Eslint&logoColor=blue" alt="Eslint" /></a>
  <a href="https://jwt.io/" target="_blank" rel="noreferrer"><img src="https://img.shields.io/badge/-Jsonwebtokens-090909?style=for-the-badge&logo=json-web-tokens&logoColor=d63aff" alt="jwt" /></a>

### Функционал:

+ Регистрация  `POST: /signup`
+ Авторизация `POST: /signin`
+ Обновление данных пользователя `PATCH: /users/me`
+ Обновление аватара `PATCH: /users/me/avatar`
+ Получение списка всех пользователей `GET: /users`
+ Получение пользователя по ID `GET: /users/userID`
+ Получение информации о текущем пользователе `GET: /users/me`
+ Получение списка всех карточек `GET: /cards`
+ Создание карточки `POST: /cards`
+ Удаление карточки 'DELETE: /cards/cardID'
+ Постановка лайка `PUT: /cards/cardID/likes`
+ Снятие лайка `DELETE: /cards/cardID/likes`
+ Центральная обработка ошибок
+ Валидация входящих данных
+ Защита API авторизацией
------
### О чём проект?

*Данное серверное приложение предназначено для храниния и обмена файлами с вэб-приложением Mesto.*

* Возможность зарегестрироваться и залогиниться с помощью почты и пароля. Токен для авторизации хранится 7 дней.
* У каждого пользователя есть поля name, about, avatar, email, password. Их можно задать при регистрации. Если не задать name, about или avatar, то установятся дефолтные.
* Поля name, about, avatar можно обновить после регистрации.
* Можно создавать карточки. У каждой каточки есть есть поля name, link (ссылка на картинку), owner (id создателя карточки), createdAt (дата создания карточки) и массив likes (лайков карточки, которые могут ставить пользователи).
* Карточки можно создавать и удалять, а также лайкать.
* Поля валидируются (например ссылки или email).
------
### Директории

`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и карточки   
`/models` — папка с файлами описания схем пользователя и карточки

Остальные директории вспомогательные, создаются при необходимости разработчиком

### Запуск проекта

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload


Репозиторий:

```bash
git clone https://github.com/maratdev/express-mesto-gha/
```
