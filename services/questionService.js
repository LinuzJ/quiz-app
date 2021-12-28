import { executeQuery } from "../database/database.js";

const getAllQuestions = async () => {
  const resp = await executeQuery("SELECT * FROM questions;");
  return resp.rows;
};

const getAllQuestionsByUser = async (user_id) => {
  const resp = await executeQuery(
    "SELECT * FROM questions WHERE user_id = $1;",
    user_id
  );
  return resp.rows;
};

const addQuestion = async (user_id, title, question) => {
  await executeQuery(
    "INSERT INTO questions (user_id, title, question_text) VALUES ($1, $2, $3)",
    user_id,
    title,
    question
  );
};

const getSingleQuestion = async (id) => {
  const resp = await executeQuery("SELECT * FROM questions WHERE id = $1", id);

  return resp.rows[0];
};

const deleteSingleQuestion = async (id) => {
  // Delete from all three tables
  await executeQuery("DELETE FROM question_answers WHERE question_id = $1", id);
  await executeQuery(
    "DELETE FROM question_answer_options WHERE question_id = $1",
    id
  );
  await executeQuery("DELETE FROM questions WHERE id = $1", id);
};

const getQuesByUserId = async (question_id, user_id) => {
  // Gets a question by its questionId and userId
  const resp = await executeQuery(
    "SELECT * FROM questions WHERE id = $1 AND user_id = $2",
    question_id,
    user_id
  );

  return resp.rows;
};

export {
  getAllQuestions,
  addQuestion,
  getSingleQuestion,
  deleteSingleQuestion,
  getAllQuestionsByUser,
  getQuesByUserId,
};
