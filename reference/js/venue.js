// Restaurant + Conference pages: enquiry forms and photo lightbox.
// Forms are validated client-side only. There is no backend yet, so on submit
// we show a confirmation instead of sending. Connect a form service (Formspree,
// Netlify Forms, etc.) here when one is chosen.

(() => {
  // ---------- Forms ----------
  const messages = {
    valueMissing: 'Please fill this in.',
    typeMismatch: 'Please check this format.',
    patternMismatch: 'Please include a phone number we can call.',
    rangeUnderflow: 'Please enter at least 1.',
    rangeOverflow: 'The hall seats up to 150 guests.',
  };

  const errorFor = (input) => {
    const v = input.validity;
    if (v.valid) return '';
    for (const key in messages) if (v[key]) return messages[key];
    if (v.badInput) return 'Please check this value.';
    return input.validationMessage;
  };

  const showError = (input) => {
    const box = input.closest('.fbox');
    const out = box && box.querySelector('.fbox__error');
    const msg = errorFor(input);
    if (box) box.classList.toggle('is-invalid', !!msg);
    if (out) out.textContent = msg;
    input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    return !msg;
  };

  document.querySelectorAll('.js-enquiry').forEach((form) => {
    const fields = [...form.querySelectorAll('input, select, textarea')];
    const done = form.parentElement.querySelector('.form-card__done');

    // Earliest date: today
    const today = new Date();
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
    form.querySelectorAll('.js-date').forEach((d) => { d.min = today.toISOString().slice(0, 10); });

    // Time fields: "Select time" placeholder, switch to a time picker on focus
    // (date fields get the same treatment from main.js via .js-date)
    form.querySelectorAll('.js-time').forEach((t) => {
      t.addEventListener('focus', () => {
        t.type = 'time';
        if (t.showPicker) { try { t.showPicker(); } catch (e) { /* not supported */ } }
      });
      t.addEventListener('blur', () => { if (!t.value) t.type = 'text'; });
    });

    fields.forEach((f) => {
      f.addEventListener('blur', () => { if (f.value || f.closest('.is-invalid')) showError(f); });
      f.addEventListener('input', () => { if (f.closest('.is-invalid')) showError(f); });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let firstBad = null;
      fields.forEach((f) => { if (!showError(f) && !firstBad) firstBad = f; });
      if (firstBad) { firstBad.focus(); return; }

      const name = (form.querySelector('[name="name"]') || {}).value || '';
      const first = name.split(/[ ,]/)[0];
      if (done) {
        const who = done.querySelector('.js-name');
        if (who) who.textContent = first ? `, ${first}` : '';
        form.hidden = true;
        done.hidden = false;
        done.focus();
      }
      form.reset();
      form.querySelectorAll('.js-date, .js-time').forEach((f) => { f.type = 'text'; });
    });
  });

  document.querySelectorAll('.js-form-again').forEach((btn) =>
    btn.addEventListener('click', () => {
      const done = btn.closest('.form-card__done');
      const form = done.parentElement.querySelector('.js-enquiry');
      done.hidden = true;
      form.hidden = false;
      form.querySelector('input, select, textarea').focus();
    })
  );

  // Event-type links pre-select the enquiry form
  document.querySelectorAll('[data-event-type]').forEach((link) =>
    link.addEventListener('click', () => {
      const select = document.querySelector('select[name="event"]');
      if (select) select.value = link.dataset.eventType;
    })
  );

  // ---------- Lightbox ----------
  const zoomables = document.querySelectorAll('.zoomable');
  if (!zoomables.length || typeof HTMLDialogElement !== 'function') return;

  const dialog = document.createElement('dialog');
  dialog.className = 'lightbox';
  dialog.innerHTML = '<button class="lightbox__close" type="button" aria-label="Close photo">×</button>';
  document.body.appendChild(dialog);
  const big = document.createElement('img');

  zoomables.forEach((btn) =>
    btn.addEventListener('click', () => {
      const img = btn.querySelector('img');
      big.src = img.currentSrc || img.src;
      big.alt = img.alt;
      if (!big.isConnected) dialog.appendChild(big);
      dialog.showModal();
    })
  );
  dialog.querySelector('.lightbox__close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });
})();
