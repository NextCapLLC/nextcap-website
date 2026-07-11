document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.navlinks');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.textContent = open ? '× Close' : '☰ Menu';
    });
    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.textContent = '☰ Menu';
      });
    });
  }

  document.querySelectorAll('form[data-demo]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      alert('Thank you. Your request is ready to send once website email hosting is connected to info@nextcapllc.com.');
      form.reset();
    });
  });

  const filters = [...document.querySelectorAll('.filter-btn')];
  const cards = [...document.querySelectorAll('.portfolio-card')];
  filters.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter || 'all';
      filters.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      cards.forEach((card) => {
        const categories = (card.dataset.category || '').split(/\s+/);
        const show = filter === 'all' || categories.includes(filter);
        card.classList.toggle('hide', !show);
      });
    });
  });

  document.querySelectorAll('.compare-frame').forEach((frame) => {
    const range = frame.querySelector('.compare-range');
    const after = frame.querySelector('.after');
    const handle = frame.querySelector('.compare-handle');
    if (!range || !after || !handle) return;

    const update = () => {
      const value = Number(range.value);
      after.style.clipPath = `inset(0 0 0 ${value}%)`;
      handle.style.left = `${value}%`;
    };

    range.addEventListener('input', update);
    window.addEventListener('resize', update);
    update();
  });
});
