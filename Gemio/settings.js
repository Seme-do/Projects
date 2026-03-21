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