import * as quizService from "../../services/quizService.js";
import * as optionService from "../../services/optionService.js";

const getRandom = async ({ response }) => {
  const question = await quizService.getRandomQuestion();
  const options = await optionService.getOptions(question.id);
  response.body = {
    questionId: question.id,
    questionTitle: question.title,
    questionText: question.question_text,
    answerOptions: options.map((option) => {
      return {
        optionId: option.id,
        optionText: option.option_text,
      };
    }),
  };
};

const postAnswer = async ({ request, response }) => {
  const body = request.body({ type: "json" });
  const { questionId, optionId } = await body.value;

  // Return error message if wrong structure
  if (!questionId || !optionId) {
    response.body = { error: "Wrong structure in post!" };
    return;
  }
  const correct = await optionService.getCorrectOption(questionId);

  // Check if there is a correct answer
  if (!correct || !correct.is_correct) {
    response.body = { error: "There is no correct answer for this question." };
    return;
  }

  // return
  response.body = { correct: correct.id === Number(optionId) };
};

export { getRandom, postAnswer };
