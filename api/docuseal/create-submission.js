export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { name, email, phone, businessName, type } = req.body;
  if (!name || !email || !type) return res.status(400).json({ error: 'name, email, type required' });
  const templateId = type === 'contractor'
    ? process.env.DOCUSEAL_CONTRACTOR_TEMPLATE_ID
    : process.env.DOCUSEAL_PROPERTY_MANAGER_TEMPLATE_ID;
  if (!templateId) return res.status(500).json({ error: 'Missing template ID in environment variables' });
  try {
    const response = await fetch('https://api.docuseal.com/submissions', {
      method: 'POST',
      headers: { 'X-Auth-Token': process.env.DOCUSEAL_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        template_id: parseInt(templateId, 10),
        send_email: false,
        submitters: [{
          role: type === 'contractor' ? 'Contractor' : 'Property Manager',
          name, email,
          phone: phone || undefined,
          fields: [{ name: 'Full Name', default_value: name }, businessName ? { name: 'Business Name', default_value: businessName } : null].filter(Boolean)
        }]
      })
    });
    const data = await response.json();
    if (!response.ok) return res.status(response.status).json({ error: 'DocuSeal error', details: data });
    const submitter = data[0];
    if (!submitter?.embed_src) return res.status(500).json({ error: 'No embed URL from DocuSeal' });
    return res.status(200).json({ embedSrc: submitter.embed_src });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
