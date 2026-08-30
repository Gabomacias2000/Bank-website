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
const transferSection = document.querySelector(".transfer-section");
const backToActions = document.querySelector(".back-to-actions");
const transferAction = document.querySelector(".transfer-action");
const bankActions = document.querySelector(".bank-actions");
const loginText = document.querySelector(".login-text");
const transferAccount = document.getElementById("deposit-account");
const transferForm = document.querySelector(".transfer-form");
const transferName = document.getElementById("deposit-name");
const transferLastName = document.getElementById("deposit-last-name");
const transferAccountNumber = document.getElementById("deposit-account-number");
const recipientTransferError = document.getElementById("deposit-recipient-error");
const transferAmount = document.getElementById("deposit-amount");
const transferAmountError = document.getElementById("deposit-amount-error");
const transferMessage = document.getElementById("deposit-success");

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
  document.body.classList.toggle("logged-in", Boolean(currentUser));
}

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const users = JSON.parse(localStorage.getItem("users")) ?? [];
  const foundUser = users.find((user) => user.email.toLowerCase() === email.value.trim().toLowerCase());

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

  localStorage.setItem("currentUser", JSON.stringify(foundUser));
  clearLoginForm();
  loginModal.classList.remove("open");
  updateNavbar();
  updatePage();
});

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("currentUser");
  transferSection.style.display = "none";
  bankActions.style.display = "";
  updateNavbar();
  updateLoginModal();
  updatePage();
});

function validateRegister(users) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (registerName.value.trim() === "") return { field: "name", message: "Please enter your name" };
  if (registerLastName.value.trim() === "") return { field: "last-name", message: "Please enter your last name" };
  if (!emailPattern.test(registerEmail.value.trim())) return { field: "email", message: "Please enter a valid email" };

  const emailExist = users.some((user) => user.email.toLowerCase() === registerEmail.value.trim().toLowerCase());
  if (emailExist) return { field: "email", message: "Email already in the system" };
  if (registerPassword.value.length < 6) return { field: "password", message: "Password must be at least 6 characters" };
  if (registerPassword.value !== confirmPassword.value) return { field: "password-confirmation", message: "Passwords do not match" };
  return null;
}

function cleanRegisterForm() {
  registerForm.reset();
  document.querySelectorAll(".register-box .input-error").forEach((error) => error.classList.remove("show"));
}

function hideRegisterErrors() {
  document.querySelectorAll(".register-box .input-error").forEach((error) => error.classList.remove("show"));
}

function generateAccountNumber() {
  return Math.floor(1000000000 + Math.random() * 9000000000);
}

function generateUniqueAccountNumber(users) {
  let number;
  do {
    number = generateAccountNumber();
  } while (users.some((user) => user.accounts?.some((account) => account.number === number)));
  return number;
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
    accounts: [
      { type: "Checking", number: generateUniqueAccountNumber(users), balance: 1000 },
      { type: "Savings", number: generateUniqueAccountNumber(users), balance: 0 }
    ],
    transactions: []
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
});

function showBankActions() {
  transferSection.style.display = "none";
  bankActions.style.display = "block";
}

backToActions.addEventListener("click", showBankActions);

transferAction.addEventListener("click", () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser?.accounts) return;

  bankActions.style.display = "none";
  transferSection.style.display = "block";

  transferAccount.innerHTML = '<option value="">Choose an account</option>';
  currentUser.accounts.forEach((account) => {
    const option = document.createElement("option");
    option.value = account.number;
    option.textContent = `${account.type} ${account.number}`;
    transferAccount.appendChild(option);
  });
});

transferForm.addEventListener("submit", (event) => {
  event.preventDefault();
  recipientTransferError.classList.remove("show");
  transferAmountError.classList.remove("show");
  transferMessage.classList.remove("show");

  const users = JSON.parse(localStorage.getItem("users")) ?? [];
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const amount = Number(transferAmount.value.trim());
  const sourceAccountNumber = Number(transferAccount.value);
  const recipientAccountNumber = Number(transferAccountNumber.value.trim());

  const senderUser = users.find((user) => user.email === currentUser?.email);
  const senderAccount = senderUser?.accounts.find((account) => account.number === sourceAccountNumber);

  if (!senderAccount) {
    transferAmountError.textContent = "Please choose an account";
    transferAmountError.classList.add("show");
    return;
  }

  const recipientUser = users.find((user) => {
    const hasAccount = user.accounts?.some((account) => account.number === recipientAccountNumber);
    return user.name.toLowerCase() === transferName.value.trim().toLowerCase() &&
      user.lastName.toLowerCase() === transferLastName.value.trim().toLowerCase() && hasAccount;
  });

  if (!recipientUser) {
    recipientTransferError.textContent = "No matching recipient found";
    recipientTransferError.classList.add("show");
    return;
  }

  const recipientAccount = recipientUser.accounts.find((account) => account.number === recipientAccountNumber);

  if (senderUser.email === recipientUser.email && senderAccount.number === recipientAccount.number) {
    recipientTransferError.textContent = "You cannot transfer money to the same account";
    recipientTransferError.classList.add("show");
    return;
  }
  if (Number.isNaN(amount) || amount <= 0) {
    transferAmountError.textContent = "The amount has to be more than 0";
    transferAmountError.classList.add("show");
    return;
  }
  if (amount > senderAccount.balance) {
    transferAmountError.textContent = "Not enough funds";
    transferAmountError.classList.add("show");
    return;
  }

  senderAccount.balance -= amount;
  recipientAccount.balance += amount;

  const timestamp = new Date().toISOString();
  senderUser.transactions ??= [];
  recipientUser.transactions ??= [];
  senderUser.transactions.push({ type: "transfer-out", accountNumber: senderAccount.number, otherAccountNumber: recipientAccount.number, amount, date: timestamp });
  recipientUser.transactions.push({ type: "transfer-in", accountNumber: recipientAccount.number, otherAccountNumber: senderAccount.number, amount, date: timestamp });

  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("currentUser", JSON.stringify(senderUser));

  transferMessage.textContent = "Transaction successful!";
  transferMessage.classList.add("show");
  transferForm.reset();
  setTimeout(() => transferMessage.classList.remove("show"), 3000);
});

updateNavbar();
updatePage();
