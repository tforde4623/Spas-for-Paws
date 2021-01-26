$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $(".registration-form");
  const firstNameInput = $("input#firstname-input");
  const lastNameInput = $("input#lastname-input");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");

  // When the signup button is clicked, we validate the email and password are not blank
  let userData;
  signUpForm.on("submit", event => {
    event.preventDefault();
    userData = {
      firstName: firstNameInput.val().trim(),
      lastName: lastNameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have a first name, last name, email, and password, run the signUpUser function
    signUpUser(userData);
    firstNameInput.val("");
    lastNameInput.val("");
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page with a "Welcome, (User)!" message
  // Otherwise we log any errors
  function signUpUser(data) {
    $.post("/api/signup", data)
      .then(() => {
        window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    const errMsg =
      err.responseJSON.name === "SequelizeUniqueConstraintError"
        ? "Account already exists."
        : "Registration failed!";
    $("#alert .msg").text(errMsg);
    $("#alert").fadeIn(500);
  }
});
