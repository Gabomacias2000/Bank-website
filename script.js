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
const registerForm = document.querySelector("#register-form");
const email = document.getElementById("email");
const loginForm = document.querySelector(".login-box");


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

loginLink.addEventListener("click", (event) => {
  event.preventDefault(); 
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

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  
})


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
  const errors = document.querySelectorAll(".input-error");
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


