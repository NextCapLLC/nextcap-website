document.addEventListener('DOMContentLoaded', function () {

  // Sticky nav height
  var nb = document.querySelector('.navbar');
  if (nb) document.documentElement.style.setProperty('--nav-top', nb.offsetHeight + 'px');

  // Mobile menu
  var menuBtn = document.querySelector('.mobile-toggle');
  var nav = document.querySelector('.navlinks');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.textContent = open ? '× Close' : '☰ Menu';
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.textContent = '☰ Menu';
      });
    });
  }

  // Portfolio filter buttons
  var filters = Array.from(document.querySelectorAll('.filter-btn'));
  var cards = Array.from(document.querySelectorAll('.portfolio-card'));
  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var filter = btn.dataset.filter || 'all';
      filters.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      cards.forEach(function (card) {
        var cats = (card.dataset.category || '').split(/s+/);
        card.classList.toggle('hide', filter !== 'all' && !cats.includes(filter));
      });
    });
  });

  // Before/after compare slider
  document.querySelectorAll('.compare-frame').forEach(function (frame) {
    var range = frame.querySelector('.compare-range');
    var after = frame.querySelector('.after');
    var handle = frame.querySelector('.compare-handle');
    if (!range || !after || !handle) return;
    function update() {
      var v = Number(range.value);
      after.style.clipPath = 'inset(0 0 0 ' + v + '%)';
      handle.style.left = v + '%';
    }
    range.addEventListener('input', update);
    window.addEventListener('resize', update);
    update();
  });

  // Redirect all estimate links to the estimate page
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href="estimate.html"]');
    if (link) {
      e.preventDefault();
      window.location.href = '/estimate';
    }
  });

});