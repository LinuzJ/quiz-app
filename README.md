# Multiple choice quiz app

DEMO: https://quiz-app--demo.herokuapp.com/

## Directory structure

```
.
├── database
│   └── database.js
├── middlewares
│   ├── authMiddleware.js
│   ├── errorMiddleware.js
│   ├── serveStaticMiddleware.js
│   └── renderMiddleware.js
├── routes
│   ├── apis
│   │   └── questionApi.js
│   ├── controllers
│   │   ├── loginController.js
│   │   ├── mainController.js
│   │   ├── optionController.js
│   │   ├── questionController.js
│   │   ├── quizController.js
│   │   ├── registerController.js
│   │   └── statisticsController.js
│   └── routes.js
├── services
│   ├── answerService.js
│   ├── authService.js
│   ├── optionService.js
│   ├── questionService.js
│   └── quizService.js
├── tests
│   └── main_tests.js
├── views
│   ├── layouts
│   │   └── layout.eta
│   ├── partials
│   │   └── navbar.eta
│   ├── correct.eta
│   ├── incorrect.eta
│   ├── login.eta
│   ├── main.eta
│   ├── question.eta
│   ├── questions.eta
│   ├── quiz.eta
│   ├── registration.eta
│   └── stats.eta
├── app.js
├── deps.js
├── heroku-deploy.js
├── Procfile
├── README.md
└── run-locally.js
```

## Database schema

To run locally the following database tables are required

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  password CHAR(60)
);

CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  title VARCHAR(256) NOT NULL,
  question_text TEXT NOT NULL
);


CREATE TABLE question_answer_options (
  id SERIAL PRIMARY KEY,
  question_id INTEGER REFERENCES questions(id),
  option_text TEXT NOT NULL,
  is_correct BOOLEAN DEFAULT false
);

CREATE TABLE question_answers (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  question_id INTEGER REFERENCES questions(id),
  question_answer_option_id INTEGER REFERENCES question_answer_options(id),
  correct BOOLEAN DEFAULT false
);

CREATE UNIQUE INDEX ON users((lower(email)));
```

## To run locally

After configuring the database the app can be run locally with the command:

```
deno run --allow-net --allow-read --allow-env --allow-write --unstable run-locally.js
```

Enjoy!
