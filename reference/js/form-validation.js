// Client-side validation for the Contact and Career forms.
// There is no backend yet: a valid submit shows a confirmation instead of
// sending data. Hook the form up to a form service (e.g. Formspree) to deliver it.
(function () {
  const MAX_FILE_MB = 5;
  const FILE_TYPES = /\.(pdf|doc|docx)$/i;

  function messageFor(field) {
    const v = field.validity;
    if (field.type === 'file') {
      const file = field.files && field.files[0];
      if (!file) return field.required ? (field.dataset.errorRequired || 'Please choose a file.') : '';
      if (!FILE_TYPES.test(file.name)) return 'Please upload a PDF or Word document.';
      if (file.size > MAX_FILE_MB * 1024 * 1024) return `Your file is larger than ${MAX_FILE_MB} MB. Please upload a smaller file.`;
      return '';
    }
    const value = field.value.trim();
    if (field.required && !value) return field.dataset.errorRequired || 'This field is required.';
    if (!value) return '';
    if (field.type === 'email' && (v.typeMismatch || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))) {
      return 'Please enter a valid email address, like name@example.com.';
    }
    if ('phone' in field.dataset) {
      const digits = value.replace(/\D/g, '');
      if (!/^[+\d\s()-]+$/.test(value) || digits.length < 7 || digits.length > 15) {
        return 'Please enter a valid phone number, like +880 1817 019200.';
      }
    }
    return '';
  }

  function show(field, msg) {
    const box = field.closest('.f-field, .f-upload');
    const err = document.getElementById(`${field.id}-error`);
    if (box) box.classList.toggle('is-invalid', !!msg);
    if (msg) {
      field.setAttribute('aria-invalid', 'true');
      if (err) {
        err.textContent = msg;
        err.hidden = false;
        field.setAttribute('aria-describedby', err.id);
      }
    } else {
      field.removeAttribute('aria-invalid');
      if (err) {
        err.hidden = true;
        err.textContent = '';
        field.removeAttribute('aria-describedby');
      }
    }
    return !msg;
  }

  document.querySelectorAll('form.f-form').forEach((form) => {
    const fields = Array.from(form.querySelectorAll('input, select, textarea'));
    const touched = new WeakSet();

    fields.forEach((field) => {
      field.addEventListener('blur', () => {
        if (field.value) touched.add(field);
        if (touched.has(field)) show(field, messageFor(field));
      });
      field.addEventListener(field.type === 'file' ? 'change' : 'input', () => {
        if (touched.has(field) || field.type === 'file') show(field, messageFor(field));
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let firstInvalid = null;
      fields.forEach((field) => {
        touched.add(field);
        if (!show(field, messageFor(field)) && !firstInvalid) firstInvalid = field;
      });
      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }
      // TODO: send to a form service (e.g. Formspree) once one is set up.
      const success = document.getElementById(form.dataset.success);
      if (success) {
        form.hidden = true;
        success.hidden = false;
        success.focus();
      }
    });
  });

  // Show the chosen file name in upload boxes
  document.querySelectorAll('.f-upload input[type="file"]').forEach((input) => {
    const name = input.closest('.f-upload').querySelector('.f-upload__file');
    input.addEventListener('change', () => {
      const file = input.files && input.files[0];
      if (name) name.textContent = file ? file.name : '';
      input.closest('.f-upload').classList.toggle('has-file', !!file);
    });
  });
})();
