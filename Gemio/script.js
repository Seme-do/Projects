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