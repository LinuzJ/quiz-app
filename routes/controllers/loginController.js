import * as authService from "../../services/authService.js";
import { bcrypt } from "../../deps.js";

const authLogin = async ({ request, response, state }) => {
  // Get data from request
  const body = request.body({ type: "form" });
  const val = await body.value;

  // Fetch user(s) from db with this email
  const userFromDatabase = await authService.findUserByEmail(val.get("email"));

  // If there is none/more than one -> retry
  if (userFromDatabase.length != 1) {
    response.redirect("/auth/login");
    return;
  }

  // Get the data
  const user = userFromDatabase[0];

  // Check password
  const passwordMatches = await bcrypt.compare(
    val.get("password"),
    user.password
  );

  // If incorrect password
  if (!passwordMatches) {
    response.redirect("/auth/login");
    return;
  }

  // Set state user to this (correct) user
  await state.session.set("user", user);

  response.redirect("/questions");
};

const showLogin = ({ render }) => {
  render("login.eta");
};

export { authLogin, showLogin };
