// Mobile navigation
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen);
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});

navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// Dark / light theme
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const darkModeOn = document.body.classList.contains('dark');
  themeToggle.textContent = darkModeOn ? '☾' : '☼';
  themeToggle.setAttribute('aria-label', darkModeOn ? 'Switch to light theme' : 'Switch to dark theme');
});

// Reveal sections as they enter the screen
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));

// Contact form: validate, then open the visitor's email app with a prepared message.
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', event => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;

  const name = document.getElementById('visitorName').value.trim();
  const email = document.getElementById('visitorEmail').value.trim();
  const message = document.getElementById('visitorMessage').value.trim();

  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const body = encodeURIComponent(`Hi Palash,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`);
  window.location.href = `mailto:jpalash087@gmail.com?subject=${subject}&body=${body}`;
  formStatus.textContent = 'Your email app should open with the message ready to send.';
});

document.getElementById('year').textContent = new Date().getFullYear();
