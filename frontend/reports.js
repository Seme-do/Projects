// Period filter
function setPeriod(period, clickedBtn) {
  document.querySelectorAll('.period-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  clickedBtn.classList.add('active');
  console.log('Period set to:', period);
}

// Resolve flag
function resolveFlag(btn) {
  const row = btn.closest('tr');
  row.style.opacity = '0.5';
  btn.innerHTML = '<i class="fa-solid fa-check"></i> Resolved';
  btn.disabled = true;
}

// Suspend restaurant
function suspendRestaurant(btn) {
  const row = btn.closest('tr');
  const restaurant = row.cells[1].textContent;
  if(confirm(`Are you sure you want to suspend ${restaurant}?`)) {
    row.remove();
  }
}

// Export Data
function exportData(format) {
  alert(`Exporting data as ${format.toUpperCase()}... Backend will handle this!`);
}

// Load saved profile photo
window.addEventListener('load', () => {
  const savedPhoto = localStorage.getItem('adminPhoto');
  if (savedPhoto) {
    document.getElementById('admin-photo').src = savedPhoto;
  }
});