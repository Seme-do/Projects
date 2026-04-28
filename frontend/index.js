// If already logged in, go straight to dashboard
if (localStorage.getItem(`isLoggedIn`) === `true`) {
  window.location.href=`Dashboard.html`;
}
//wherever your log out button is in the dashboard
function logout() {
  localStorage.removeItem(`isLoggedIn`);
  localStorage.removeItem(`userEmail`);
  window.location.href=`index.html`;
}
  const ALLOWED_EMAILS = [
    'omondijoel656@gmail.com',
    'nben6755@gmail.com',
    'sammsonic3@gmail.com',
    'admin4@gemio.app'
  ];

  function handleEmailLogin() {
    const email = document.querySelector('.email-input').value.trim().toLowerCase();
    
    if (email === '') {
      showError('Please enter your email address.');
      return;
    }
  //Save login state
  localStorage.setItem(`isLoggedIn`, `true`);
  localStorage.setItem(`userEmail`, email);
  window.location.href=`Dashboard.html`;
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
