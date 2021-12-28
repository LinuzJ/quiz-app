import { executeQuery } from "../database/database.js";

const getRandomQuestion = async () => {
  const resp = await executeQuery(
    "SELECT * FROM questions ORDER BY random() LIMIT 1;"
  );
  return resp.rows[0];
};

export { getRandomQuestion };
