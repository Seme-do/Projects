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
    //Current stats data(I will replace with API data later)
    const statsData = {
      Daily: { restaurants: 132, reservations: 4, Users: 8, pending: 1, toprated: 3 },
      Weekly: { restaurants: 132, reservations: 28, Users: 21, pending: 4, toprated: 15 },
      Monthly: { restaurants: 132, reservations: 16, Users: 2400, pending: 10, toprated: 66 },
      Yearly: { restaurants: 132, reservations: 97, Users: 30000, pending: 22, toprated: 88 },
    };
    //Update stats when time frame changes
    function updateStatsCards(period) {
      const data = statsData[period];
      const cards = document.querySelectorAll('.stat-value');
      cards[0].textContent = data.restaurants;
      cards[1].textContent = data.reservations;
      cards[2].textContent = data.Users;
      cards[3].textContent = data.pending;
      cards[4].textContent = data.toprated;
    }
//Chart Filter Dropdown
const chartFilter = document.querySelector('.chart-filter');
if (chartFilter) {
  chartFilter.addEventListener('change', (e) => {
    updateStatsCards(chartFilter.value);
  });
  updateStatsCards(chartFilter.value);
}
/*
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
*/
//Reservation Chart Data(I will replace with API later on)
const chartData = {
  Daily: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    data:   [12, 18, 14, 22, 30, 45, 38],
  },
  Weekly: {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    data:   [85, 110, 95, 130],
  },
  Monthly: {
    labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    data:   [100, 95, 105, 90, 110, 29, 150, 180, 210, 160, 110, 105],
  },
  Yearly: {
    labels: ['2021', '2022', '2023', '2024', '2025', '2026'],
    data:   [400, 620, 890, 1100, 1350, 980],
  },
};

// ─── Reservation Chart ─────────────────────────────────────────────
const ctx = document.getElementById('reservationChart').getContext('2d');

const reservationChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: chartData.Monthly.labels,
    datasets: [{
      label: 'Reservations',
      data: chartData.Monthly.data,
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

// ─── Reservation Chart Filter Dropdown ─────────────────────────────────────────
const reservationFilter = document.querySelector('.reservation-filter');
if (reservationFilter) {
  reservationFilter.addEventListener('change', () => {
    const period = reservationFilter.value;
    reservationChart.data.labels = chartData[period].labels;
    reservationChart.data.datasets[0].data = chartData[period].data;
    reservationChart.update();
  });
}
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
// ─── Mobile View(Profile Dropdown)
function toggleMobileProfile() {
  const dropdown = document.getElementById('mobileProfileDropdown');
  dropdown.classList.toggle('open');
}

document.addEventListener('click', (e) => {
  const dropdown = document.getElementById('mobileProfileDropdown');
  if (dropdown && !e.target.closest('.mobile-icon-wrap') && !e.target.closest('.mobile-profile-dropdown')) {
    dropdown.classList.remove('open');
  }
});
// ─── Mobile Sidebar Toggle ─────────────────────────────────
function toggleSidebar() {
  const sidebar = document.getElementById('leftSidebar');
  const overlay = document.getElementById('sidebarOverlay');
  sidebar.classList.toggle('open');
  overlay.classList.toggle('open');
}