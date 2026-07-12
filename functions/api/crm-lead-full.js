export async function onRequestPost(context) {
  try {
    const body = await context.request.text();
    const params = new URLSearchParams(body);
    const get = (k) => params.get(k) || '';
    const payload = {
      name: get('name'),
      phone: get('phone'),
      email: get('email'),
      service: get('service') || 'General',
      address: get('address'),
      details: get('details')
    };

    // Save to CRM — retry once if server is sleeping
    const saveToCRM = () => fetch('https://55d03448-7ecb-41b5-88ff-4b4adfc74d27-00-2lj3a77ioslqd.kirk.replit.dev/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000)
    });

    const crmResult = await saveToCRM().catch(async () => {
      // Server may be waking up — wait 4s and retry once
      await new Promise(r => setTimeout(r, 4000));
      return saveToCRM().catch(() => null);
    });

    // Forward to Formspree (backup copy of every lead)
    await fetch('https://formspree.io/f/mlgqryqz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json' },
      body: body
    }).catch(() => {});

    return Response.redirect('https://nextcapllc.com/thank-you', 302);
  } catch (err) {
    return Response.redirect('https://nextcapllc.com/thank-you', 302);
  }
}