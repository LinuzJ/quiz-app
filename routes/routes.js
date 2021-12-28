import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as questionController from "./controllers/questionController.js";
import * as optionController from "./controllers/optionController.js";
import * as registerController from "./controllers/registerController.js";
import * as loginController from "./controllers/loginController.js";
import * as quizController from "./controllers/quizController.js";
import * as statisticsController from "./controllers/statisticsController.js";
import * as questionApi from "./apis/questionApi.js";

const router = new Router();

// GET
//-----------------------------------------------------------------
// questions
router.get("/", mainController.showMain);
router.get("/questions", questionController.showQuestions);
router.get("/questions/:id", questionController.showSingleQuestion);
// auth
router.get("/auth/register", registerController.showReg);
router.get("/auth/login", loginController.showLogin);
// quiz
router.get("/quiz", quizController.getQuiz);
router.get("/quiz/:id", quizController.getSingleQuiz);
router.get("/quiz/:id/correct", quizController.getCorrect);
router.get("/quiz/:id/incorrect", quizController.getIncorrect);
// statistics
router.get("/statistics", statisticsController.getStats);
//-----------------------------------------------------------------

// POST
//-----------------------------------------------------------------
// questions
router.post("/questions", questionController.addQuestion);
router.post("/questions/:id/delete", questionController.deleteSingleQuestion);
router.post("/questions/:id/options", optionController.addOption);
router.post(
  "/questions/:questionId/options/:optionId/delete",
  optionController.deleteOption
);
// auth
router.post("/auth/register", registerController.addUser);
router.post("/auth/login", loginController.authLogin);
// quiz
router.post("/quiz/:id/options/:optionId", quizController.handleAttempt);
//-----------------------------------------------------------------

// API
//-----------------------------------------------------------------
router.get("/api/questions/random", questionApi.getRandom);
router.post("/api/questions/answer", questionApi.postAnswer);

//-----------------------------------------------------------------

export { router };
