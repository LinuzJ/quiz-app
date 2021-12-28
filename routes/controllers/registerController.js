import { bcrypt } from "../../deps.js";
import * as authService from "../../services/authService.js";
import { validasaur } from "../../deps.js";

// Validation rules
const userValidationRules = {
  email: [validasaur.required, validasaur.isEmail],
  password: [validasaur.required, validasaur.minLength(4)],
};

const getUserData = async (request) => {
  const body = request.body({ type: "form" });
  const val = await body.value;

  return {
    email: val.get("email"),
    password: val.get("password"),
  };
};

const addUser = async ({ request, response, render }) => {
  const usrData = await getUserData(request);

  const [passes, errors] = await validasaur.validate(
    usrData,
    userValidationRules
  );
  if (!passes) {
    // If there is a problem, add to data, render with validationErrors
    usrData.validationErrors = errors;
    render("registration.eta", usrData);
  } else {
    await authService.addUser(
      usrData.email,
      await bcrypt.hash(usrData.password)
    );

    response.redirect("/auth/login");
  }
};

const showReg = ({ render }) => {
  render("registration.eta");
};

export { addUser, showReg };
