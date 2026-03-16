     //Current stats codes
document.querySelectorAll('.three-dots-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const dropdown = btn.nextElementSibling;
    document.querySelectorAll('.dots-dropdown').forEach(d => {
      if (d !== dropdown) d.classList.remove('open');
    });
    dropdown.classList.toggle('open');
  });
});

document.addEventListener('click', () => {
  document.querySelectorAll('.dots-dropdown').forEach(d => d.classList.remove('open'));
});
    //reservationChart codes
const ctx = document.getElementById('reservationChart').getContext('2d');

new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    datasets :[{
      label: 'Reservations',
      data: [100, 95, 105, 90, 110, 29, 150, 180, 210, 160, 110, 105],
      borderColor: '#a855f7',
      backgroundColor: 'rgba(168, 85, 247, 0.1)',
      borderWidth: 2.5,
      pointRadius: 3,
      pointHoverRadius: 6,
      pointBackgroundColor: '#a855f7',
      tension: 0.4,
      fill: true,
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#7c3aed',
        titleColor: '#fff',
        bodyColor: '#fff',
        padding: 10,
        borderRadius: 8,
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(255,255,255,0.05)' },
        ticks: { color: '#9ca3af' }
      },
      y: {
        grid: { color: 'rgba(255,255,255,0.05)' },
        ticks: { color: '#9ca3af' }
      }
    }
  }
});
// Load saved profile on page load
window.addEventListener('load', () => {
  const savedPhoto = localStorage.getItem('adminPhoto');
  const savedName = localStorage.getItem('adminName');

  if (savedPhoto) {
    document.getElementById('admin-photo').src = savedPhoto;
  }
  if (savedName) {
    document.getElementById('admin-name').textContent = `Welcome back, ${savedName}`;
  }
});

// Click photo to change it
document.getElementById('admin-photo').addEventListener('click', () => {
  document.getElementById('photo-upload').click();
});

// When new photo is selected
document.getElementById('photo-upload').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const newPhoto = event.target.result;
      document.getElementById('admin-photo').src = newPhoto;
      localStorage.setItem('adminPhoto', newPhoto);
    };
    reader.readAsDataURL(file);
  }
});
// Recent Reservations
const donutCtx = document.getElementById('donutChart').getContext('2d');

new Chart(donutCtx, {
  type: 'doughnut',
  data: {
    labels: ['Fine Dining', 'Casual Dining', 'Cafes', 'Fast Food'],
    datasets: [{
      data: [30, 25, 20, 25],
      backgroundColor: ['#a855f7', '#ec4899', '#22c55e', '#f59e0b'],
      borderWidth: 0,
      hoverOffset: 6,
    }]
  },
  options: {
    responsive: true,
    cutout: '75%',
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#FDF8E6',
        titleColor: 'black',
        bodyColor: '#9ca3af',
        padding: 10,
        borderRadius: 8,
      }
    }
  }
});