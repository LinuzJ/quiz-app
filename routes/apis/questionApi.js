import * as quizService from "../../services/quizService.js";
import * as optionService from "../../services/optionService.js";

const getRandom = async ({ response }) => {
  const question = await quizService.getRandomQuestion();
  let options;
  if (question && question.id) {
    options = await optionService.getOptions(question.id);
  } else {
    response.body = {};
    return;
  }

  if (question && options) {
    response.body = {
      questionId: question.id ? question.id : "",
      questionTitle: question.title ? question.title : "",
      questionText: question.question_text ? question.question_text : "",
      answerOptions: options.map((option) => {
        return {
          optionId: option.id,
          optionText: option.option_text,
        };
      }),
    };
  } else {
    response.body = {};
  }
};

const postAnswer = async ({ request, response }) => {
  let body;
  try {
    body = request.body({ type: "json" });
  } catch {
    response.body = { correct: "false" };
    return;
  }
  const { questionId, optionId } = await body.value;

  // Return error message if wrong structure
  if (!questionId || !optionId) {
    response.body = { correct: "false" };
    return;
  }

  // Fetch correct answer
  const correct = (await optionService.getCorrectOption(questionId))[0];

  // Check if there is a correct answer
  if (!correct || !correct.is_correct) {
    response.body = { correct: "false" };
    return;
  }

  // return
  if (correct.id && optionId) {
    response.body = { correct: correct.id === Number(optionId) };
    return;
  }

  response.body = { correct: "false" };
};

export { getRandom, postAnswer };
