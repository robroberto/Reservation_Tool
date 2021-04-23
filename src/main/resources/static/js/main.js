console.log("Hallo Konsole, alles fresh?");
function setFormMessage(formElement, type, message) {
  const messageElement = formElement.querySelector(".form__message");

  messageElement.textContent = message;
  messageElement.classList.remove(
    "form__message--success",
    "form__message--error"
  );
  messageElement.classList.add("form__message--" + type);
}

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("#login");
  const requestAccountForm = document.querySelector("#requestAccount");

  document
    .querySelector("#linkRequestAccount")
    .addEventListener("click", (e) => {
      e.preventDefault();
      loginForm.classList.add("form--hidden");
      requestAccountForm.classList.remove("form--hidden");
    });

  document.querySelector("#linkLogin").addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.classList.remove("form--hidden");
    requestAccountForm.classList.add("form--hidden");
  });
  //Login-Prozess
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Ajax Prozess --> Rest-Service Aufruf

    //je nach Rückgabewert von VerificationClass
    var isLoggedIn = true;
    if (isLoggedIn) {
      setFormMessage(loginForm, "success", "Sie sind angemeldet!");
    } else {
      setFormMessage(
        loginForm,
        "error",
        "Email/Passwort Kombination stimmt nicht überein!"
      );
    }
  });

  //AccountRequest-Prozess
  requestAccountForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let a_name = document.querySelector("#a_name").value;
    let a_email = document.querySelector("#a_email").value;
    let a_mobile = document.querySelector("#a_mobile").value;
    let a_password = document.querySelector("#a_password").value;
    // erste verifikation der daten

    // Ajax Prozess --> Rest-Service Aufruf
    $.ajax({
      type: "POST",
      url: "/api/account_request",
      data: JSON.stringify({
        accountRequestName: a_name,
        accountRequestEmail: a_email,
        accountRequestMobile: a_mobile,
        accountRequestPassword: a_password,
      }),
      //success: orderCreated,
      dataType: "json",
      contentType: "application/json",
    });
    //je nach Rückgabewert von VerificationClass
    var isLoggedIn = true;
    if (isLoggedIn) {
      setFormMessage(
        requestAccountForm,
        "success",
        "Sie haben eine Accountanfrage verschickt!"
      );
    } else {
      setFormMessage(
        requestAccountForm,
        "error",
        "Die Accountanfrage war nicht erfolgreich"
      );
    }
  });
});
