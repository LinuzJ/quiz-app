import * as answerService from "../../services/answerService.js";
import * as authService from "../../services/authService.js";

const getStats = async ({ state, render }) => {
  // Get user info
  const user = await state.session.get("user");
  const usr_real = (await authService.findUserByEmail(user.email))[0];

  // Init data
  let data = { topFive: await answerService.getTopFive() };

  // Fetch the statistics
  if (usr_real.id) {
    data = {
      topFive: data.topFive,
      numOfAns: await answerService.numOfAnswers(usr_real.id),
      numOfCorAns: await answerService.numOfCorrectAnswers(usr_real.id),
      numOfAnsPerQ: await answerService.numOfAnswersPerQuestion(usr_real.id),
    };
  }

  render("stats.eta", data);
};

export { getStats };
