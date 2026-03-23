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

// Maintenance Mode toggle
document.getElementById('maintenance-toggle').addEventListener('change', function() {
  const warning = document.getElementById('maintenance-warning');
  warning.style.display = this.checked ? 'flex' : 'none';
});

// Logo upload
document.getElementById('logo-upload').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      document.getElementById('platform-logo').src = event.target.result;
    };
    reader.readAsDataURL(file);
  }
});