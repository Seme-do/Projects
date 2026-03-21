function showSettings(section, clickedItem) {
  // Hide all sections
  document.querySelectorAll('.settings-section').forEach(s => {
    s.style.display = 'none';
  });

  // Show clicked section
  document.getElementById(section).style.display = 'block';

  // Remove active from all menu items
  document.querySelectorAll('.settings-menu-item').forEach(item => {
    item.classList.remove('active');
  });

  // Add active to clicked item
  clickedItem.classList.add('active');
}
// Toggle Edit mode
function toggleEdit() {
  const inputs = document.querySelectorAll('#account .profile-fields input');
  inputs.forEach(input => input.disabled = false);
  document.querySelector('.edit-btn').style.display = 'none';
  document.getElementById('save-btn').style.display = 'flex';
  document.getElementById('cancel-btn').style.display = 'flex';
}

// Cancel Edit
function cancelEdit() {
  const inputs = document.querySelectorAll('#account .profile-fields input');
  inputs.forEach(input => input.disabled = true);
  document.querySelector('.edit-btn').style.display = 'flex';
  document.getElementById('save-btn').style.display = 'none';
  document.getElementById('cancel-btn').style.display = 'none';
}

// Save Profile
function saveProfile() {
  const name = document.getElementById('admin-fullname').value;
  localStorage.setItem('adminName', name);
  cancelEdit();
  alert('Profile saved successfully!');
}

// Change profile photo
document.getElementById('settings-photo-upload').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      document.getElementById('settings-photo').src = event.target.result;
      localStorage.setItem('adminPhoto', event.target.result);
    };
    reader.readAsDataURL(file);
  }
});