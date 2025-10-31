// FILE: server.js


// Basic endpoint: return detected client IP and headers
app.get('/api/me', (req, res) => {
const ip = getClientIp(req);
res.json({ ip, headers: req.headers });
});


// Lookup endpoint: reverse DNS + optional geolocation
app.post('/api/lookup', async (req, res) => {
const { ip } = req.body;
if (!ip) return res.status(400).json({ error: 'ip required' });


const result = { ip };


// Reverse DNS
try {
const hostnames = await dns.reverse(ip).catch(()=>[]);
result.reverse_dns = hostnames;
} catch (e) {
result.reverse_dns = [];
}


// Basic geolocation using provider if configured
const provider = (process.env.GEO_PROVIDER || '').toLowerCase();
try {
if (provider === 'ipinfo' && process.env.IPINFO_TOKEN) {
const r = await fetch(`https://ipinfo.io/${encodeURIComponent(ip)}/json?token=${process.env.IPINFO_TOKEN}`);
const j = await r.json();
result.geo = j;
} else if (provider === 'ip-api' || !provider) {
// ip-api.com is free for non-commercial use (watch their rate limits)
const r = await fetch(`http://ip-api.com/json/${encodeURIComponent(ip)}?fields=status,message,country,regionName,city,isp,org,query,lat,lon,timezone,proxy`);
const j = await r.json();
result.geo = j;
} else {
result.geo = { error: 'unknown provider or missing token' };
}
} catch (e) {
result.geo = { error: e.message };
}


res.json(result);
});


// simple health
app.get('/api/ping', (req, res) => res.json({ ok: true }));


// fallback
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));


app.listen(PORT, () => console.log(`IP Checker running on port ${PORT}`));
