export async function onRequestPost(context) {
  try {
    const body = await context.request.text();
    const params = new URLSearchParams(body);
    const get = (k) => params.get(k) || '';
    const payload = {
      name: get('name'), phone: get('phone'), email: get('email'),
      service: get('service') || 'General', address: get('address'), details: get('details')
    };
    await fetch('https://55d03448-7ecb-41b5-88ff-4b4adfc74d27-00-2lj3a77ioslqd.kirk.replit.dev/api/leads', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
    }).catch(() => {});
    await fetch('https://formspree.io/f/mlgqryqz', {
      method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json' }, body: body
    }).catch(() => {});
    return Response.redirect('https://nextcapllc.com/thank-you', 302);
  } catch (err) {
    return Response.redirect('https://nextcapllc.com/thank-you', 302);
  }
}