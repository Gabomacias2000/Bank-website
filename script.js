const loginLink = document.querySelector(".login-link");
const loginModal = document.querySelector(".login-modal");
const closeModal = document.querySelector(".close-modal");
const passwordInput = document.querySelector("#password");
const togglePassword = document.querySelector(".toggle-password");
const registerBtn = document.querySelector(".open-register");
const registerModal = document.querySelector(".register-modal");
const closeRegister = document.querySelector(".close-register");
const registerName = document.querySelector("#register-name");
const registerLastName = document.querySelector("#register-last-name");
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
const registerSuccess = document.getElementById("register-success");
const depositSection = document.querySelector(".deposit-section");
const backToActions = document.querySelector(".back-to-actions");
const depositAction = document.querySelector(".deposit-action");
const bankActions = document.querySelector(".bank-actions");
const loginText = document.querySelector(".login-text");
const depositAccount = document.getElementById("deposit-account");
const depositForm = document.querySelector(".deposit-form");
const depositName = document.getElementById("deposit-name");
const depositLastName = document.getElementById("deposit-last-name");
const depositAccountNumber = document.getElementById("deposit-account-number");
const recipientDepositError = document.getElementById("deposit-recipient-error");
const depositAmount = document.getElementById("deposit-amount");
const senderAmountError = document.getElementById("deposit-amount-error");
const depositMessage = document.getElementById("deposit-success");

registerModal.addEventListener("click", (event) => {
  if (event.target === registerModal) {
    registerModal.classList.remove("open");
    hideRegisterErrors();
  }
});

closeRegister.addEventListener("click", () => {
  registerModal.classList.remove("open");
  cleanRegisterForm();
  loginModal.classList.add("open");
});


registerBtn.addEventListener("click", () => {
  loginModal.classList.remove("open");
  registerModal.classList.add("open");
});

function updateNavbar() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (currentUser) {
    loginText.textContent = `Hi, ${currentUser.name}`;
    logoutBtn.style.display = "block";
  } else {
    loginText.textContent = "Login";
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
    loginContent.style.display = "flex";
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

function updatePage() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (currentUser) {
    document.body.classList.add("logged-in");
  } else {
    document.body.classList.remove("logged-in");
  }
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
  updatePage();
});

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("currentUser");
 
  depositSection.style.display = "none";
  bankActions.style.display = "";

  updateNavbar();
  updateLoginModal();
  updatePage();
  
});

function validateRegister(users) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (registerName.value.trim() === "") {
    return {
      field: "name",
      message: "Please enter your name"
    };
  }

  if (!emailPattern.test(registerEmail.value.trim())) {
    return {
      field: "email",
      message: "Please enter a valid email"
    };
  }

  const emailExist = users.some((user) => {
    return user.email.toLowerCase() === registerEmail.value.trim().toLowerCase();
  });

  if (emailExist) {
    return {
      field: "email",
      message: "Email already in the system"
    };
  }

  if (registerPassword.value.length < 6) {
    return {
      field: "password",
      message: "Password must be at least 6 characters"
    };
  }

  if (registerPassword.value !== confirmPassword.value) {
    return {
      field: "password-confirmation",
      message: "Passwords do not match"
    };
  }

  return null;
}

function cleanRegisterForm() {
  registerForm.reset();

    const errors = document.querySelectorAll(".register-box .input-error");
  errors.forEach((error)=> {
    error.classList.remove("show");
  });
}

function hideRegisterErrors() {
  const errors = document.querySelectorAll(".register-box .input-error");
  errors.forEach((error) => {
    error.classList.remove("show");
  });
}

function generateAccountNumber() {
  return Math.floor(
    1000000000 + Math.random() * 9000000000
  );
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
  lastName: registerLastName.value.trim(),
  email: registerEmail.value.trim(),
  password: registerPassword.value,
  accountNumber: generateAccountNumber(),

  accounts : [
    {
      type: "Cheking",
      number: generateAccountNumber(),
      balance : 1000
    },

    {
      type: "Savings",
      number: generateAccountNumber(),
      balance : 0
    }

  ],

  transactions : []
};
  
  
  
  users.push(newUser);

  localStorage.setItem("users", JSON.stringify(users));
  registerSuccess.textContent = "Your account has been created successfully!";
  registerSuccess.classList.add("show");

  setTimeout(() => {
    registerModal.classList.remove("open");
    loginModal.classList.add("open");

    cleanRegisterForm();
    registerSuccess.classList.remove("show");
  }, 1500);

  console.log(users);
});

function showBankActions() {
  depositSection.style.display = "none";
  bankActions.style.display = "block";
}

backToActions.addEventListener("click", () => {
  showBankActions();
});


depositAction.addEventListener("click", () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser")
);

  bankActions.style.display = "none";
  depositSection.style.display = "block";

  currentUser.accounts.forEach((account) => {
  
    const option = document.createElement("option");
      option.value = account.number;
      option.textContent = `${account.type} ${account.number
      .toString()}`;

     depositAccount.appendChild(option);
    
  });
});

depositForm.addEventListener("submit", (event) => {
  event.preventDefault();
  recipientDepositError.classList.remove("show");
  senderAmountError.classList.remove("show");
  depositMessage.classList.remove("show");

  const users = JSON.parse(localStorage.getItem("users"));
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));


  const recipientUser = users.find((user) => {
    const checkAccount = user.accounts.some((account) => {
  return account.number === Number(depositAccountNumber.value.trim());
});
  return user.name === depositName.value.trim() && user.lastName === depositLastName.value.trim() && checkAccount;
});
 
if (!recipientUser) {
     recipientDepositError.textContent = "No data found in the system";
     recipientDepositError.classList.add("show");
     return;
  }
  
  const amount = Number(depositAmount.value.trim());
  const senderAccount = currentUser.accounts.find((account) => {
    return Number(depositAccount.value) === account.number
  });

  const recipientAccount = recipientUser.accounts.find((account) => {
      return account.number ===  Number(depositAccountNumber.value.trim());
      })

    if (recipientAccount.number === senderAccount.number) {
      recipientDepositError.textContent = "You cannot transfer money to the same account";
      recipientDepositError.classList.add("show");
       return;
    }
    if (Number.isNaN(amount) || amount <= 0) {
      senderAmountError.textContent = "The amount has to be more than 0";
      senderAmountError.classList.add("show");
      return;
    }
    if (amount > senderAccount.balance) {
      senderAmountError.textContent = "Not enough funds";
      senderAmountError.classList.add("show");
      return;
    } 

      

      senderAccount.balance -= amount;
      recipientAccount.balance += amount;

      const senderUser = users.find((user) => {
      return user.email === currentUser.email;
});
    if (!senderUser) {
      return;
    }
      
      const senderUserAccount = senderUser.accounts.find((account) => {
      return senderAccount.number === account.number;
});
    if (!senderUserAccount) {
     return;
}
      senderUserAccount.balance -= amount;
      
      depositMessage.textContent = "Transaction successful!";
      depositMessage.classList.add("show");
      setTimeout(() => {
      depositMessage.classList.remove("show");
      }, 3000);
      depositForm.reset();

      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    
});


backToActions.addEventListener("click", () => {
  depositSection.style.display = "none";
  bankActions.style.display = "block";
});

updateNavbar();
updatePage();
