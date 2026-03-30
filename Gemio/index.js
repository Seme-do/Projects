
  const ALLOWED_EMAILS = [
    'omondijoel656@gmail.com',
    'admin2@gemio.app',
    'admin3@gemio.app',
    'admin4@gemio.app'
  ];

  function handleEmailLogin() {
    const email = document.querySelector('.email-input').value.trim().toLowerCase();
    
    if (email === '') {
      showError('Please enter your email address.');
      return;
    }

    if (!ALLOWED_EMAILS.includes(email)) {
      showError('Access denied. This email is not authorized.');
      return;
    }

    window.location.href = 'Dashboard.html';
  }

  function showError(message) {
    const existing = document.querySelector('.error-msg');
    if (existing) existing.remove();

    const error = document.createElement('p');
    error.className = 'error-msg';
    error.textContent = message;
    document.querySelector('.email-option').appendChild(error);
  }
