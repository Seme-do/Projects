function logout() {
    localStorage.removeItem(`isLoggedIn`);
    localStorage.removeItem(`userEmail`);
    window.location.href=`index.html`;
}