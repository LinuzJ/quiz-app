import { executeQuery } from "../database/database.js";

const deleteAnswer = async (questionId, optionId) => {
  await executeQuery(
    "DELETE FROM question_answers WHERE question_id = $1 AND question_answer_option_id = $2",
    questionId,
    optionId
  );
};

const addAnwser = async (user_id, question_id, option_id, correct) => {
  await executeQuery(
    "INSERT INTO question_answers (user_id, question_id, question_answer_option_id, correct) VALUES ($1, $2, $3, $4)",
    user_id,
    question_id,
    option_id,
    correct
  );
};

const numOfAnswers = async (user_id) => {
  const resp = await executeQuery(
    "SELECT COUNT(id) FROM question_answers WHERE user_id = $1",
    user_id
  );
  return Number(resp.rows[0].count);
};

const numOfCorrectAnswers = async (user_id) => {
  const resp = await executeQuery(
    "SELECT COUNT(id) FROM question_answers WHERE user_id = $1 AND correct = true",
    user_id
  );

  return Number(resp.rows[0].count);
};

const numOfAnswersPerQuestion = async (user_id) => {
  const resp = await executeQuery(
    "SELECT ques.title, COUNT(ques.user_id) FROM (SELECT * FROM questions WHERE user_id = $1) AS ques INNER JOIN question_answers on ques.id = question_answers.question_id GROUP BY ques.title",
    user_id
  );
  return resp.rows;
};

const getTopFive = async () => {
  const resp = await executeQuery(
    "SELECT usr.email, COUNT(ans.id) FROM users as usr INNER JOIN question_answers AS ans ON usr.id = ans.user_id GROUP BY usr.email LIMIT 5;"
  );
  return resp.rows;
};

export {
  deleteAnswer,
  addAnwser,
  numOfAnswers,
  numOfCorrectAnswers,
  numOfAnswersPerQuestion,
  getTopFive,
};
