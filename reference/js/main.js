// Mobile menu
const header = document.querySelector('.site-header');
const toggle = document.querySelector('.menu-toggle');

toggle.addEventListener('click', () => {
  const open = header.classList.toggle('menu-open');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});

document.querySelectorAll('.nav a').forEach((link) =>
  link.addEventListener('click', () => {
    header.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
  })
);

// Date fields: show "Add date" placeholder, switch to a date picker on focus
document.querySelectorAll('.js-date').forEach((input) => {
  input.addEventListener('focus', () => {
    input.type = 'date';
    if (input.showPicker) {
      try { input.showPicker(); } catch (e) { /* not supported */ }
    }
  });
  input.addEventListener('blur', () => {
    if (!input.value) input.type = 'text';
  });
});
