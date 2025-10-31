// FILE: public/app.js
async function api(path, opts={}){
const res = await fetch(path, opts);
return res.json();
}


document.getElementById('btn-me').addEventListener('click', async ()=>{
const res = await api('/api/me');
document.getElementById('me-result').textContent = JSON.stringify(res, null, 2);
});


document.getElementById('lookup-form').addEventListener('submit', async (e)=>{
e.preventDefault();
const ip = new FormData(e.target).get('ip');
const res = await api('/api/lookup', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ ip }) });
document.getElementById('lookup-result').textContent = JSON.stringify(res, null, 2);
});


---


// FILE: Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node","server.js"]
