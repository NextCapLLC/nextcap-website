(function() {
  function handleEstimateSubmit(event) {
    var form = event.target;
    if (!form || !form.hasAttribute || !form.hasAttribute('data-demo')) return;
    event.preventDefault();
    event.stopPropagation();
    var btn = form.querySelector('[type="submit"]');
    if (!btn) return;
    var originalText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;
    var getData = function(n) { var el = form.querySelector('[name=' + n + ']'); return el ? el.value : ''; };
    var payload = {
      name: getData('name'),
      phone: getData('phone'),
      email: getData('email'),
      service: getData('service') || 'General',
      address: getData('address'),
      details: getData('details')
    };
    var fd = new FormData(form);
    Promise.all([
      fetch('https://formspree.io/f/mlgqryqz', { method: 'POST', headers: { 'Accept': 'application/json' }, body: fd }),
      fetch('/api/crm-lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }).catch(function(){})
    ]).then(function(results) {
      if (results[0] && results[0].ok) {
        btn.textContent = 'Sent!';
        form.reset();
        setTimeout(function() { btn.textContent = originalText; btn.disabled = false; }, 3000);
      } else {
        btn.textContent = 'Error — try again';
        btn.disabled = false;
      }
    }).catch(function() {
      btn.textContent = 'Error — try again';
      btn.disabled = false;
    });
  }
  document.addEventListener('submit', handleEstimateSubmit, true);
})();

document.addEventListener('DOMContentLoaded', () => {

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
      '<form class="form" data-modal-form action="/api/crm-lead-full" method="post">',
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