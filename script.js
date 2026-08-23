const loginLink = document.querySelector(".login-link");
const loginModal = document.querySelector(".login-modal");
const closeModal = document.querySelector(".close-modal");
const passwordInput = document.querySelector("#password");
const togglePassword = document.querySelector(".toggle-password");
const registerBtn = document.querySelector(".open-register");
const registerModal = document.querySelector(".register-modal");
const closeRegister = document.querySelector(".close-register");
const registerName = document.querySelector("#register-name");
const registerEmail = document.querySelector("#register-email");
const registerPassword = document.querySelector("#register-password");
const confirmPassword = document.querySelector("#confirm-password");
const registerForm = document.querySelector("#register-form");
const email = document.getElementById("email");
const loginForm = document.querySelector(".login-box");
const loginEmailError = document.getElementById("login-email-error");
const loginPasswordError = document.getElementById("login-password-error");
const logoutBtn = document.querySelector(".logout-btn");
const loginContent = document.querySelector(".login-content");
const accountContent = document.querySelector(".account-content");
const accountGreeting = document.querySelector(".account-greeting");

registerModal.addEventListener("click", (event) => {
  if (event.target === registerModal) {
    registerModal.classList.remove("open");
    hideRegisterErrors();
  }
  
})


closeRegister.addEventListener("click", () => {
  registerModal.classList.remove("open");
  cleanRegisterForm();
  loginModal.classList.add("open");
})


registerBtn.addEventListener("click", () => {
  loginModal.classList.remove("open")
  registerModal.classList.add("open");
})

function updateNavbar() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (currentUser) {
    loginLink.textContent = `Hi, ${currentUser.name}`;
    logoutBtn.style.display = "block";

  } else {
    loginLink.textContent = "Login";
    logoutBtn.style.display = "none";
  }
}

function updateLoginModal() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (currentUser) {
    loginContent.style.display = "none";
    accountContent.style.display = "block";

    accountGreeting.textContent = `Hi, ${currentUser.name}`;
  } else {
    loginContent.style.display = "block";
    accountContent.style.display = "none";
  }
}

loginLink.addEventListener("click", (event) => {
  event.preventDefault();
  updateLoginModal();
  loginModal.classList.add("open");
 
});

loginModal.addEventListener("click", (event) => {
  if (event.target === loginModal) {
    loginModal.classList.remove("open");
    clearLoginForm();
  }
});

closeModal.addEventListener("click", () => {
  loginModal.classList.remove("open");
  clearLoginForm();
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

function clearLoginForm() {
  email.value = "";
  passwordInput.value = "";
  loginEmailError.classList.remove("show");
  loginPasswordError.classList.remove("show");
}

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const users = JSON.parse(localStorage.getItem("users")) ?? []; 

  const foundUser = users.find((user) => {
  return user.email.toLowerCase() === email.value.trim().toLowerCase();
  });

  if (!foundUser) {
   loginEmailError.textContent = "Email not found";
   loginEmailError.classList.add("show");
   return;
  }

  if (foundUser.password !== passwordInput.value) {
    loginPasswordError.textContent = "Incorrect Password";
    loginPasswordError.classList.add("show");
    return;
  }
   console.log("Login successful!");
   localStorage.setItem("currentUser", JSON.stringify(foundUser));
   clearLoginForm();
   loginModal.classList.remove("open");
   updateNavbar();
  
   
});

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("currentUser");

  updateNavbar();
  updateLoginModal();
});


function validateRegister(users) {
 const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (registerName.value.trim() === "") {
    return {field: "name",
            message: "Please enter your name"
           };
  }

  if (!emailPattern.test(registerEmail.value.trim())) {
    return {field: "email",
            message: "Please enter a valid email"
           };
  }

  const emailExist = users.some((user) => {
    return user.email.toLowerCase() === registerEmail.value.trim().toLowerCase();
  });

   if (emailExist) {
    return { field: "email",
             message: "Email already in the system"
            };
}
  if (registerPassword.value.length < 6) {
    return {field: "password",
            message: "Password must be at least 6 characters"
          };
  }

  if (registerPassword.value !== confirmPassword.value) {
    return { field: "password-confirmation",
             message: "Passwords do not match"
           };
  }

  return null;
}

function cleanRegisterForm() {
    registerForm.reset();

    const errors = document.querySelectorAll(".input-error");
  errors.forEach((error)=> {
    error.classList.remove("show");
  });
}

function hideRegisterErrors() {
  const errors = document.querySelectorAll(".register-box .input-error");
  errors.forEach((error)=> {
    error.classList.remove("show");
  });
}
 

registerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  

  const users = JSON.parse(localStorage.getItem("users")) ?? []; 

  hideRegisterErrors();

  const error = validateRegister(users);

  if (error) {
    const errorElement = document.getElementById(`${error.field}-error`);
    errorElement.textContent = error.message;
    errorElement.classList.add("show");
    return;
  }
 
  const newUser = {
  name: registerName.value.trim(),
  email: registerEmail.value.trim(),
  password: registerPassword.value
};
  
  
  
  users.push(newUser);

  localStorage.setItem("users", JSON.stringify(users));
  
  cleanRegisterForm();

  
  

  console.log(users);
  
});


