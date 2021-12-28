import * as optionService from "../../services/optionService.js";
import * as questionService from "../../services/questionService.js";
import * as answerService from "../../services/answerService.js";
import * as authService from "../../services/authService.js";
import { validasaur } from "../../deps.js";

// Validation rules
const optionValidationRules = {
  option_text: [validasaur.required, validasaur.minLength(1)],
};

// Helper for validation
const getOptionData = async (request, params, state) => {
  // Save neccessary data from params
  const body = request.body();
  const val = await body.value;

  // Get user details
  const user = await state.session.get("user");
  const user_real = (await authService.findUserByEmail(user.email))[0];

  return {
    question_id: await params.id,
    option_text: await val.get("option_text"),
    is_correct: await val.get("is_correct"),
    user: user_real,
  };
};

const addOption = async ({ params, request, response, render, state }) => {
  // Get data
  const optionData = await getOptionData(request, params, state);

  // Check if current user owns question
  const validUserQuestions = await questionService.getQuesByUserId(
    optionData.question_id,
    optionData.user.id
  );

  // If this question does not belong to this user
  if (validUserQuestions.length !== 1) {
    response.redirect("/");
  }

  // Validate data
  const [passes, errors] = await validasaur.validate(
    optionData,
    optionValidationRules
  );

  if (!passes) {
    // If there is a problem, add to data, render with validationErrors

    // Prep temp data with validation errors and form data
    const data = {
      question: await questionService.getSingleQuestion(optionData.question_id),
      options: await optionService.getOptions(optionData.question_id),
      validationErrors: errors,
      option_text: optionData.option_text,
      is_correct: optionData.is_correct,
    };

    render("question.eta", data);
  } else {
    // Add to option table
    await optionService.addOption(
      optionData.question_id,
      optionData.option_text,
      optionData.is_correct
    );

    // Redirect back to the question page
    response.redirect(`/questions/${optionData.question_id}`);
  }
};

const deleteOption = async ({ params, response }) => {
  // Save neccessary data from params
  const optionId = await params.optionId;
  const questionId = await params.questionId;

  // Delete option from both the option db table and answer table
  await optionService.deleteOption(optionId);
  await answerService.deleteAnswer(questionId, optionId);

  // Redirect back to the question page
  response.redirect(`/questions/${questionId}`);
};

export { addOption, deleteOption };
