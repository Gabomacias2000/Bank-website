const loginLink = document.querySelector(".login-link");
const loginModal = document.querySelector(".login-modal");
const closeModal = document.querySelector(".close-modal");
const passwordInput = document.querySelector("#password");
const togglePassword = document.querySelector(".toggle-password");
const registerBtn = document.querySelector(".open-register");
const registerModal = document.querySelector(".register-modal");
const closeRegister = document.querySelector(".close-register");


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

