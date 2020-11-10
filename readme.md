# Recurring task manager - Backend
## Управление повторяющимися задачами - Серверное Api

---

Personal project of [Dmitriy Oskarov](http://frontendfrontier.com/)

---

Technology stack: 

* Node
* Express
* MongoDB
* Atlas
* GraphQL

---

### Description (Описание)

EN:

This is a personal project to explore and taste this stack, and GraphQL in particular.
It is a recurring task manager.
Starting from the date of creation of the task, and then from the date of modification, we
based on the repetition range and build a list of
tasks user should do today. The cherry on the cake is an opportunity to write comments for
tasks and like it. The user, in turn, can set a private flag to the task.

RU:

Это персональный проект для изучения и пробы на вкус данного стека, и GraphQL в частности.
Он представляет собой менеджер повторяющихся задач. 
Начиная от даты создания задачи, и отталкивая от даты изменения, мы
, опираясь на диапазон повторения, выстраиваем список того, 
что пользователь должен сделать именно сегодня. Вишенка на торте - это возможность писать комментарии для 
задач и ставить лайки. Пользователь в свою очередь может поставить задаче приватный флаг.

---

### Installing (Установка)

1. clone
2. npm install
3. create Atlas cluster on [mongoDB cloud](https://cloud.mongodb.com/)
4. create `config.js` in root folder:
```js
    module.exports = {
        MONGODB: 'connection string from cloud.mongodb.com',
        SECRET_KEY: 'very secret key'
    }
```
5. npm run dev
6. enjoy documentation on [localhost](http://localhost:5000/)