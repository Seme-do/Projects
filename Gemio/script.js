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