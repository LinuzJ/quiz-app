import * as authService from "../../services/authService.js";
import { bcrypt } from "../../deps.js";

const authLogin = async ({ request, response, state, render }) => {
  // Get data from request
  const body = request.body({ type: "form" });
  const val = await body.value;

  // Save data
  const email = val.get("email");
  const password = val.get("password");

  // Fetch user(s) from db with this email
  const userFromDatabase = await authService.findUserByEmail(email);

  // If there is none/more than one -> retry
  if (userFromDatabase.length != 1) {
    render("login.eta", {
      validationErrors: {
        errors: {
          email: "The email is incorrect",
        },
      },
      email: email,
      password: password,
    });
    return;
  }

  // Get the data
  const user = userFromDatabase[0];

  // Check password
  const passwordMatches = await bcrypt.compare(password, user.password);

  // If incorrect password
  if (!passwordMatches) {
    render("login.eta", {
      validationErrors: {
        errors: {
          password: "The password is incorrect",
        },
      },
      email: email,
      password: password,
    });
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
