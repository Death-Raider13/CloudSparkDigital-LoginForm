const tabLogin = document.getElementById("tabLogin");
const tabRegister = document.getElementById("tabRegister");

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

// Login fields
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const loginEmailError = document.getElementById("loginEmailError");
const loginPasswordError = document.getElementById("loginPasswordError");
const loginMessage = document.getElementById("loginMessage");
const toggleLoginPassword = document.getElementById("toggleLoginPassword");

// Register fields
const regName = document.getElementById("regName");
const regEmail = document.getElementById("regEmail");
const regPassword = document.getElementById("regPassword");
const regConfirmPassword = document.getElementById("regConfirmPassword");

const regNameError = document.getElementById("regNameError");
const regEmailError = document.getElementById("regEmailError");
const regPasswordError = document.getElementById("regPasswordError");
const regConfirmPasswordError = document.getElementById("regConfirmPasswordError");
const registerMessage = document.getElementById("registerMessage");

const toggleRegPassword = document.getElementById("toggleRegPassword");
const toggleRegConfirmPassword = document.getElementById("toggleRegConfirmPassword");

function isValidEmail(value) {
  return /^\S+@\S+\.\S+$/.test(value);
}

function setActiveTab(mode) {
  const isLogin = mode === "login";

  tabLogin.classList.toggle("active", isLogin);
  tabRegister.classList.toggle("active", !isLogin);

  tabLogin.setAttribute("aria-selected", String(isLogin));
  tabRegister.setAttribute("aria-selected", String(!isLogin));

  loginForm.classList.toggle("form-active", isLogin);
  registerForm.classList.toggle("form-active", !isLogin);

  // clear messages on switch
  loginMessage.textContent = "";
  registerMessage.textContent = "";
}

function togglePasswordVisibility(input, btn) {
  const isHidden = input.type === "password";
  input.type = isHidden ? "text" : "password";
  btn.textContent = isHidden ? "Hide" : "Show";
}

tabLogin.addEventListener("click", () => setActiveTab("login"));
tabRegister.addEventListener("click", () => setActiveTab("register"));

toggleLoginPassword.addEventListener("click", () =>
  togglePasswordVisibility(loginPassword, toggleLoginPassword)
);

toggleRegPassword.addEventListener("click", () =>
  togglePasswordVisibility(regPassword, toggleRegPassword)
);

toggleRegConfirmPassword.addEventListener("click", () =>
  togglePasswordVisibility(regConfirmPassword, toggleRegConfirmPassword)
);

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  loginEmailError.textContent = "";
  loginPasswordError.textContent = "";
  loginMessage.textContent = "";
  loginMessage.style.color = "#0f172a";

  const emailValue = loginEmail.value.trim();
  const passwordValue = loginPassword.value.trim();

  let hasError = false;

  if (!emailValue) {
    loginEmailError.textContent = "Email is required.";
    hasError = true;
  } else if (!isValidEmail(emailValue)) {
    loginEmailError.textContent = "Enter a valid email address.";
    hasError = true;
  }

  if (!passwordValue) {
    loginPasswordError.textContent = "Password is required.";
    hasError = true;
  } else if (passwordValue.length < 6) {
    loginPasswordError.textContent = "Password must be at least 6 characters.";
    hasError = true;
  }

  if (hasError) return;

  loginMessage.textContent = "Login successful (demo)!";
  loginMessage.style.color = "#16a34a";
});

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  regNameError.textContent = "";
  regEmailError.textContent = "";
  regPasswordError.textContent = "";
  regConfirmPasswordError.textContent = "";
  registerMessage.textContent = "";
  registerMessage.style.color = "#0f172a";

  const nameValue = regName.value.trim();
  const emailValue = regEmail.value.trim();
  const passValue = regPassword.value.trim();
  const confirmValue = regConfirmPassword.value.trim();

  let hasError = false;

  if (!nameValue) {
    regNameError.textContent = "Full name is required.";
    hasError = true;
  }

  if (!emailValue) {
    regEmailError.textContent = "Email is required.";
    hasError = true;
  } else if (!isValidEmail(emailValue)) {
    regEmailError.textContent = "Enter a valid email address.";
    hasError = true;
  }

  if (!passValue) {
    regPasswordError.textContent = "Password is required.";
    hasError = true;
  } else if (passValue.length < 6) {
    regPasswordError.textContent = "Password must be at least 6 characters.";
    hasError = true;
  }

  if (!confirmValue) {
    regConfirmPasswordError.textContent = "Please confirm your password.";
    hasError = true;
  } else if (passValue && confirmValue !== passValue) {
    regConfirmPasswordError.textContent = "Passwords do not match.";
    hasError = true;
  }

  if (hasError) return;

  registerMessage.textContent = "Account created (demo)! You can now login.";
  registerMessage.style.color = "#16a34a";

  // Optional: automatically switch to login after register
  setActiveTab("login");
});

// default
setActiveTab("login");