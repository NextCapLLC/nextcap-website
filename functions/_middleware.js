export async function onRequest(context) {
  const url = new URL(context.request.url);

  // Intercept /script.js and return the clean version
  if (url.pathname === '/script.js') {
    const script = "document.addEventListener('DOMContentLoaded', function () {\n\n  var nb = document.querySelector('.navbar');\n  if (nb) document.documentElement.style.setProperty('--nav-top', nb.offsetHeight + 'px');\n\n  var menuBtn = document.querySelector('.mobile-toggle');\n  var nav = document.querySelector('.navlinks');\n  if (menuBtn && nav) {\n    menuBtn.addEventListener('click', function () {\n      var open = nav.classList.toggle('open');\n      menuBtn.setAttribute('aria-expanded', String(open));\n      menuBtn.textContent = open ? '× Close' : '☰ Menu';\n    });\n    nav.querySelectorAll('a').forEach(function (link) {\n      link.addEventListener('click', function () {\n        nav.classList.remove('open');\n        menuBtn.setAttribute('aria-expanded', 'false');\n        menuBtn.textContent = '☰ Menu';\n      });\n    });\n  }\n\n  var filters = Array.from(document.querySelectorAll('.filter-btn'));\n  var cards = Array.from(document.querySelectorAll('.portfolio-card'));\n  filters.forEach(function (btn) {\n    btn.addEventListener('click', function () {\n      var filter = btn.dataset.filter || 'all';\n      filters.forEach(function (b) { b.classList.remove('active'); });\n      btn.classList.add('active');\n      cards.forEach(function (card) {\n        var cats = (card.dataset.category || '').split(/\\s+/);\n        card.classList.toggle('hide', filter !== 'all' && !cats.includes(filter));\n      });\n    });\n  });\n\n  document.querySelectorAll('.compare-frame').forEach(function (frame) {\n    var range = frame.querySelector('.compare-range');\n    var after = frame.querySelector('.after');\n    var handle = frame.querySelector('.compare-handle');\n    if (!range || !after || !handle) return;\n    function update() {\n      var v = Number(range.value);\n      after.style.clipPath = 'inset(0 0 0 ' + v + '%)';\n      handle.style.left = v + '%';\n    }\n    range.addEventListener('input', update);\n    window.addEventListener('resize', update);\n    update();\n  });\n\n  // Send ALL estimate link clicks directly to the estimate page — no modal\n  document.addEventListener('click', function (e) {\n    var link = e.target.closest('a[href=\"estimate.html\"], a[href=\"/estimate\"]');\n    if (link) {\n      e.preventDefault();\n      window.location.href = '/estimate';\n    }\n  });\n\n});";
    return new Response(script, {
      headers: {
        'Content-Type': 'application/javascript; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });
  }

  return context.next();
}