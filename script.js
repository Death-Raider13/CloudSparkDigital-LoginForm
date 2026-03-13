// ═══════════════════════════════════════════════════════════════
// CLOUDSPARK DIGITAL - AUTHENTICATION SYSTEM
// Premium user experience with elegant interactions
// ═══════════════════════════════════════════════════════════════

// DOM Elements - Tabs
const tabLogin = document.getElementById('tabLogin');
const tabRegister = document.getElementById('tabRegister');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

// DOM Elements - Login
const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');
const loginEmailError = document.getElementById('loginEmailError');
const loginPasswordError = document.getElementById('loginPasswordError');
const loginMessage = document.getElementById('loginMessage');
const toggleLoginPassword = document.getElementById('toggleLoginPassword');
const rememberMe = document.getElementById('rememberMe');

// DOM Elements - Register
const regName = document.getElementById('regName');
const regEmail = document.getElementById('regEmail');
const regPassword = document.getElementById('regPassword');
const regConfirmPassword = document.getElementById('regConfirmPassword');
const regNameError = document.getElementById('regNameError');
const regEmailError = document.getElementById('regEmailError');
const regPasswordError = document.getElementById('regPasswordError');
const regConfirmPasswordError = document.getElementById('regConfirmPasswordError');
const registerMessage = document.getElementById('registerMessage');
const toggleRegPassword = document.getElementById('toggleRegPassword');
const toggleRegConfirmPassword = document.getElementById('toggleRegConfirmPassword');
const agreeTerms = document.getElementById('agreeTerms');
const strengthIndicator = document.getElementById('strengthIndicator');

// ═══════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function calculatePasswordStrength(password) {
  let strength = 0;
  
  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[^a-zA-Z0-9]/.test(password)) strength++;
  
  if (strength <= 2) return 'weak';
  if (strength <= 4) return 'medium';
  return 'strong';
}

function showFieldError(input, errorElement, message) {
  input.classList.add('error');
  errorElement.textContent = message;
}

function clearFieldError(input, errorElement) {
  input.classList.remove('error');
  errorElement.textContent = '';
}

function showMessage(messageElement, text, type) {
  messageElement.textContent = text;
  messageElement.className = `form-message show ${type}`;
}

function hideMessage(messageElement) {
  messageElement.className = 'form-message';
}

// ═══════════════════════════════════════════════════════════════
// TAB SWITCHING
// ═══════════════════════════════════════════════════════════════

function switchTab(tab) {
  const isLogin = tab === 'login';
  
  // Update tab buttons
  tabLogin.classList.toggle('active', isLogin);
  tabRegister.classList.toggle('active', !isLogin);
  
  // Update forms
  loginForm.classList.toggle('active', isLogin);
  registerForm.classList.toggle('active', !isLogin);
  
  // Clear messages and errors
  hideMessage(loginMessage);
  hideMessage(registerMessage);
  clearAllErrors();
}

function clearAllErrors() {
  // Login
  clearFieldError(loginEmail, loginEmailError);
  clearFieldError(loginPassword, loginPasswordError);
  
  // Register
  clearFieldError(regName, regNameError);
  clearFieldError(regEmail, regEmailError);
  clearFieldError(regPassword, regPasswordError);
  clearFieldError(regConfirmPassword, regConfirmPasswordError);
}

tabLogin.addEventListener('click', () => switchTab('login'));
tabRegister.addEventListener('click', () => switchTab('register'));

// ═══════════════════════════════════════════════════════════════
// PASSWORD VISIBILITY TOGGLE
// ═══════════════════════════════════════════════════════════════

function togglePasswordVisibility(input, button) {
  const iconShow = button.querySelector('.icon-show');
  const iconHide = button.querySelector('.icon-hide');
  
  if (input.type === 'password') {
    input.type = 'text';
    iconShow.style.display = 'none';
    iconHide.style.display = 'block';
  } else {
    input.type = 'password';
    iconShow.style.display = 'block';
    iconHide.style.display = 'none';
  }
}

toggleLoginPassword.addEventListener('click', () => {
  togglePasswordVisibility(loginPassword, toggleLoginPassword);
});

toggleRegPassword.addEventListener('click', () => {
  togglePasswordVisibility(regPassword, toggleRegPassword);
});

