// Room detail page: photo gallery lightbox
(() => {
  const items = Array.from(document.querySelectorAll('.rd-gallery__item'));
  const dialog = document.querySelector('.lightbox');
  if (!items.length || !dialog || typeof dialog.showModal !== 'function') return;

  const img = dialog.querySelector('.lightbox__img');
  const count = dialog.querySelector('.lightbox__count');
  const photos = items.map((item) => {
    const el = item.querySelector('img');
    return { src: el.getAttribute('src'), alt: el.getAttribute('alt') };
  });
  let current = 0;

  const show = (i) => {
    current = (i + photos.length) % photos.length;
    img.src = photos[current].src;
    img.alt = photos[current].alt;
    count.textContent = `${current + 1} / ${photos.length}`;
  };

  items.forEach((item, i) =>
    item.addEventListener('click', () => {
      // "View all photos" tile opens the gallery from the first photo
      show(item.classList.contains('rd-gallery__item--more') ? 0 : i);
      dialog.showModal();
    })
  );

  dialog.querySelector('.lightbox__close').addEventListener('click', () => dialog.close());
  dialog.querySelector('.lightbox__nav--prev').addEventListener('click', () => show(current - 1));
  dialog.querySelector('.lightbox__nav--next').addEventListener('click', () => show(current + 1));
  dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });
  dialog.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });
})();
