
const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const floorTabs = document.querySelectorAll('.floor-tab');
const floorPanels = document.querySelectorAll('.floor-panel');
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');
const lightboxClose = lightbox.querySelector('.lightbox-close');
const galleryCards = document.querySelectorAll('.gallery-card');
const toast = document.getElementById('toast');
const contactBtn = document.getElementById('contactBtn');

function onScroll(){
  header.classList.toggle('scrolled', window.scrollY > 40);
}
onScroll();
window.addEventListener('scroll', onScroll, {passive:true});

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

floorTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.floor;
    floorTabs.forEach(t => {
      t.classList.toggle('active', t === tab);
      t.setAttribute('aria-selected', t === tab ? 'true' : 'false');
    });
    floorPanels.forEach(panel => panel.classList.toggle('active', panel.id === target));
  });
});

galleryCards.forEach(card => {
  card.addEventListener('click', () => {
    lightboxImg.src = card.dataset.image;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });
});
function closeLightbox(){
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => {
  if(e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', e => {
  if(e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add('in-view');
  });
}, {threshold:.12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

contactBtn.addEventListener('click', () => {
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
});
