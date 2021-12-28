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

## To run locally

After configuring the database the app can be run locally with the command:

```
deno run --allow-net --allow-read --allow-env --allow-write --unstable run-locally.js
```

Enjoy!
