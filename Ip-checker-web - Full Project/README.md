// FILE: README.md
# IP Checker Web


Simple web app to check and inspect IP addresses.


Features:
- Shows visitor's public IP and request headers
- Allows manual lookup of any IPv4/IPv6 address
- Optional geolocation lookup using ip-api.com or ipinfo.io (configure API in .env)
- Reverse DNS lookup


Quick start:
1. `npm install`
2. (optional) create `.env` from `.env.example` to enable geolocation
3. `npm start`
4. Open `http://localhost:3000`


Security note: Do not enable any third-party API keys on publicly accessible servers without reviewing their usage limits and privacy policies.
