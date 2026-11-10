// "Apply" on a job row: jump to the application form with that position selected.
document.querySelectorAll('.k-job__apply[data-position]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const select = document.getElementById('k-position');
    const form = document.getElementById('career-form');
    if (!select || !form) return;
    e.preventDefault();
    select.value = link.dataset.position;
    if (form.hidden) return document.getElementById('apply').scrollIntoView();
    document.getElementById('apply').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    history.replaceState(null, '', '#apply');
    document.getElementById('k-name').focus({ preventScroll: true });
  });
});
