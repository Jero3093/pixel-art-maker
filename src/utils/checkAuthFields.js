function checkAuthFields({ Username, Email, Password }) {
  const nameField = Username === "" ? true : false;
  const emailField = Email === "" ? true : false;
  const passwordField = Password === "" ? true : false;

  if (nameField || emailField || passwordField) {
    return true;
  } else {
    return false;
  }
}

export { checkAuthFields };
