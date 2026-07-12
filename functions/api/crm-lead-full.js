export async function onRequestPost(context) {
  try {
    var formData = await context.request.formData();
    var payload = {
      name: formData.get('name') || '',
      phone: formData.get('phone') || '',
      email: formData.get('email') || '',
      service: formData.get('service') || 'General',
      address: formData.get('address') || '',
      details: formData.get('details') || ''
    };

    // Send to CRM
    await fetch('https://55d03448-7ecb-41b5-88ff-4b4adfc74d27-00-2lj3a77ioslqd.kirk.replit.dev/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).catch(function(){});

    // Send to Formspree
    var fd = new FormData();
    Object.keys(payload).forEach(function(k) { fd.append(k, payload[k]); });
    await fetch('https://formspree.io/f/mlgqryqz', {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: fd
    }).catch(function(){});

    // Redirect back with success flag
    var referer = context.request.headers.get('Referer') || '/';
    var sep = referer.includes('?') ? '&' : '?';
    return Response.redirect(referer + sep + 'estimate=sent', 302);
  } catch(e) {
    return Response.redirect('/?estimate=error', 302);
  }
}