toggleRegConfirmPassword.addEventListener('click', () => {
  togglePasswordVisibility(regConfirmPassword, toggleRegConfirmPassword);
});

// ═══════════════════════════════════════════════════════════════
// PASSWORD STRENGTH INDICATOR
// ═══════════════════════════════════════════════════════════════

regPassword.addEventListener('input', () => {
  const password = regPassword.value;
  
  if (password.length === 0) {
    strengthIndicator.classList.remove('show', 'weak', 'medium', 'strong');
    return;
  }
  
  const strength = calculatePasswordStrength(password);
  const strengthLabel = strengthIndicator.querySelector('.strength-label');
  
  // Update classes
  strengthIndicator.className = `strength-indicator show ${strength}`;
  
  // Update label text
  const labels = {
    weak: 'Weak Password',
    medium: 'Medium Strength',
    strong: 'Strong Password'
  };
  strengthLabel.textContent = labels[strength];
});

// ═══════════════════════════════════════════════════════════════
// REAL-TIME VALIDATION
// ═══════════════════════════════════════════════════════════════

// Login Email
loginEmail.addEventListener('blur', () => {
  const email = loginEmail.value.trim();
  if (email && !isValidEmail(email)) {
    showFieldError(loginEmail, loginEmailError, 'Please enter a valid email address');
  }
});

loginEmail.addEventListener('input', () => {
  if (loginEmailError.textContent) {
    clearFieldError(loginEmail, loginEmailError);
  }
});

// Login Password
loginPassword.addEventListener('input', () => {
  if (loginPasswordError.textContent) {
    clearFieldError(loginPassword, loginPasswordError);
  }
});

// Register Name
regName.addEventListener('input', () => {
  if (regNameError.textContent) {
    clearFieldError(regName, regNameError);
  }
});

// Register Email
regEmail.addEventListener('blur', () => {
  const email = regEmail.value.trim();
  if (email && !isValidEmail(email)) {
    showFieldError(regEmail, regEmailError, 'Please enter a valid email address');
  }
});

regEmail.addEventListener('input', () => {
  if (regEmailError.textContent) {
    clearFieldError(regEmail, regEmailError);
  }
});

// Register Password
regPassword.addEventListener('input', () => {
  if (regPasswordError.textContent) {
    clearFieldError(regPassword, regPasswordError);
  }
  
  // Check confirm password match
  const confirmPassword = regConfirmPassword.value;
  if (confirmPassword && confirmPassword !== regPassword.value) {
    showFieldError(regConfirmPassword, regConfirmPasswordError, 'Passwords do not match');
  } else if (confirmPassword) {
    clearFieldError(regConfirmPassword, regConfirmPasswordError);
  }
});

// Register Confirm Password
regConfirmPassword.addEventListener('input', () => {
  const password = regPassword.value;
  const confirmPassword = regConfirmPassword.value;
  
  if (confirmPassword && confirmPassword !== password) {
    showFieldError(regConfirmPassword, regConfirmPasswordError, 'Passwords do not match');
  } else {
    clearFieldError(regConfirmPassword, regConfirmPasswordError);
  }
});

// ═══════════════════════════════════════════════════════════════
// LOGIN FORM SUBMISSION
// ═══════════════════════════════════════════════════════════════

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  hideMessage(loginMessage);
  
  const email = loginEmail.value.trim();
  const password = loginPassword.value.trim();
  
  let isValid = true;
  
  // Validate email
  if (!email) {
    showFieldError(loginEmail, loginEmailError, 'Email is required');
    isValid = false;
  } else if (!isValidEmail(email)) {
    showFieldError(loginEmail, loginEmailError, 'Please enter a valid email address');
    isValid = false;
  } else {
    clearFieldError(loginEmail, loginEmailError);
  }
  
  // Validate password
  if (!password) {
    showFieldError(loginPassword, loginPasswordError, 'Password is required');
    isValid = false;
  } else if (password.length < 6) {
    showFieldError(loginPassword, loginPasswordError, 'Password must be at least 6 characters');
    isValid = false;
  } else {
    clearFieldError(loginPassword, loginPasswordError);
  }
  
  if (!isValid) return;
  
  // Show loading state
  const submitBtn = loginForm.querySelector('.submit-button');
  submitBtn.classList.add('loading');
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1800));
  
  // Remove loading state
  submitBtn.classList.remove('loading');
  
  // Show success message
  showMessage(loginMessage, '✓ Authentication successful! Redirecting to your dashboard...', 'success');
  
  // Store remember me preference
  if (rememberMe.checked) {
    localStorage.setItem('rememberMe', 'true');
    localStorage.setItem('userEmail', email);
  } else {
    localStorage.removeItem('rememberMe');
    localStorage.removeItem('userEmail');
  }
  
  // Simulate redirect
  setTimeout(() => {
    console.log('Redirecting to dashboard...');
    // window.location.href = '/dashboard';
  }, 1500);
});

