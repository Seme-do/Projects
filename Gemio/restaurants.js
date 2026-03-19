// Search
  function searchRestaurants(value) {
    const rows = document.querySelectorAll('#restaurantsList tr');
    rows.forEach(row => {
      const name = row.cells[1].textContent.toLowerCase();
      row.style.display = name.includes(value.toLowerCase()) ? '' : 'none';
    });
  }
 // Filter by status
  function filterRestaurants(value) {
    const rows = document.querySelectorAll('#restaurantsList tr');
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
  });