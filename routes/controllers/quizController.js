import * as quizService from "../../services/quizService.js";
import * as questionService from "../../services/questionService.js";
import * as optionService from "../../services/optionService.js";
import * as answerService from "../../services/answerService.js";
import * as authService from "../../services/authService.js";

const getQuiz = async ({ response }) => {
  const ques = await quizService.getRandomQuestion();

  response.redirect(`/quiz/${ques ? ques.id : 0}`);
};

const getSingleQuiz = async ({ params, response, render }) => {
  const id = params.id;

  // Check if empty
  if (id === 0) {
    render("quiz.eta", {});
  }
  render("quiz.eta", {
    question: await questionService.getSingleQuestion(id),
    options: await optionService.getOptions(id),
  });
};

const handleAttempt = async ({ params, response, state }) => {
  // Get data from params
  const question_id = params.id;
  const option_id = params.optionId;

  // Get question and options from db
  const question = await questionService.getSingleQuestion(question_id);
  const option = await optionService.getSingleOption(question_id, option_id);

  // Get user from session
  const user = await state.session.get("user");
  const user_real = (await authService.findUserByEmail(user.email))[0];

  // Add answer
  await answerService.addAnwser(
    user_real.id,
    question.id,
    option.id,
    option.is_correct
  );

  // Redirect depending on answer
  if (!option.is_correct) {
    const path = "/quiz/" + question_id + "/incorrect";
    response.redirect(path);
    return;
  }

  const path = "/quiz/" + question_id + "/correct";
  response.redirect(path);
};

const getCorrect = async ({ render }) => {
  render("correct.eta");
};

const getIncorrect = async ({ render, params }) => {
  const option = await optionService.getCorrectOption(params.id);
  if (option.length === 0) {
    render("incorrect.eta", { correct: option });
  } else {
    render("incorrect.eta", { correct: option[0] });
  }
};

export { getQuiz, getSingleQuiz, handleAttempt, getCorrect, getIncorrect };
