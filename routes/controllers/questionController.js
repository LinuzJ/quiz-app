import * as questionService from "../../services/questionService.js";
import * as optionService from "../../services/optionService.js";
import * as authService from "../../services/authService.js";
import { validasaur } from "../../deps.js";

// Validation rules
const questionValidationRules = {
  title: [validasaur.required, validasaur.minLength(1)],
  question_text: [validasaur.required, validasaur.minLength(1)],
};

// Helper for validation
const getQuestionData = async (request, state) => {
  // Save neccessary data from params
  const body = request.body();
  const val = await body.value;

  const user = await state.session.get("user");
  const user_real = (await authService.findUserByEmail(user.email))[0];

  return {
    user_id: user_real.id,
    title: val.get("title"),
    question_text: val.get("question_text"),
  };
};

//
// Real methods
//
const showQuestions = async ({ render, state }) => {
  // Get current user
  const user = await state.session.get("user");
  const user_real = (await authService.findUserByEmail(user.email))[0];

  // Prep question data
  const data = {
    questions: await questionService.getAllQuestionsByUser(user_real.id),
  };

  // Render the page
  render("questions.eta", data);
};

const addQuestion = async ({ request, response, render, state }) => {
  // Get data from helper
  const questionData = await getQuestionData(request, state);

  // Validate data
  const [passes, errors] = await validasaur.validate(
    questionData,
    questionValidationRules
  );

  if (!passes) {
    // If there is a problem, add to data, render with validationErrors
    questionData.validationErrors = errors;
    render("questions.eta", questionData);
  } else {
    // Add question to questions db
    await questionService.addQuestion(
      questionData.user_id,
      questionData.title,
      questionData.question_text
    );

    response.redirect("/questions");
  }
};

const showSingleQuestion = async ({ params, render, state, response }) => {
  // Get current user
  const user = await state.session.get("user");
  const user_real = (await authService.findUserByEmail(user.email))[0];

  // Get id data
  const id = await params.id;

  // Check if current user owns question
  const validUserQuestions = await questionService.getQuesByUserId(
    id,
    user_real.id
  );

  // If this question does not belong to this user
  if (validUserQuestions.length !== 1) {
    response.redirect("/questions");
  }

  // Prep question and options data
  const data = {
    question: await questionService.getSingleQuestion(id),
    options: await optionService.getOptions(id),
  };

  // Render the page
  render("question.eta", data);
};

const deleteSingleQuestion = async ({ params, response }) => {
  await questionService.deleteSingleQuestion(await params.id);

  response.redirect("/questions");
};

export { showQuestions, addQuestion, showSingleQuestion, deleteSingleQuestion };
