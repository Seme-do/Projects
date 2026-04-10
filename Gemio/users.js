// Search users
function searchUsers(value) {
  const rows = document.querySelectorAll('#userList tr');
  rows.forEach(row => {
    const name = row.cells[1].textContent.toLowerCase();
    const email = row.cells[2].textContent.toLowerCase();
    if (name.includes(value.toLowerCase()) || 
        email.includes(value.toLowerCase())) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}

// Filter by status
function filterUsers(value) {
  const rows = document.querySelectorAll('#userList tr');
  rows.forEach(row => {
    if (value === 'all') {
      row.style.display = '';
    } else {
      row.style.display = row.dataset.status === value ? '' : 'none';
    }
  });
}

// Load saved profile photo
window.addEventListener('load', () => {
  const savedPhoto = localStorage.getItem('adminPhoto');
  if (savedPhoto) {
    document.getElementById('admin-photo').src = savedPhoto;
  }
//Auto-filter from URL param
const params = new URLSearchParams(window.location.search);
const statusParam = params.get('status');
if (statusParam) {
  const filterSelect = document.getElementById('statusFilter');
  if (filterSelect) filterSelect.value = statusParam;
  filterUsers(statusParam);
}
});