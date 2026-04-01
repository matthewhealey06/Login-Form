const form = document.getElementById("form");
let username = document.getElementById("username");
let email = document.getElementById("email");
let password = document.getElementById("password");
let repeatPass = document.getElementById("repeat-password");
const submit = document.getElementById("submit");
const errorMsg = document.getElementById("error-message");

function validateForm() {
  const usernameValue = username.value;
  const emailValue = email.value;
  const passwordValue = password.value;
  const repeatPasswordValue = repeatPass.value;

  let missingFields = [];

  if (usernameValue === "") {
    missingFields.push("Username");
  }
  if (emailValue === "") {
    missingFields.push("Email");
  }
  if (passwordValue === "") {
    missingFields.push("Password");
  }
  if (missingFields.length > 0) {
    errorMsg.textContent =
      missingFields.join(", ") +
      (missingFields.length > 1 ? " are required" : " is required");
  } else if (!email.validity.valid && emailValue !== "") {
    errorMsg.textContent = "Please Enter a Valid Email";
  } else if (passwordValue !== repeatPasswordValue) {
    errorMsg.textContent = "Passwords dont match";
  } else {
    errorMsg.textContent = "";

    const user = {
      username: usernameValue,
      email: emailValue,
      password: passwordValue,
    };
    console.log("Saving User");
  }
}

// Add event listeners that CALL the function
submit.addEventListener("click", (e) => {
  validateForm();
  if (errorMsg.textContent === "") {
    fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username.value,
        email: email.value,
        password: password.value,
      }),
    });
    window.location.href = "index.html";
  }
});

username.addEventListener("input", () => {
  validateForm();
});
email.addEventListener("input", () => {
  validateForm();
});
password.addEventListener("input", () => {
  validateForm();
});
repeatPass.addEventListener("input", () => {
  validateForm();
});
