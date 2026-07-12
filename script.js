document.addEventListener('DOMContentLoaded', () => {
  const _nb = document.querySelector('.navbar'); if (_nb) document.documentElement.style.setProperty('--nav-top', _nb.offsetHeight + 'px');
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
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;
      try {
        const [res] = await Promise.all([
          fetch('https://formspree.io/f/mlgqryqz', {
            method: 'POST',
            headers: { 'Accept': 'application/json' },
            body: new FormData(form)
          }),
          fetch('https://55d03448-7ecb-41b5-88ff-4b4adfc74d27-00-2lj3a77ioslqd.kirk.replit.dev/api/leads', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: form.querySelector('[name=name]')?.value || '',
              phone: form.querySelector('[name=phone]')?.value || '',
              email: form.querySelector('[name=email]')?.value || '',
              service: form.querySelector('[name=service]')?.value || 'General',
              address: form.querySelector('[name=address]')?.value || '',
              details: form.querySelector('[name=details]')?.value || ''
            })
          }).catch(function(){})
        ]);
        if (res.ok) {
          btn.textContent = 'Sent!';
          form.reset();
          setTimeout(() => { btn.textContent = originalText; btn.disabled = false; }, 3000);
        } else {
          btn.textContent = 'Error — try again';
          btn.disabled = false;
        }
      } catch(e) {
        btn.textContent = 'Error — try again';
        btn.disabled = false;
      }
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

  // Estimate modal
  (function(){
    var modal = document.createElement('div');
    modal.id = 'estimate-modal';
    modal.setAttribute('role','dialog');
    modal.setAttribute('aria-modal','true');
    modal.setAttribute('aria-label','Request a free estimate');
    modal.innerHTML = [
      '<div class="modal-backdrop"></div>',
      '<div class="modal-box">',
      '<button class="modal-close" aria-label="Close">&times;</button>',
      '<h2>Get a Free Estimate</h2>',
      '<p>Tell us about your project and we\'ll follow up quickly.</p>',
      '<form class="form" data-demo>',
      '<div class="grid two">',
      '<div><label for="m-name">Full name</label><input id="m-name" name="name" placeholder="Your name" required></div>',
      '<div><label for="m-phone">Phone number</label><input id="m-phone" name="phone" placeholder="(304) 555-1234" required></div>',
      '</div>',
      '<div class="grid two">',
      '<div><label for="m-email">Email address</label><input id="m-email" name="email" type="email" placeholder="you@example.com" required></div>',
      '<div><label for="m-service">Service type</label>',
      '<select id="m-service" name="service">',
      '<option>Roofing</option><option>Painting</option><option>Siding / Exterior</option>',
      '<option>Decks / Patios</option><option>Additions</option><option>Repairs / Maintenance</option>',
      '</select></div>',
      '</div>',
      '<div><label for="m-address">Project address</label><input id="m-address" name="address" placeholder="Street, city, state"></div>',
      '<div style="margin-top:.9rem;"><label for="m-details">Project details</label>',
      '<textarea id="m-details" name="details" placeholder="Tell us about the scope, timeline, and any photos you would like to share."></textarea></div>',
      '<p class="note">Photo uploads can be shared by email after submission.</p>',
      '<button class="btn btn-primary" type="submit">Send Estimate Request</button>',
      '</form></div>'
    ].join('');
    document.body.appendChild(modal);
    function openModal(){modal.classList.add('open');document.body.classList.add('modal-open');}
    function closeModal(){modal.classList.remove('open');document.body.classList.remove('modal-open');}
    modal.querySelector('.modal-backdrop').addEventListener('click',closeModal);
    modal.querySelector('.modal-close').addEventListener('click',closeModal);
    document.addEventListener('keydown',function(e){if(e.key==='Escape')closeModal();});
    document.addEventListener('click',function(e){
      var link=e.target.closest('a[href="estimate.html"]');
      if(link&&!window.location.pathname.endsWith('estimate.html')){e.preventDefault();openModal();}
    });
  })();

});