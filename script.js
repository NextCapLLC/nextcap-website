document.addEventListener('DOMContentLoaded',()=>{
  const menuButton=document.querySelector('.mobile-toggle');
  const nav=document.querySelector('.navlinks');
  if(menuButton&&nav){
    menuButton.addEventListener('click',()=>{
      const isOpen=nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded',String(isOpen));
      menuButton.innerHTML=isOpen?'× Close':'☰ Menu';
    });
    nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded','false');
      menuButton.innerHTML='☰ Menu';
    }));
  }
  document.querySelectorAll('form[data-demo]').forEach(form=>form.addEventListener('submit',event=>{
    event.preventDefault();
    alert('Thank you. Your request is ready to send once website email hosting is connected to info@nextcapllc.com.');
  }));
  const buttons=[...document.querySelectorAll('.filter-btn')];
  const cards=[...document.querySelectorAll('.portfolio-card')];
  buttons.forEach(btn=>btn.addEventListener('click',()=>{
    const filter=btn.dataset.filter;
    buttons.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    cards.forEach(card=>{
      const cats=(card.dataset.category||'').split(/\s+/);
      card.classList.toggle('hide', filter!=='all' && !cats.includes(filter));
    });
  }));
});
