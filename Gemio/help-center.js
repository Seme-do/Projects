// Search help articles
function searchHelp(value) {
  const faqItems = document.querySelectorAll('.faq-item');
  const tutorialCards = document.querySelectorAll('.tutorial-card');

  faqItems.forEach(item => {
    const text = item.textContent.toLowerCase();
    item.style.display = text.includes(value.toLowerCase()) ? 'block' : 'none';
  });

  tutorialCards.forEach(card => {
    const text = card.textContent.toLowerCase();
    card.style.display = text.includes(value.toLowerCase()) ? 'block' : 'none';
  });
}

// Load saved profile photo
window.addEventListener('load', () => {
  const savedPhoto = localStorage.getItem('adminPhoto');
  if (savedPhoto) {
    document.getElementById('admin-photo').src = savedPhoto;
  }
});