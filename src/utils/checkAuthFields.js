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

function checkNewDraftFields({ Name, Pixels }) {
  const nameField = Name === "" ? true : false;
  const pixelsField = Pixels === "" ? true : false;

  if (nameField || pixelsField) {
    return true;
  } else {
    return false;
  }
}

export { checkAuthFields, checkNewDraftFields };
