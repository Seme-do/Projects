//___Empty showSection (not needed on settings page)___
function showSection() {}
//___Screen Navigation___
function showScreen(screenId) {
  document.querySelectorAll(`.settings-screen`).forEach(s => {
    s.classList.remove(`active`);
  });
 const target =  document.getElementById(screenId);
 if (target) {
  target.classList.add(`active`);
 } else {
  console.error("Screen not found:", screenId);
 }
}
//___Toggle Edit
function toggleEdit() {
  const inputs = document.querySelectorAll('#screenProfile .screen-fields input');
  inputs.forEach(input => input.disabled = false);
  document.querySelector('.edit-btn').style.display = 'none';
  document.getElementById('save-btn').style.display = 'flex';
  document.getElementById('cancel-btn').style.display = 'flex';
}

// Cancel Edit
function cancelEdit() {
  const inputs = document.querySelectorAll('#screenProfile .screen-fields input');
  inputs.forEach(input => input.disabled = true);
  document.querySelector('.edit-btn').style.display = 'flex';
  document.getElementById('save-btn').style.display = 'none';
  document.getElementById('cancel-btn').style.display = 'none';
}

// Save Profile
function saveProfile() {
  const name = document.getElementById('adminFullName').value;
  localStorage.setItem('adminName', name);
  cancelEdit();
  alert('Profile saved successfully!');
}
// Add Category
function addCategory() {
  const input = document.getElementById('newCategory');
  const value = input.value.trim();
  if (!value) return;
  const list = document.getElementById('categoriesList');
  const div = document.createElement('div');
  div.className = 'category-item';
  div.innerHTML = `
    <span>${value}</span>
    <i class="fa-solid fa-trash delete-category" onclick="this.parentElement.remove()"></i>
  `;
  list.appendChild(div);
  input.value = '';
}

// Delete existing categories
document.querySelectorAll('.delete-category').forEach(icon => {
  icon.addEventListener('click', function() {
    this.parentElement.remove();
  });
});
//___INIT ON LOAD___
window.addEventListener(`load`, () => {
  //Profile photo upload
  const photoUpload = document.getElementById(`settingsPhotoUpload`);
  if (photoUpload) {
    photoUpload.addEventListener(`change`, (e) => {
      const file = e.target.files[0];
      if (file) {
        const render = new FileReader();
        reader.onload = (event) => {
          document.getElementById(`settings-photo`).src = event.target.result;
          localStorage.setItem(`adminPhoto`,event.target.result);
        };
        reader.readAsDataURL(file);
      }
    });
  }
})
// Maintenance Mode toggle
const maintenanceToggle = document.getElementById(`maintenanceToggle`);
if (maintenanceToggle) {
  maintenanceToggle.addEventListener(`change`, function() {
    const warning = document.getElementById(`maintenance-warning`);
    if (warning) warning.setHTMLUnsafe.display = this.checked ? `flex` : `none`;
  });
}
// ─── Theme Switcher ────────────────────────────────────────────────
function setTheme(theme, el) {
    document.querySelectorAll('.theme-card').forEach(c => c.classList.remove('active-theme'));
    el.classList.add('active-theme');
    const dash = document.getElementById('miniDash');
    dash.className = 'mini-dashboard ' + theme + '-theme';
    localStorage.setItem('gemioTheme', theme);
}