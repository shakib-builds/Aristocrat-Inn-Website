// Booking page: prefill, live summary, validation and success state.
// No backend: a valid submit only switches to the confirmation view.
(() => {
  const form = document.getElementById('booking-form');
  if (!form) return;

  const ROOMS = {
    'Deluxe':                   { price: 6500,  img: 'assets/img/room-deluxe.jpg' },
    'Super Deluxe':             { price: 7500,  img: 'assets/img/room-super-deluxe.jpg' },
    'Aristocrat Deluxe':        { price: 8500,  img: 'assets/img/booking-room.jpg' },
    'Aristocrat Deluxe (Twin)': { price: 9000,  img: 'assets/img/room-aristocrat-twin.jpg' },
    'Aristocrat Suite':         { price: 12000, img: 'assets/img/room-aristocrat-suite.jpg' },
  };
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const WHATSAPP = 'https://wa.me/8801817019200';

  const $ = (id) => document.getElementById(id);
  const f = {
    checkin: $('checkin'), checkout: $('checkout'), room: $('room'), rooms: $('rooms'),
    guests: $('guests'), name: $('name'), email: $('email'), country: $('country'),
    phone: $('phone'), flight: $('flight'), arrival: $('arrival'), passport: $('passport'),
  };
  const banner = $('bk-banner');

  // ---------- helpers ----------
  const pad = (n) => String(n).padStart(2, '0');
  const iso = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const parseDate = (v) => {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v || '');
    if (!m) return null;
    const d = new Date(+m[1], +m[2] - 1, +m[3]);
    return d.getMonth() === +m[2] - 1 ? d : null;
  };
  const today = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; };
  const money = (n) => 'BDT ' + n.toLocaleString('en-US');
  const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;

  function nights() {
    const a = parseDate(f.checkin.value), b = parseDate(f.checkout.value);
    if (!a || !b) return 0;
    return Math.round((b - a) / 86400000);
  }

  function formatRange(a, b) {
    if (!a || !b) return '';
    const day = (d) => d.getDate();
    if (a.getFullYear() === b.getFullYear()) {
      if (a.getMonth() === b.getMonth()) return `${day(a)} – ${day(b)} ${MONTHS[b.getMonth()]} ${b.getFullYear()}`;
      return `${day(a)} ${MONTHS[a.getMonth()]} – ${day(b)} ${MONTHS[b.getMonth()]} ${b.getFullYear()}`;
    }
    return `${day(a)} ${MONTHS[a.getMonth()]} ${a.getFullYear()} – ${day(b)} ${MONTHS[b.getMonth()]} ${b.getFullYear()}`;
  }

  // Room name with the last word in the serif italic accent, e.g. "Aristocrat <i>Deluxe</i>"
  function setRoomTitle(el, name) {
    el.textContent = '';
    const twin = name.match(/^(.*) (\(Twin\))$/);
    const parts = twin ? [twin[1], twin[2]] : (() => {
      const i = name.lastIndexOf(' ');
      return i < 0 ? ['', name] : [name.slice(0, i), name.slice(i + 1)];
    })();
    if (parts[0]) el.append(parts[0] + ' ');
    const it = document.createElement('span');
    it.className = 'it';
    it.textContent = parts[1];
    el.append(it);
  }

  function setDateValue(input, value) {
    input.type = 'date';
    input.value = value;
  }

  // ---------- prefill from URL (Home booking bar / room cards) ----------
  const params = new URLSearchParams(location.search);
  const qRoom = (params.get('room') || '').trim().toLowerCase();
  if (qRoom) {
    const opt = [...f.room.options].find((o) => o.value && o.value.toLowerCase() === qRoom);
    if (opt) f.room.value = opt.value;
  }
  const qGuests = parseInt(params.get('guests'), 10);
  if (qGuests && [...f.guests.options].some((o) => o.value === String(qGuests))) f.guests.value = String(qGuests);
  ['checkin', 'checkout'].forEach((k) => {
    const d = parseDate(params.get(k));
    if (d) setDateValue(f[k], iso(d));
  });

  // Date limits
  f.checkin.min = iso(today());
  function syncCheckoutMin() {
    const a = parseDate(f.checkin.value);
    if (a) { const b = new Date(a); b.setDate(b.getDate() + 1); f.checkout.min = iso(b); }
    else f.checkout.min = iso(today());
  }

  // ---------- live summary ----------
  function updateSummary() {
    syncCheckoutMin();
    const n = nights();
    const name = f.room.value;
    const room = ROOMS[name];
    const rooms = +f.rooms.value || 1;
    const guests = +f.guests.value || 1;

    $('nights').textContent = n > 0 ? `${n} (calculated)` : '– (calculated)';

    const img = $('sum-img');
    if (room) {
      setRoomTitle($('sum-room'), name);
      if (img.getAttribute('src') !== room.img) img.src = room.img;
      img.alt = `${name} room`;
    } else {
      $('sum-room').textContent = 'Choose a room';
    }

    const a = parseDate(f.checkin.value), b = parseDate(f.checkout.value);
    $('sum-dates').textContent = n > 0 ? formatRange(a, b) : 'Select dates';
    $('sum-guests').textContent = `${plural(guests, 'adult', 'adults')} · ${plural(rooms, 'room', 'rooms')}`;

    const rate = room ? money(room.price) : 'Room rate';
    const roomsTxt = rooms > 1 ? ` × ${rooms} rooms` : '';
    $('sum-rate').textContent = `${rate} × ${n > 0 ? plural(n, 'night', 'nights') : '– nights'}${roomsTxt}`;
    const total = room && n > 0 ? room.price * n * rooms : 0;
    $('sum-subtotal').textContent = total ? money(total) : '–';
    $('sum-total').textContent = total ? money(total) : '–';

    // WhatsApp hand-off with the stay details (no personal data)
    const msg = ['Hello, I would like to book a stay at Hotel Aristocrat Inn.'];
    if (room) msg.push(`Room: ${name} × ${rooms}`);
    if (n > 0) msg.push(`Dates: ${formatRange(a, b)} (${plural(n, 'night', 'nights')})`);
    msg.push(`Guests: ${plural(guests, 'adult', 'adults')}`);
    $('sum-whatsapp').href = `${WHATSAPP}?text=${encodeURIComponent(msg.join('\n'))}`;
    return { n, name, room, rooms, guests, a, b, total };
  }

  // ---------- validation ----------
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const rules = {
    checkin() {
      const d = parseDate(f.checkin.value);
      if (!d) return 'Please choose a check-in date';
      if (d < today()) return 'Check-in can’t be in the past';
      return '';
    },
    checkout() {
      const b = parseDate(f.checkout.value);
      if (!b) return 'Please choose a check-out date';
      const a = parseDate(f.checkin.value);
      if (a && b <= a) return 'Check-out must be after check-in';
      return '';
    },
    room() { return f.room.value ? '' : 'Please choose a room type'; },
    name() { return f.name.value.trim().length >= 2 ? '' : 'Please enter your full name'; },
    email() {
      const v = f.email.value.trim();
      if (!v) return 'Please enter your email';
      return EMAIL_RE.test(v) ? '' : 'Enter a valid email, e.g. name@email.com';
    },
    phone() {
      const v = f.phone.value.trim();
      if (!v) return 'Please enter a phone or WhatsApp number';
      if (/[^\d\s()+-]/.test(v)) return 'Use digits only, e.g. 1712 345678';
      const digits = v.replace(/\D/g, '').length;
      if (digits < 7) return 'Phone number looks too short';
      if (digits > 15) return 'Phone number looks too long';
      return '';
    },
  };
  const ORDER = ['checkin', 'checkout', 'room', 'name', 'email', 'phone'];
  let attempted = false;

  function setError(key, message) {
    const input = f[key];
    const group = input.closest('.bk-group');
    const err = $(`${key}-error`);
    group.classList.toggle('is-invalid', !!message);
    if (message) {
      err.textContent = message;
      err.hidden = false;
      input.setAttribute('aria-invalid', 'true');
      input.setAttribute('aria-describedby', err.id);
    } else {
      err.textContent = '';
      err.hidden = true;
      input.removeAttribute('aria-invalid');
      input.removeAttribute('aria-describedby');
    }
  }

  function validate(keys = ORDER) {
    const invalid = [];
    keys.forEach((k) => {
      const msg = rules[k]();
      setError(k, msg);
      if (msg) invalid.push(k);
    });
    return invalid;
  }

  function showBanner(count) {
    if (!count) { banner.hidden = true; banner.textContent = ''; return; }
    banner.textContent = `Please fix ${count === 1 ? '1 field' : count + ' fields'} highlighted below before sending your request.`;
    banner.hidden = false;
  }

  // Re-check fields live once the guest has tried to submit (or left a touched field)
  ORDER.forEach((k) => {
    const el = f[k];
    const recheck = () => {
      if (!attempted) return;
      const keys = k === 'checkin' ? ['checkin', 'checkout'] : [k];
      validate(keys);
      showBanner(ORDER.filter((x) => f[x].getAttribute('aria-invalid') === 'true').length);
    };
    el.addEventListener('input', recheck);
    el.addEventListener('change', recheck);
    el.addEventListener('blur', () => {
      if (!attempted && el.value.trim()) setError(k, rules[k]());
    });
  });

  // Summary follows every stay field
  ['checkin', 'checkout', 'room', 'rooms', 'guests'].forEach((k) => {
    f[k].addEventListener('input', updateSummary);
    f[k].addEventListener('change', updateSummary);
  });

  // Passport file name feedback (file stays in the browser – there is no upload backend yet)
  const hint = $('passport-hint');
  const hintDefault = hint.textContent;
  f.passport.addEventListener('change', () => {
    const file = f.passport.files && f.passport.files[0];
    hint.textContent = file ? `Selected: ${file.name}` : hintDefault;
    f.passport.closest('.bk-upload').classList.toggle('has-file', !!file);
  });

  // ---------- submit ----------
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    attempted = true;
    const invalid = validate();
    showBanner(invalid.length);
    if (invalid.length) {
      const first = f[invalid[0]];
      first.focus({ preventScroll: true });
      first.closest('.bk-group').scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    showSuccess(updateSummary());
  });

  function showSuccess(s) {
    const first = f.name.value.trim().split(/\s+/)[0];
    $('done-name').textContent = first;
    const yy = String(s.a.getFullYear()).slice(-2);
    $('done-ref').textContent = `AI-${yy}-${pad(s.a.getMonth() + 1)}${pad(s.a.getDate())}`;
    $('done-room').textContent = `${s.name} · ${plural(s.rooms, 'room', 'rooms')}`;
    $('done-dates').textContent = `${formatRange(s.a, s.b)} · ${plural(s.n, 'night', 'nights')}`;
    $('done-guests').textContent = plural(s.guests, 'adult', 'adults');
    $('done-total').textContent = money(s.total);
    const flight = f.flight.value.trim().toUpperCase();
    const time = f.arrival.value.trim();
    $('done-pickup').textContent = flight
      ? `Flight ${flight}${time ? ' · ' + time : ''}`
      : (time ? `Arriving ${time}` : 'Send your flight number on WhatsApp');

    $('booking-view').hidden = true;
    $('success-view').hidden = false;
    window.scrollTo({ top: 0 });
    $('done-title').focus({ preventScroll: true });
    document.title = 'Request received · Hotel Aristocrat Inn';
  }

  // ---------- selects ----------
  // The select is sized to its value (▾ right after the text), so a click anywhere
  // in the field box opens the picker.
  document.querySelectorAll('.bk-field--select').forEach((box) => {
    const sel = box.querySelector('select');
    box.addEventListener('click', (e) => {
      if (e.target === sel) return;
      sel.focus();
      try { sel.showPicker(); } catch (_) { /* unsupported: focus is enough */ }
    });
  });

  // Country code shows just the code when closed ("+880"), full names while choosing.
  const country = f.country;
  const longLabels = [...country.options].map((o) => o.textContent);
  const showShort = () => [...country.options].forEach((o) => { o.textContent = o.value; });
  const showLong = () => [...country.options].forEach((o, i) => { o.textContent = longLabels[i]; });
  country.addEventListener('mousedown', showLong);
  country.addEventListener('keydown', showLong);
  country.addEventListener('change', showShort);
  country.addEventListener('blur', showShort);
  const countryBox = country.closest('.bk-field');
  countryBox.addEventListener('click', (e) => { if (e.target !== country) showLong(); }, true);
  showShort();

  updateSummary();
})();
