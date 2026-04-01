const form = document.getElementById("form");
let username = document.getElementById("username");
let password = document.getElementById("password");
const rememberMe = document.getElementById("rememberMe");
const submit = document.getElementById("submit");
const errorMsg = document.getElementById("error-message");

const savedUser = JSON.parse(localStorage.getItem("savedUser"));
if (savedUser) {
  username.value = savedUser.username;
  password.value = savedUser.password;
}
submit.addEventListener("click", (e) => {
  fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username.value,
      password: password.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        localStorage.setItem('user', JSON.stringify({ username: username.value }))
        window.location.href = "welcome.html";
      } else {
        errorMsg.textContent = data.message;
      }
      if (rememberMe.checked) {
        localStorage.setItem(
          "savedUser",
          JSON.stringify({
            username: username.value,
            password: password.value,
          }),
        );
      } else {
        localStorage.removeItem("savedUser");
      }
    });
});
