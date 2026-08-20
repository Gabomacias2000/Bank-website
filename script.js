const loginLink = document.querySelector(".login-link");
const loginModal = document.querySelector(".login-modal");
const closeModal = document.querySelector(".close-modal");
const passwordInput = document.querySelector("#password");
const togglePassword = document.querySelector(".toggle-password");
const registerBtn = document.querySelector(".open-register");
const registerModal = document.querySelector(".register-modal");
const closeRegister = document.querySelector(".close-register");
const createAccountBtn = document.querySelector(".create-account-btn");
const registerName = document.querySelector("#register-name");
const registerEmail = document.querySelector("#register-email");
const registerPassword = document.querySelector("#register-password");
const confirmPassword = document.querySelector("#confirm-password");

registerModal.addEventListener("click", (event) => {
  if (event.target === registerModal) {
    registerModal.classList.remove("open");
  }
  
})


closeRegister.addEventListener("click", () => {
  registerModal.classList.remove("open");
  loginModal.classList.add("open");
})


registerBtn.addEventListener("click", () => {
  loginModal.classList.remove("open")
  registerModal.classList.add("open");
})

loginLink.addEventListener("click", (event) => {
  event.preventDefault();
  loginModal.classList.add("open");
});

loginModal.addEventListener("click", (event) => {
  if (event.target === loginModal) {
    loginModal.classList.remove("open");
  }
});

closeModal.addEventListener("click", () => {
  loginModal.classList.remove("open");
});

togglePassword.addEventListener("click", () => {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    togglePassword.textContent = "Hide";
} else {
  passwordInput.type = "password";
  togglePassword.textContent = "Show";
}
});

function validateRegister() {
  if (registerName.value.trim() === "") {
    return "Please enter your name";
  }

  if (!emailPattern.test(registerEmail.value.trim())) {
    return "Please enter a valid email";
  }

  if (registerPassword.value.length < 6) {
    return "Password must be at least 6 characters";
  }

  if (registerPassword.value !== confirmPassword.value) {
    return "Passwords do not match";
  }

  return null;
}


createAccountBtn.addEventListener("click", () => {
  const error = validateRegister();

  if (error) {
    console.log(error);
    return;
  }

  console.log("Create account");
});
