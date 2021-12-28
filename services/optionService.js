import { executeQuery } from "../database/database.js";

const addOption = async (question_id, option_text, is_correct) => {
  const answer = is_correct ? true : false;
  await executeQuery(
    "INSERT INTO question_answer_options (question_id, option_text, is_correct) VALUES ($1, $2, $3)",
    question_id,
    option_text,
    answer
  );
};

const getOptions = async (question_id) => {
  const resp = await executeQuery(
    "SELECT * FROM question_answer_options WHERE question_id = $1",
    question_id
  );

  return resp.rows;
};

const getSingleOption = async (question_id, option_id) => {
  const resp = await executeQuery(
    "SELECT * FROM question_answer_options WHERE question_id = $1 AND id = $2",
    question_id,
    option_id
  );

  return resp.rows[0];
};

const getCorrectOption = async (question_id) => {
  const resp = await executeQuery(
    "SELECT * FROM question_answer_options WHERE question_id = $1 AND is_correct = true",
    question_id
  );

  return resp.rows[0];
};

const deleteOption = async (optionId) => {
  await executeQuery(
    "DELETE FROM question_answer_options WHERE id = $1",
    optionId
  );
};

export {
  getOptions,
  addOption,
  deleteOption,
  getSingleOption,
  getCorrectOption,
};