// ═══════════════════════════════════════════════════════════════
// REGISTER FORM SUBMISSION
// ═══════════════════════════════════════════════════════════════

registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  hideMessage(registerMessage);
  
  const name = regName.value.trim();
  const email = regEmail.value.trim();
  const password = regPassword.value.trim();
  const confirmPassword = regConfirmPassword.value.trim();
  
  let isValid = true;
  
  // Validate name
  if (!name) {
    showFieldError(regName, regNameError, 'Full name is required');
    isValid = false;
  } else if (name.length < 2) {
    showFieldError(regName, regNameError, 'Name must be at least 2 characters');
    isValid = false;
  } else {
    clearFieldError(regName, regNameError);
  }
  
  // Validate email
  if (!email) {
    showFieldError(regEmail, regEmailError, 'Email is required');
    isValid = false;
  } else if (!isValidEmail(email)) {
    showFieldError(regEmail, regEmailError, 'Please enter a valid email address');
    isValid = false;
  } else {
    clearFieldError(regEmail, regEmailError);
  }
  
  // Validate password
  if (!password) {
    showFieldError(regPassword, regPasswordError, 'Password is required');
    isValid = false;
  } else if (password.length < 6) {
    showFieldError(regPassword, regPasswordError, 'Password must be at least 6 characters');
    isValid = false;
  } else {
    clearFieldError(regPassword, regPasswordError);
  }
  
  // Validate confirm password
  if (!confirmPassword) {
    showFieldError(regConfirmPassword, regConfirmPasswordError, 'Please confirm your password');
    isValid = false;
  } else if (confirmPassword !== password) {
    showFieldError(regConfirmPassword, regConfirmPasswordError, 'Passwords do not match');
    isValid = false;
  } else {
    clearFieldError(regConfirmPassword, regConfirmPasswordError);
  }
  
  // Check terms agreement
  if (!agreeTerms.checked) {
    showMessage(registerMessage, 'Please agree to the Terms & Conditions to continue', 'error');
    isValid = false;
  }
  
  if (!isValid) return;
  
  // Show loading state
  const submitBtn = registerForm.querySelector('.submit-button');
  submitBtn.classList.add('loading');
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 2200));
  
  // Remove loading state
  submitBtn.classList.remove('loading');
  
  // Show success message
  showMessage(registerMessage, '✓ Account created successfully! Switching to login...', 'success');
  
  // Clear form
  registerForm.reset();
  strengthIndicator.classList.remove('show', 'weak', 'medium', 'strong');
  
  // Switch to login after success
  setTimeout(() => {
    switchTab('login');
    loginEmail.value = email;
    showMessage(loginMessage, 'Welcome! Your account has been created. Please sign in to continue.', 'success');
  }, 2000);
});

// ═══════════════════════════════════════════════════════════════
// LOAD SAVED PREFERENCES
// ═══════════════════════════════════════════════════════════════

window.addEventListener('DOMContentLoaded', () => {
  // Check for saved email
  if (localStorage.getItem('rememberMe') === 'true') {
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) {
      loginEmail.value = savedEmail;
      rememberMe.checked = true;
    }
  }
  
  // Add smooth scroll behavior
  document.documentElement.style.scrollBehavior = 'smooth';
});

// ═══════════════════════════════════════════════════════════════
// PREVENT LINK DEFAULT BEHAVIOR (FOR DEMO)
// ═══════════════════════════════════════════════════════════════

document.querySelectorAll('a[href="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
  });
});
